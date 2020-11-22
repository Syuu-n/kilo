import * as React from 'react';
import { Modal, AdminFormInput } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';
// import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';
import { Plan } from 'responses/responseStructs';

interface Props {
  plan: Plan;
  open: boolean;
  closeFunc: Function;
  cancelFunc?: Function;
  type: "add" | "edit" | "show";
  updateFunc?: Function;
  planID?: number;
};

const AdminConfirmPlanModal: React.SFC<Props> = (props) => {
  const { plan, open, closeFunc, cancelFunc, type, updateFunc, planID } = props;
  const { enqueueSnackbar } = useSnackbar();
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
        break;
      case 422:
        enqueueSnackbar('コースの作成に失敗しました。内容を確かめてください。', { variant: 'error' });
        break;
      default:
        enqueueSnackbar('コースの作成に失敗しました。', { variant: 'error' });
    }
  };

  const addPlanFunc = async () => {
    await addPlan();
    if (updateFunc) updateFunc();
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

  const updatePlanFunc = async () => {
    await updatePlan();
    if (updateFunc) updateFunc();
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
      labelText="毎月の参加可能数"
      inputType="text"
      value={plan.monthly_lesson_count + " 回"}
      confirm
    />
    <AdminFormInput
      labelText="コースの種類"
      inputType="text"
      value={plan.for_children ? "子供コース" : "大人コース"}
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
          submitFunc={async () => {await addPlanFunc()}}
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
          submitFunc={async () => {await updatePlanFunc()}}
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