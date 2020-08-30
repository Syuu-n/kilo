import * as React from 'react';
import { Calendar, momentLocalizer, Formats, Messages } from 'react-big-calendar';
import * as moment from 'moment';
import '../../assets/css/kilo-calender.css';
import { Modal } from 'components';

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
};

const eventList = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date('2020-08-029'),
    end: new Date('2020-08-029'),
  },
  {
    id: 1,
    title: 'Long Event',
    allDay: false,
    start: new Date('2020-08-24 15:00'),
    end: new Date('2020-08-24 17:00'),
  }
];

// const eventColors = (event:Event) => {
//   var backgroundColor = "event-";
//   event.color
//     ? (backgroundColor = backgroundColor + event.color)
//     : (backgroundColor = backgroundColor + "default");
//   return {
//     className: backgroundColor
//   };
// };

const Calender: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);

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
        // eventPropGetter={eventColors}
      />
      <Modal
        open={openModal}
        headerTitle="パスワード変更"
        content={<p>テスト</p>}
        submitText="変更"
        submitFunc={() => {console.log('押された')}}
        closeFunc={() => {setOpenModal(false)}}
      />
    </div>
  );
};

export default Calender;