import * as React from 'react';
import { ItemGrid, Calender, KSpinner, CustomTabs } from 'components';
import { Grid,} from '@material-ui/core';
import { AuthContext } from 'Auth';
import { fetchApp, NetworkError } from 'request/fetcher';
import { Lesson } from 'responses/responseStructs';
import scheduleViewStyle from 'assets/jss/kiloStyles/scheduleViewStyle';
import { Event, EventAvailable } from '@material-ui/icons';

const ScheduleView: React.FC = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [lessons, setLessons] = React.useState<Lesson[] | null>(null);
  const [myLessons, setMyLessons] = React.useState<Lesson[] | null>(null);
  const classes = scheduleViewStyle();
  const accessToken = localStorage.getItem('kiloToken');

  const getLessons = async () => {
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

  React.useEffect(() => {
    getLessons().then((result) => {
      setLessons(result);
      // 自身が参加しているレッスンのみ取得
      const myLessons:Lesson[] = result.filter((lesson:Lesson) =>
        lesson.joined
      );
      setMyLessons(myLessons);
    });
  }, []);

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