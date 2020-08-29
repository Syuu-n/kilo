import * as React from 'react';
import { Calendar, momentLocalizer, Formats } from 'react-big-calendar';
import * as moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal } from 'components';

const localizer = momentLocalizer(moment);

const formats:Formats = {
  dateFormat: 'D',
  dayFormat: 'D(ddd)',
  monthHeaderFormat: 'YYYY年M月',
  dayHeaderFormat: 'M月D日(ddd)',
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
    start: new Date('2020-03-07 15:00'),
    end: new Date('2020-03-07 17:00'),
  }
];

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
        style={{ height: 500 }}
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