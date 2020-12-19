import * as React from 'react';
import { Calendar, momentLocalizer, Formats, Messages } from 'react-big-calendar';
import * as moment from 'moment';
import 'assets/css/kilo-calender.css';
import { CEvent, Lesson, LessonClass, User } from 'responses/responseStructs';
import { slotInfo } from 'request/requestStructs';
import { fetchApp, NetworkError } from 'request/fetcher';
import { AdminShowLessonModal, AdminAddLessonModal, Button } from 'components';
import { useSnackbar } from 'notistack';
import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';

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
  const { enqueueSnackbar } = useSnackbar();
  const classes = adminModalStyle();

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

  /**
   * Lesson の配列を CEvent の配列へ変換する
   * @param lessons 変換するレッスンの配列
   */
  const convertLessonsToCEvents = (lessons: Lesson[]): CEvent[] => {
    const cEvents = lessons.map((lesson:Lesson) => ({
      id: lesson.id,
      title: lesson.name,
      start: new Date(lesson.start_at),
      end:   new Date(lesson.end_at),
      color: lesson.color,
      joined: lesson.joined,
      description: lesson.description ? lesson.description : '',
      users: lesson.users ? lesson.users : undefined,
      location: lesson.location,
    } as CEvent));
    return cEvents
  };

  const createLessonsFunc = () => {
    // 来月を取得
    const nextMonth = moment().add(1, 'month');
    if (confirm(`現在のクラスをもとに ${nextMonth.format("YYYY 年 MM 月")} のスケジュールを作成します。よろしいですか？`)) {
      createLessons();
    };
  };

  const createLessons = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return;
    }

    const res = await fetchApp(
      '/v1/lessons/create_lessons',
      'POST',
      accessToken,
    )
    if (res instanceof NetworkError) {
      console.log('ServerError');
      enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
      return;
    }
    const json: Lesson[] = await res.json();
    switch (res.status) {
      case 201:
        enqueueSnackbar('来月のスケジュール作成に成功しました。', { variant: 'success' });
        updateEventFunc(convertLessonsToCEvents(json), "createLessons")
        break;
      default:
        enqueueSnackbar('来月のスケジュール作成に失敗しました。', { variant: 'error' });
    };
  };

  return(
    <div className="admin-calender">
      <div className={classes.flexContainerEnd}>
        <Button
          color="success"
          onClick={() => createLessonsFunc()}
        >
          来月のスケジュールを作成
        </Button>
      </div>
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