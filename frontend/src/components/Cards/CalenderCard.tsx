import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import { Event } from '@material-ui/icons';
import calenderCardStyle from 'assets/jss/kiloStyles/calenderCardStyle';
import { Calender } from 'components';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
}

const CalenderCard: React.SFC<Props> = ({ headerColor = 'orange', cardTitle }) => {
  const classes = calenderCardStyle();

  return(
    <Card className={classes.card}>
      <div className={classes.headerContainer}>
        <CardHeader
          classes={{
            root:
            classes.cardHeader +
            ' ' +
            classes[headerColor + 'CardHeader'],
            avatar: classes.cardAvatar,
          }}
          avatar={<Event className={classes.cardIcon}/>}
        />
        <h4 className={classes.cardTitle}>{cardTitle}</h4>
      </div>
      <CardContent>
        <Calender/>
      </CardContent>
    </Card>
  );
};

export default CalenderCard;