import * as React from 'react';
import { Calendar, momentLocalizer, Formats, Messages } from 'react-big-calendar';
import * as moment from 'moment';
import 'assets/css/kilo-calender.css';
import { CEvent, LessonClass, User } from 'responses/responseStructs';
import { slotInfo } from 'request/requestStructs';
import { AdminShowLessonModal, AdminAddLessonModal } from 'components';

interface Props {
  lessons:         CEvent[];
  users:           User[];
  lessonClasses:   LessonClass[];
  updateEventFunc: Function;
}

const Calender: React.FC<Props> = (props) => {
  const { lessons, users, lessonClasses, updateEventFunc } = props;
  const [openShowModal, setOpenShowModal] = React.useState(false);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<CEvent|undefined>();
  const [slot, setSlot] = React.useState<slotInfo|undefined>();
  const localizer = momentLocalizer(moment);
  const formats:Formats = {
    dateFormat: 'D',
    dayFormat: 'D (ddd)',
    monthHeaderFormat: 'YYYY年M月',
    dayHeaderFormat: 'M月D日 (ddd)',
  };
  const messages:Messages ={
    today: '今日',
    yesterday: '昨日',
    tomorrow: '明日',
    previous: '←',
    next: '→',
    month: '月',
    week: '週',
    day: '日',
    showMore: (number) => { return '+ 他 ' + number + '個'},
  };

  const eventColors = (event:any) => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  };

  const showEventDetail = (event:CEvent) => {
    setSelectedEvent(event);
    setOpenShowModal(true);
  };

  const createNewEvent = (slotInfo:slotInfo) => {
    setSlot(slotInfo);
    setOpenAddModal(true);
  };

  return(
    <div className="admin-calender">
      <Calendar
        selectable
        localizer={localizer}
        events={lessons}
        timeslots={2}
        views={['month', 'week', 'day']}
        formats={formats}
        onSelectEvent={(event) => showEventDetail(event)}
        onSelectSlot={(slotInfo) => createNewEvent(slotInfo)}
        messages={messages}
        eventPropGetter={eventColors}
      />
      <AdminShowLessonModal
        open={openShowModal}
        selectedEvent={selectedEvent}
        closeFunc={() => setOpenShowModal(false)}
        updateEventFunc={updateEventFunc}
        users={users}
      />
      <AdminAddLessonModal
        open={openAddModal}
        closeFunc={() => setOpenAddModal(false)}
        openFunc={() => setOpenAddModal(true)}
        slot={slot}
        users={users}
        lessonClasses={lessonClasses}
        updateFunc={updateEventFunc}
      />
    </div>
  );
};

export default Calender;