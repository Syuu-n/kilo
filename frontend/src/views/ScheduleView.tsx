import * as React from 'react';
import { ItemGrid, CalenderCard } from 'components';
import { Grid,} from '@material-ui/core';

const ScheduleView: React.SFC = () => {
  return (
    <div>
      <Grid container>
        <ItemGrid xs={12}>
          <CalenderCard
            cardTitle="スケジュール"
          />
        </ItemGrid>
      </Grid>
    </div>
  );
};

export default ScheduleView;