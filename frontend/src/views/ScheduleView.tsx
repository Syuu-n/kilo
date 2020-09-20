import * as React from 'react';
import { ItemGrid, KSpinner, CustomTabs, Calender } from 'components';
import { Grid,} from '@material-ui/core';
import { AuthContext } from 'Auth';
import { fetchApp, NetworkError } from 'request/fetcher';
import { Lesson, CEvent } from 'responses/responseStructs';
import scheduleViewStyle from 'assets/jss/kiloStyles/scheduleViewStyle';
import { Event, EventAvailable } from '@material-ui/icons';

const ScheduleView: React.FC = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [lessons, setLessons] = React.useState<CEvent[] | null>(null);
  const [myLessons, setMyLessons] = React.useState<CEvent[] | null>(null);
  const classes = scheduleViewStyle();

  // 自身が参加しているレッスンのみ取得
  const getMyLessons = (lessons:CEvent[]) => {
    const myLessons:CEvent[] = lessons.filter((lesson:CEvent) =>
      lesson.joined
    );
    setMyLessons(myLessons);
  };

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

  React.useEffect(() => {
    lessons ? getMyLessons(lessons) : null;
  }, [lessons]);

  return (
    <div>
      { lessons && myLessons && currentUser ? (
        <Grid container>
          <ItemGrid xs={12}>
            <CustomTabs
              title="表示:"
              headerColor="orange"
              tabs={[
                {
                  tabName: "全てのスケジュール",
                  tabIcon: Event,
                  tabContent: (
                    <Calender
                      isAdmin={currentUser.role === 'admin'}
                      lessons={lessons}
                      updateEventFunc={(event:CEvent) => updateEvent(event)}
                    />
                  ),
                },
                {
                  tabName: "自分のスケジュール",
                  tabIcon: EventAvailable,
                  tabContent: (
                    <Calender
                      isAdmin={currentUser.role === 'admin'}
                      lessons={myLessons}
                      updateEventFunc={(event:CEvent) => updateEvent(event)}
                    />
                  ),
                },
              ]}
            />
          </ItemGrid>
        </Grid>
      ) : (
        <div className={classes.spinnerWrap}>
          <KSpinner/>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;