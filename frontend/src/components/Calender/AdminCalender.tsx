import * as React from 'react';
import { Calendar, momentLocalizer, Formats, Messages } from 'react-big-calendar';
import * as moment from 'moment';
import 'assets/css/kilo-calender.css';
import { CEvent, User } from 'responses/responseStructs';
import { AdminConfirmLessonModal } from 'components';

interface Props {
  lessons:         CEvent[];
  users:           User[];
  updateEventFunc: Function;
}

const Calender: React.FC<Props> = (props) => {
  const { lessons, users, updateEventFunc } = props;
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<CEvent|undefined>();
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
    setOpenModal(true);
  };

  const updateEvent = (event:CEvent) => {
    // イベント更新があったときに更新する
    updateEventFunc(event);
  };

  return(
    <div className="admin-calender">
      <Calendar
        localizer={localizer}
        events={lessons}
        timeslots={2}
        views={['month', 'week', 'day']}
        formats={formats}
        onSelectEvent={(event) => showEventDetail(event)}
        messages={messages}
        eventPropGetter={eventColors}
      />
      <AdminConfirmLessonModal
        open={openModal}
        selectedEvent={selectedEvent}
        closeFunc={() => setOpenModal(false)}
        updateEventFunc={(event:CEvent) => updateEvent(event)}
        users={users}
      />
    </div>
  );
};

export default Calender;