import * as React from 'react';
import { ItemGrid, CalenderCard, KSpinner } from 'components';
import { Grid,} from '@material-ui/core';
import { AuthContext } from 'Auth';
import { fetchApp, NetworkError } from 'request/fetcher';
import { Lesson } from 'responses/responseStructs';
import scheduleViewStyle from 'assets/jss/kiloStyles/scheduleViewStyle';

const ScheduleView: React.FC = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [lessons, setLessons] = React.useState<Lesson[] | null>(null);
  const classes = scheduleViewStyle();

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

  React.useEffect(() => {
    getLessons().then((result) => {
      setLessons(result);
    });
  }, []);

  return (
    <div>
      { lessons && currentUser ? (
        <Grid container>
          <ItemGrid xs={12}>
            <CalenderCard
              cardTitle="スケジュール"
              lessons={lessons}
              isAdmin={currentUser.role === 'admin'}
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