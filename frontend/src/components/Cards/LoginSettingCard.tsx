import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  SvgIcon,
} from '@material-ui/core';
import myProfileCardStyle from 'assets/jss/kiloStyles/myProfileCardStyle';
import { LoginSettingTable } from 'components';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
  icon: typeof SvgIcon;
  tableHeaderColor?: 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
  tableHead?: string[];
  tableData?: string[][];
}

const MyProfileCard: React.SFC<Props> = ({ headerColor = 'orange', cardTitle, icon, tableHeaderColor = 'primary', tableHead, tableData }) => {
  const classes = myProfileCardStyle();
  const Icon = icon;

  return (
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
          avatar={<Icon className={classes.cardIcon}/>}
        />
        <h4 className={classes.cardTitle}>{cardTitle}</h4>
      </div>
      <CardContent>
        <LoginSettingTable/>
      </CardContent>
    </Card>
  );
}

export default MyProfileCard;