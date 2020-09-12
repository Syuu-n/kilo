import * as React from 'react';
import { Calendar, momentLocalizer, Formats, Messages, Event } from 'react-big-calendar';
import * as moment from 'moment';
import '../../assets/css/kilo-calender.css';
import { Lesson } from 'responses/responseStructs';
import { ShowEventModal } from 'components';

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

interface Props {
  isAdmin: boolean;
  lessons: Lesson[];
}

const Calender: React.FC<Props> = (props) => {
  const { isAdmin, lessons } = props;
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<Event|undefined>();
  const eventList:Event[] = lessons.map(lesson => {return {
    title: lesson.class_name,
    start: new Date(lesson.start_at),
    end:   new Date(lesson.end_at),
    color: lesson.color,
  }});

  const showEventDetail = (event:Event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  return(
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        timeslots={2}
        views={['month', 'week', 'day']}
        formats={formats}
        onSelectEvent={(event) => showEventDetail(event)}
        messages={messages}
        eventPropGetter={eventColors}
      />
      <ShowEventModal
        open={openModal}
        selectedEvent={selectedEvent}
        isAdmin={isAdmin}
        closeFunc={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Calender;