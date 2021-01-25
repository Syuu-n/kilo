import * as React from 'react';
import { SvgIcon } from '@material-ui/core';
// import myProfileCardStyle from 'assets/jss/kiloStyles/myProfileCardStyle';
import {
  Table,
  Card,
  CardHeader,
  CardIcon,
  CardContent,
} from 'components';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
  icon: typeof SvgIcon;
  tableHeaderColor?: 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
  tableHead?: string[];
  tableData?: any[][];
}

const MyProfileCard: React.FC<Props> = ({ headerColor = 'orange', cardTitle, icon, tableHeaderColor = 'primary', tableHead, tableData }) => {
  // const classes = myProfileCardStyle();
  const Icon = icon;

  return (
    <Card>
      <CardHeader color={headerColor} icon>
        <CardIcon color={headerColor}>
          <Icon/>
        </CardIcon>
        <h4>{cardTitle}</h4>
      </CardHeader>
      <CardContent>
        <Table
          tableHeaderColor={tableHeaderColor}
          tableHead={tableHead}
          tableData={tableData}
        />
      </CardContent>
    </Card>
  );
}

export default MyProfileCard;