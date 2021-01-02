import * as React from 'react';
import { Modal, AdminFormInput } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';
// import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';
import { LessonClass, Plan } from 'responses/responseStructs';
import { CreatePlanRequest } from 'request/requestStructs';

interface Props {
  plan: Plan | CreatePlanRequest;
  open: boolean;
  closeFunc: Function;
  cancelFunc?: Function;
  type: "add" | "edit" | "show";
  selectedLessonClasses?: LessonClass[];
  updateFunc?: Function;
  planID?: number;
};

const AdminConfirmPlanModal: React.SFC<Props> = (props) => {
  const { plan, open, closeFunc, cancelFunc, type, selectedLessonClasses, updateFunc, planID } = props;
  const { enqueueSnackbar } = useSnackbar();
  const selectedLessonClassNames = selectedLessonClasses?.map((sClass) => sClass.name);
  // const classes = adminModalStyle();

  const addPlan = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return;
    }

    const res = await fetchApp(
      '/v1/plans',
      'POST',
      accessToken,
      JSON.stringify({
        plan,
      })
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
      return;
    }
    switch (res.status) {
      case 201:
        enqueueSnackbar('コースの作成に成功しました。', { variant: 'success'});
        if (updateFunc) updateFunc();
        break;
      case 422:
        enqueueSnackbar('コースの作成に失敗しました。内容を確かめてください。', { variant: 'error' });
        break;
      default:
        enqueueSnackbar('コースの作成に失敗しました。', { variant: 'error' });
    }
  };

  const updatePlan = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return;
    }
    if (!planID) {
      return;
    }

    const res = await fetchApp(
      `/v1/plans/${planID}`,
      'PATCH',
      accessToken,
      JSON.stringify({
        plan,
      })
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
      return;
    }
    switch (res.status) {
      case 200:
        enqueueSnackbar('コース情報の変更に成功しました。', { variant: 'success'});
        if (updateFunc) updateFunc();
        break;
      case 404:
        enqueueSnackbar(`ID:${planID}のコースが存在しないため変更に失敗しました。`, { variant: 'error' });
        break;
      case 422:
        enqueueSnackbar('コース情報の変更に失敗しました。内容を確かめてください。', { variant: 'error' });
        break;
      default:
        enqueueSnackbar('コース情報の変更に失敗しました。', { variant: 'error' });
    }
  };

  const content =
  <div>
    <AdminFormInput
      labelText="コース名"
      inputType="text"
      value={plan.name}
      confirm
    />
    <AdminFormInput
      labelText="毎月の料金"
      inputType="text"
      value={plan.price + " 円"}
      confirm
    />
    <AdminFormInput
      labelText="このコースで参加できるクラス"
      inputType="text"
      value={selectedLessonClassNames?.join("、")}
      confirm
    />
  </div>;

  return (
    <div>
      { type === "add" && (
        <Modal
          open={open}
          headerTitle="コース新規作成"
          submitText="確定"
          submitFunc={async () => {await addPlan()}}
          cancelText="修正"
          cancelFunc={cancelFunc}
          content={content}
          closeFunc={closeFunc}
          color="success"
        />
      )}
      { type === "edit" && (
        <Modal
          open={open}
          headerTitle="コース情報変更"
          submitText="確定"
          submitFunc={async () => {await updatePlan()}}
          cancelText="修正"
          cancelFunc={cancelFunc}
          content={content}
          closeFunc={closeFunc}
          color="success"
        />
      )}
      { type === "show" && (
        <Modal
          open={open}
          headerTitle="コース情報確認"
          submitText=""
          submitFunc={async () => {await closeFunc()}}
          content={content}
          closeFunc={closeFunc}
          color="success"
          noSubmit
        />
      )}
    </div>

  );
};

export default AdminConfirmPlanModal;