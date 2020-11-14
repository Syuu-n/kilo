import * as React from 'react';
import { KSpinner, AdminCalender, Card, CardBody, CardHeader, CardIcon } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { Lesson, CEvent, User } from 'responses/responseStructs';
import lessonsViewStyle from 'assets/jss/kiloStyles/classesViewStyle';
import { EventNote } from '@material-ui/icons';

const LessonsView: React.FC = () => {
  const [lessons, setLessons] = React.useState<CEvent[] | null>(null);
  const [users, setUsers] = React.useState<User[] | null>();
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

  const updateEvent = (event:CEvent) => {
    if (!lessons) {
      console.log('LessonNotFoundError');
      return
    };

    const newLessons = lessons.slice();
    const selectedIndex = lessons.findIndex(({id}) => id === event.id);
    newLessons[selectedIndex] = event;
    setLessons(newLessons);
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
    };
    f();
  }, []);

  return (
    <div>
      { lessons && users ? (
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
                updateEventFunc={(event:CEvent) => updateEvent(event)}
                users={users}
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