import * as React from 'react';
import { SvgIcon } from '@material-ui/core';
import { Person, Edit, Close } from '@material-ui/icons';
import richTableCardStyle from 'assets/jss/kiloStyles/richTableCardStyle';
import {
  Card, CardHeader, CardIcon, CardBody, TooltipButton, RichTable, TableToolbar,
  AdminConfirmUserModal, AdminAddUserModal, AdminConfirmLessonClassModal, AdminAddLessonClassModal,
  AdminAddPlanModal, AdminConfirmPlanModal,
} from 'components';
import { User, LessonClass, Plan, Lesson } from 'responses/responseStructs';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';
import { implementsUser, implementsLessonClass, implementsPlan } from 'assets/lib/typeCheck';
import { LessonColor, colorCheck } from 'assets/lib/lessonColors';
import { convertLessonRulesToMoment } from 'assets/lib/lessonRules';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
  icon: typeof SvgIcon;
  addIcon?: typeof SvgIcon;
  tableHeaderColor?: 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
  tableHead?: string[];
  tableSources: sourceType[];
  updateFunc?: Function;
  dataType: dataType;
}

type sourceType = User | LessonClass | Plan | Lesson;
type dataType = "users" | "lesson_classes" | "plans" | "lessons";
type buttonColors = 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'white' | 'simple';

const RichTableCard: React.FC<Props> = ({ headerColor = 'orange', cardTitle, icon, addIcon, tableHeaderColor = 'primary', tableHead, tableSources, updateFunc, dataType }) => {
  const classes = richTableCardStyle();
  const Icon = icon;
  const [openShowModal, setOpenShowModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<sourceType>();
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

  // レッスンカラー用の div を追加する
  const lessonColorDiv = (color: LessonColor) => {
    const colorCode = colorCheck(color).colorCode;
    const style = {
      backgroundColor: colorCode,
      borderRadius: '3px',
      height: '20px',
      width: '50px'
    }

    return (
      <div style={style} />
    );
  };

  // tableHead と tableSources へそれぞれ操作用項目を追加する
  const customTableHead = tableHead?.slice();
  customTableHead?.push("操作");

  const customTableData = tableSources.slice().map((data:sourceType) => {
    if (implementsUser(data)) {
      return [
        data.id,
        data.last_name + " " + data.first_name,
        data.last_name_kana + " " + data.first_name_kana,
        data.email,
        data.role.display_name,
        buttons(data.id),
      ]
    } else if (implementsLessonClass(data)) {
      return [
        data.id,
        data.name,
        data.description,
        lessonColorDiv(data.color),
        buttons(data.id),
      ]
    } else if (implementsPlan(data)) {
      return [
        data.id,
        data.name,
        data.price.toLocaleString() + ' 円',
        data.monthly_lesson_count + " 回",
        data.for_children ? "子供コース" : "大人コース",
        buttons(data.id),
      ]
    }
    return [];
  });

  // テーブルの項目を選択時の動作
  const handleSelected = (id:number) => {
    const data = tableSources.find((d) => d.id == id);
    data && setSelectedData(data);
  };

  // 選択した id の項目を削除する
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
            buttonTitle={"新規作成"}
            buttonIcon={addIcon ? addIcon : icon}
            updateFunc={updateFunc}
            dataType={dataType}
          />
          <RichTable
            tableHead={customTableHead}
            rows={customTableData}
            tableHeaderColor={tableHeaderColor}
            selectedFunc={(id:number) => handleSelected(id)}
            selectedId={selectedData?.id}
          />
        </CardBody>
      </Card>
      { implementsUser(selectedData) && (
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
      { implementsLessonClass(selectedData) && (
        <div>
          <AdminConfirmLessonClassModal
            lessonClass={selectedData}
            open={openShowModal}
            closeFunc={() => setOpenShowModal(false)}
            type="show"
            momentLessonRules={convertLessonRulesToMoment(selectedData.lesson_rules)}
          />
          <AdminAddLessonClassModal
            open={openEditModal}
            closeFunc={() => setOpenEditModal(false)}
            openFunc={() => setOpenEditModal(true)}
            updateFunc={updateFunc}
            selectedClass={selectedData}
          />
        </div>
      )}
      { implementsPlan(selectedData) && (
        <div>
          <AdminConfirmPlanModal
            plan={selectedData}
            open={openShowModal}
            closeFunc={() => setOpenShowModal(false)}
            type="show"
          />
          <AdminAddPlanModal
            open={openEditModal}
            closeFunc={() => setOpenEditModal(false)}
            openFunc={() => setOpenEditModal(true)}
            updateFunc={updateFunc}
            selectedPlan={selectedData}
          />
        </div>
      )}
    </div>
  );
}

export default RichTableCard;