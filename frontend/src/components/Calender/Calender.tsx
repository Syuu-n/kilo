import * as React from 'react';
import { Calendar, momentLocalizer, Formats, Messages, Event } from 'react-big-calendar';
import * as moment from 'moment';
import '../../assets/css/kilo-calender.css';
import { Modal } from 'components';
import { Lesson } from 'responses/responseStructs';

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
  const eventList:Event[] = lessons.map(lesson => {return {
    title: lesson.class_name,
    start: new Date(lesson.start_at),
    end:   new Date(lesson.end_at),
    color: lesson.color,
  }});

  const addNewEventModal = () => {
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
        // onSelectEvent={event => alert(event.title)}
        onSelectEvent={() => addNewEventModal() }
        messages={messages}
        eventPropGetter={eventColors}
      />
      <Modal
        open={openModal}
        headerTitle="パスワード変更"
        content={<p>テスト</p>}
        submitText="変更"
        submitFunc={() => {console.log(isAdmin)}}
        closeFunc={() => {setOpenModal(false)}}
      />
    </div>
  );
};

export default Calender;