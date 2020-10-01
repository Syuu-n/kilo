import * as React from 'react';
import { SvgIcon } from '@material-ui/core';
import {
  Person,
  Edit,
  Close,
} from '@material-ui/icons';
import myProfileCardStyle from 'assets/jss/kiloStyles/myProfileCardStyle';
import {
  Table,
  Card,
  CardHeader,
  CardIcon,
  CardBody,
  IconButton,
} from 'components';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
  icon: typeof SvgIcon;
  tableHeaderColor?: 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
  tableHead?: string[];
  tableData?: any[][];
}

const RichTableCard: React.SFC<Props> = ({ headerColor = 'orange', cardTitle, icon, tableHeaderColor = 'primary', tableHead, tableData }) => {
  const classes = myProfileCardStyle();
  const Icon = icon;
  const buttons = [
    { color: "info", icon: Person },
    { color: "success", icon: Edit },
    { color: "danger", icon: Close },
  ].map((prop, key) => {
    return (
      <IconButton key={key}>
        <prop.icon />
      </IconButton>
    );
  });

  const customTableHead = tableHead?.slice();
  const customTableData = tableData?.slice();
  customTableHead?.push("操作");
  customTableData?.map((data) => {
    data.push(buttons);
  });

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
          tableHead={customTableHead}
          tableData={customTableData}
        />
      </CardBody>
    </Card>
  );
}

export default RichTableCard;