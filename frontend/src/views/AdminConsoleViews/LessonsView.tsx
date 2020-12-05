import * as React from 'react';
import { KSpinner, AdminCalender, Card, CardBody, CardHeader, CardIcon } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { Lesson, CEvent, User, LessonClass } from 'responses/responseStructs';
import lessonsViewStyle from 'assets/jss/kiloStyles/classesViewStyle';
import { EventNote } from '@material-ui/icons';

type eventAction = "update" | "add" | "delete" | "createLessons";

const LessonsView: React.FC = () => {
  const [lessons, setLessons] = React.useState<CEvent[] | null>(null);
  const [users, setUsers] = React.useState<User[] | null>();
  const [lessonClasses, setLessonClasses] = React.useState<LessonClass[] | null>();
  const classes = lessonsViewStyle();

  const getLessons = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return null;
    }

    const res = await fetchApp(
      '/v1/lessons',
      'GET',
      accessToken
    )

    if (res instanceof NetworkError) {
      console.log('ServerError')
      return null;
    }

    if (res.ok) {
      const json = await res.json();
      return json;
    } else {
      return null;
    }
  };

  const getUsers = async (): Promise<User[] | null> => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return null;
    }

    const res = await fetchApp(
      '/v1/users',
      'GET',
      accessToken,
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      return null;
    }

    if (res.ok) {
      const json = await res.json();
      return json;
    } else {
      return null;
    }
  };

  const getLessonClasses = async (): Promise<LessonClass[] | null> => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return null;
    }

    const res = await fetchApp(
      '/v1/lesson_classes',
      'GET',
      accessToken,
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      return null;
    }

    if (res.ok) {
      const json = await res.json();
      return json;
    } else {
      return null;
    }
  };

  const updateEvent = async (events:CEvent[], action:eventAction) => {
    if (!lessons) {
      console.log('LessonNotFoundError');
      return
    };

    const newLessons = lessons.slice();
    const selectedIndex = lessons.findIndex(({id}) => id === events[0].id);
    switch (action) {
      case "update":
        // 更新時の update
        newLessons[selectedIndex] = events[0];
        setLessons(newLessons);
        break;
      case "add":
        // 追加時の update
        newLessons.push(events[0]);
        setLessons(newLessons);
        break;
      case "delete":
        // 削除時の update
        newLessons.splice(selectedIndex, 1);
        setLessons(newLessons);
        break;
      case "createLessons":
        // 来月のスケジュール作成時の update
        setLessons(newLessons.concat(events));
        break;
    };
    // レッスン変更、追加、削除後はユーザの参加可能数が変化するため再取得する
    const users = await getUsers();
    if (users) setUsers(users);
  };

  React.useEffect(() => {
    const f = async () => {
      const lessons = await getLessons();
      if (lessons) {
        setLessons(lessons.map((lesson:Lesson) => ({
          id: lesson.id,
          title: lesson.class_name,
          start: new Date(lesson.start_at),
          end:   new Date(lesson.end_at),
          color: lesson.color,
          joined: lesson.joined,
          memo: lesson.class_memo ? lesson.class_memo : '',
          users: lesson.users ? lesson.users : undefined,
        } as CEvent)));
      };
      const users = await getUsers();
      if (users) setUsers(users);

      const lessonClasses = await getLessonClasses();
      if (lessonClasses) setLessonClasses(lessonClasses);
    };
    f();
  }, []);

  return (
    <div>
      { lessons && users && lessonClasses ? (
        <div>
          <Card>
            <CardHeader color="green" icon>
              <CardIcon color="green">
                <EventNote />
              </CardIcon>
              <h4 className={classes.cardTitle}>レッスン</h4>
            </CardHeader>
            <CardBody>
              <AdminCalender
                lessons={lessons}
                updateEventFunc={(events:CEvent[], action:eventAction) => updateEvent(events, action)}
                users={users}
                lessonClasses={lessonClasses}
              />
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className={classes.spinnerWrap}>
          <KSpinner color="success"/>
        </div>
      )}
    </div>
  );
};

export default LessonsView;