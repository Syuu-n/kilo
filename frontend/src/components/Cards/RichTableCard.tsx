import * as React from 'react';
import { SvgIcon } from '@material-ui/core';
import {
  Person,
  Edit,
  Close,
  PersonAdd,
} from '@material-ui/icons';
import richTableCardStyle from 'assets/jss/kiloStyles/richTableCardStyle';
import {
  Card,
  CardHeader,
  CardIcon,
  CardBody,
  TooltipButton,
  RichTable,
  TableToolbar,
} from 'components';
import { User } from 'responses/responseStructs';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
  icon: typeof SvgIcon;
  tableHeaderColor?: 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
  tableHead?: string[];
  tableSources: User[];
}

type buttonColors = 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'white' | 'simple';

const RichTableCard: React.FC<Props> = ({ headerColor = 'orange', cardTitle, icon, tableHeaderColor = 'primary', tableHead, tableSources }) => {
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

  // tableHead と tableSources へそれぞれ操作用項目を追加する
  const customTableHead = tableHead?.slice();
  customTableHead?.push("操作");

  const customTableData = tableSources.slice().map((user) => {
    return [
      user.id,
      user.name,
      user.name_kana,
      user.email,
      user.role.display_name,
      buttons,
    ]
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
        <TableToolbar
          buttonTitle={"ユーザ追加"}
          buttonIcon={PersonAdd}
        />
        <RichTable
          tableHead={customTableHead}
          rows={customTableData}
          tableHeaderColor="success"
        />
      </CardBody>
    </Card>
  );
}

export default RichTableCard;