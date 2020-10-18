import * as React from 'react';
import { SvgIcon } from '@material-ui/core';
import { Person, Edit, Close, PersonAdd } from '@material-ui/icons';
import richTableCardStyle from 'assets/jss/kiloStyles/richTableCardStyle';
import { Card, CardHeader, CardIcon, CardBody, TooltipButton, RichTable, TableToolbar, AdminConfirmUserModal, AdminAddUserModal } from 'components';
import { User } from 'responses/responseStructs';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
  icon: typeof SvgIcon;
  tableHeaderColor?: 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
  tableHead?: string[];
  tableSources: User[];
  updateFunc?: Function;
  dataType: dataType;
}

type dataType = "users" | "classes" | "plans" | "lessons";
type buttonColors = 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'white' | 'simple';

const RichTableCard: React.FC<Props> = ({ headerColor = 'orange', cardTitle, icon, tableHeaderColor = 'primary', tableHead, tableSources, updateFunc, dataType }) => {
  const classes = richTableCardStyle();
  const Icon = icon;
  const [openShowModal, setOpenShowModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<User>();
  const { enqueueSnackbar } = useSnackbar();

  const buttons = (id:number) => {
    if (selectedData?.id != id) return;
    return (
      <div className={classes.buttonContainer}>{
        [
          { color: "info" as buttonColors, icon: Person, title: "確認", dataType: dataType },
          { color: "success" as buttonColors, icon: Edit, title: "編集", dataType: dataType },
          { color: "danger" as buttonColors, icon: Close, title: "削除", dataType: dataType },
        ].map((prop, key) => {
          return (
            <TooltipButton color={prop.color} key={key} tooltipTitle={prop.title} onClick={() => handleActionClick(prop.dataType, prop.title, id)}>
              <prop.icon />
            </TooltipButton>
          );
        })
      }</div>
    );
  };

  // tableHead と tableSources へそれぞれ操作用項目を追加する
  const customTableHead = tableHead?.slice();
  customTableHead?.push("操作");

  const customTableData = tableSources.slice().map((user) => {
    return [
      user.id,
      user.last_name + " " + user.first_name,
      user.last_name_kana + " " + user.first_name_kana,
      user.email,
      user.role.display_name,
      buttons(user.id),
    ]
  });

  // アクションメニューをクリック時の動作
  const handleActionClick = (dataType:dataType, actionType:string, dataId:number) => {
    switch (actionType) {
      case "確認":
        setOpenShowModal(true);
        break;
      case "編集":
        setOpenEditModal(true);
        break;
      case "削除":
        if (confirm(`選択中の（種類:${dataType} ID:${dataId}）を本当に削除しますか？`)) {
          deleteData(dataId);
        };
        break;
    }
  };

  // テーブルの項目を選択時の動作
  const handleSelected = (id:number) => {
    const data = tableSources.find((d) => d.id == id);
    data && setSelectedData(data);
  };

  const deleteData = async (dataId:number) => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return;
    }

    const res = await fetchApp(
      `/v1/${dataType}/${dataId}`,
      'DELETE',
      accessToken
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
      return;
    }

    switch (res.status) {
      case 200:
        enqueueSnackbar(`種類:${dataType} ID:${dataId}の削除に成功しました。`, { variant: 'success' });
        if (updateFunc) updateFunc();
        break;
      case 404:
        enqueueSnackbar(`種類:${dataType} ID:${dataId}が存在しないため削除に失敗しました。`, { variant: 'error' });
        break;
      case 400:
        enqueueSnackbar(`種類:${dataType} ID:${dataId}の削除に失敗しました。`, { variant: 'error' });
        break;
    }
  };

  return (
    <div>
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
            updateFunc={updateFunc}
          />
          <RichTable
            tableHead={customTableHead}
            rows={customTableData}
            tableHeaderColor="success"
            selectedFunc={(id:number) => handleSelected(id)}
            selectedId={selectedData?.id}
          />
        </CardBody>
      </Card>
      { dataType == "users" && (
        <div>
          <AdminConfirmUserModal
            user={selectedData}
            open={openShowModal}
            closeFunc={() => setOpenShowModal(false)}
            type="show"
            selectedPlan={selectedData?.plan}
            selectedRole={selectedData?.role}
          />
          <AdminAddUserModal
            open={openEditModal}
            closeFunc={() => setOpenEditModal(false)}
            openFunc={() => setOpenEditModal(true)}
            updateFunc={updateFunc}
            selectedUser={selectedData}
          />
        </div>
      )}
    </div>
  );
}

export default RichTableCard;