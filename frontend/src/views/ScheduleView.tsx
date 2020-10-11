import * as React from 'react';
import { ItemGrid, KSpinner, CustomTabs, Calender, MyProfileCard } from 'components';
import { Grid,} from '@material-ui/core';
import { AuthContext } from 'Auth';
import { fetchApp, NetworkError } from 'request/fetcher';
import { Lesson, CEvent } from 'responses/responseStructs';
import scheduleViewStyle from 'assets/jss/kiloStyles/scheduleViewStyle';
import { Event, EventAvailable, ControlPointDuplicate, FormatListBulletedRounded } from '@material-ui/icons';
import * as moment from 'moment';

const ScheduleView: React.FC = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [lessons, setLessons] = React.useState<CEvent[] | null>(null);
  const [myLessons, setMyLessons] = React.useState<CEvent[] | null>(null);
  const [recentLesson, setRecentLesson] = React.useState<CEvent[] | null>(null);
  const classes = scheduleViewStyle();

  // 自身が参加しているレッスンのみ取得
  const getMyLessons = (lessons:CEvent[]) => {
    const myLessonsArray:CEvent[] = lessons.filter((lesson) =>
      lesson.joined
    );
    setMyLessons(myLessonsArray);

    const recentLessonArray:CEvent[] = myLessonsArray.filter((lesson) =>
      moment(lesson.start).isBetween(new Date, moment(new Date).endOf('month'))
    );
    // 直近のレッスンを昇順にソート
    recentLessonArray.sort((a, b) => {
      return (a.start > b.start ? 1 : -1);
    });
    // 直近のレッスンから４つまでに絞る
    recentLessonArray.splice(4);
    setRecentLesson(recentLessonArray);
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
      { lessons && myLessons && recentLesson && currentUser ? (
        <div>
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
                        isAdmin={currentUser.is_admin}
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
                        isAdmin={currentUser.is_admin}
                        lessons={myLessons}
                        updateEventFunc={(event:CEvent) => updateEvent(event)}
                      />
                    ),
                  },
                ]}
              />
            </ItemGrid>
          </Grid>
          <Grid container>
            {/* レッスン数カウント */}
            <ItemGrid xs={12} md={5}>
              <MyProfileCard
                  headerColor="orange"
                  cardTitle="今月の参加状況"
                  icon={ControlPointDuplicate}
                  tableData={[
                    ["参加中のレッスン", `${currentUser.current_monthly_count} 回`],
                    ["毎月の参加可能数", `${currentUser.plan.monthly_lesson_count} 回`],
                    ["残り参加可能数", `${currentUser.remaining_monthly_count} 回`],
                  ]}
                />
            </ItemGrid>
            {/* 直近のレッスン */}
            <ItemGrid xs={12} md={7}>
              <MyProfileCard
                  headerColor="orange"
                  cardTitle="直近のレッスン"
                  icon={FormatListBulletedRounded}
                  tableData={
                    recentLesson.length == 0 ?
                    [["なし"]] :
                    recentLesson.map((lesson) => [lesson.title, moment(lesson.start).format("YYYY年 MM月 DD日 HH時 mm分")])
                  }
                />
            </ItemGrid>
          </Grid>
        </div>
      ) : (
        <div className={classes.spinnerWrap}>
          <KSpinner/>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;