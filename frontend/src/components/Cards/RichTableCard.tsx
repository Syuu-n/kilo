import * as React from 'react';
import { SvgIcon } from '@material-ui/core';
import {
  Person,
  Edit,
  Close,
} from '@material-ui/icons';
import richTableCardStyle from 'assets/jss/kiloStyles/richTableCardStyle';
import {
  Table,
  Card,
  CardHeader,
  CardIcon,
  CardBody,
  TooltipButton,
} from 'components';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
  icon: typeof SvgIcon;
  tableHeaderColor?: 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
  tableHead?: string[];
  tableData?: any[][];
}

type buttonColors = 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'white' | 'simple';

const RichTableCard: React.SFC<Props> = ({ headerColor = 'orange', cardTitle, icon, tableHeaderColor = 'primary', tableHead, tableData }) => {
  const classes = richTableCardStyle();
  const Icon = icon;
  const buttons = [
    { color: "info" as buttonColors, icon: Person, title: "確認" },
    { color: "success" as buttonColors, icon: Edit, title: "編集" },
    { color: "danger" as buttonColors, icon: Close, title: "削除" },
  ].map((prop, key) => {
    return (
      <TooltipButton color={prop.color} key={key} tooltipTitle={prop.title}>
        <prop.icon />
      </TooltipButton>
    );
  });

  // tableHead と tableData へそれぞれ操作用項目を追加する
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