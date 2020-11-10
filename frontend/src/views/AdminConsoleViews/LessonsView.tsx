import * as React from 'react';
import { KSpinner, AdminCalender, Card, CardBody, CardHeader, CardIcon } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { Lesson, CEvent } from 'responses/responseStructs';
import lessonsViewStyle from 'assets/jss/kiloStyles/classesViewStyle';
import { EventNote } from '@material-ui/icons';

const LessonsView: React.FC = () => {
  const [lessons, setLessons] = React.useState<CEvent[] | null>(null);
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
  }

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
    getLessons().then((result:Lesson[]) => {
      setLessons(result.map(lesson => ({
        id: lesson.id,
        title: lesson.class_name,
        start: new Date(lesson.start_at),
        end:   new Date(lesson.end_at),
        color: lesson.color,
        joined: lesson.joined,
        memo: lesson.class_memo ? lesson.class_memo : '',
        users: lesson.users ? lesson.users : undefined,
      } as CEvent)));
    });
  }, []);

  return (
    <div>
      { lessons ? (
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
                isAdmin={true}
                lessons={lessons}
                updateEventFunc={(event:CEvent) => updateEvent(event)}
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