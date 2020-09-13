import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import { Event } from '@material-ui/icons';
import calenderCardStyle from 'assets/jss/kiloStyles/calenderCardStyle';
import { Calender } from 'components';
import { CEvent } from 'responses/responseStructs';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
  lessons: CEvent[];
  isAdmin: boolean;
  updateEventFunc: Function;
}

const CalenderCard: React.SFC<Props> = ({ headerColor = 'orange', cardTitle, lessons, isAdmin, updateEventFunc }) => {
  const classes = calenderCardStyle();

  return(
    <div>
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
          <Calender
            isAdmin={isAdmin}
            lessons={lessons}
            updateEventFunc={(event:CEvent) => updateEventFunc(event)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalenderCard;