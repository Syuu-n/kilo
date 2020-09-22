import * as React from 'react';
import { SvgIcon } from '@material-ui/core';
import myProfileCardStyle from 'assets/jss/kiloStyles/myProfileCardStyle';
import {
  Table,
  Card,
  CardHeader,
  CardIcon,
  CardBody,
} from 'components';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
  icon: typeof SvgIcon;
  tableHeaderColor?: 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
  tableHead?: string[];
  tableData?: any[][];
}

const MyProfileCard: React.SFC<Props> = ({ headerColor = 'orange', cardTitle, icon, tableHeaderColor = 'primary', tableHead, tableData }) => {
  const classes = myProfileCardStyle();
  const Icon = icon;

  return (
    <Card>
      <CardHeader color={headerColor} icon>
        <CardIcon color={headerColor}>
          <Icon/>
        </CardIcon>
        <h4 className={classes.cardTitle}>{cardTitle}</h4>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor={tableHeaderColor}
          tableHead={tableHead}
          tableData={tableData}
        />
      </CardBody>
    </Card>
  );
}

export default MyProfileCard;