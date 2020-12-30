import * as React from 'react';
import * as moment from 'moment';
import { Modal, AdminFormInput } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';
import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';
import { CreateUserRequest } from 'request/requestStructs';
import { Role, Plan, User } from 'responses/responseStructs';

interface Props {
  user?: CreateUserRequest | User;
  open: boolean;
  closeFunc: Function;
  cancelFunc?: Function;
  type: "add" | "edit" | "show";
  selectedRole?: Role;
  selectedPlans?: Plan[];
  updateFunc?: Function;
  userID?: number;
};

const AdminConfirmUserModal: React.FC<Props> = (props) => {
  const { user, open, closeFunc, cancelFunc, type, selectedRole, selectedPlans, updateFunc, userID } = props;
  const { enqueueSnackbar } = useSnackbar();
  const classes = adminModalStyle();
  const selectedPlanNames = selectedPlans?.map((sPlan) => sPlan.name);

  const addUser = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return;
    }

    const res = await fetchApp(
      '/v1/users',
      'POST',
      accessToken,
      JSON.stringify({
        user,
      })
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
      return;
    }

    switch (res.status) {
      case 201:
        enqueueSnackbar('ユーザーの作成に成功しました。', { variant: 'success'});
        if (updateFunc) updateFunc();
        break;
      case 400:
        enqueueSnackbar('既に使用されているメールアドレスです。', { variant: 'error' });
        break; 
      case 422:
        enqueueSnackbar('ユーザーの作成に失敗しました。内容を確かめてください。', { variant: 'error' });
        break;
    }
  };

  const updateUser = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return;
    }
    if (!userID) {
      return;
    }

    // 更新処理の場合は User オブジェクトから password を削除する
    delete user?.password

    const res = await fetchApp(
      `/v1/users/${userID}`,
      'PATCH',
      accessToken,
      JSON.stringify({
        user,
      })
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
      return;
    }

    switch (res.status) {
      case 200:
        enqueueSnackbar('ユーザー情報の変更に成功しました。', { variant: 'success'});
        if (updateFunc) updateFunc();
        break;
      case 404:
        enqueueSnackbar(`ID:${userID}のユーザが存在しないため変更に失敗しました。`, { variant: 'error' });
        break;
      case 422:
        enqueueSnackbar('ユーザー情報の変更に失敗しました。内容を確かめてください。', { variant: 'error' });
        break;
    }
  };

  const content =
  <div>
    <div className={classes.flexContainer}>
      <AdminFormInput
        labelText="名字"
        inputType="text"
        value={user?.last_name}
        customClass={classes.flexContainerFirst}
        confirm
      />
      <AdminFormInput
        labelText="名前"
        inputType="text"
        value={user?.first_name}
        confirm
      />
    </div>
    <div className={classes.flexContainer}>
      <AdminFormInput
        labelText="名字（カナ）"
        inputType="text"
        value={user?.last_name_kana}
        customClass={classes.flexContainerFirst}
        confirm
      />
      <AdminFormInput
        labelText="名前（カナ）"
        inputType="text"
        value={user?.first_name_kana}
        confirm
      />
    </div>
    <AdminFormInput
      labelText="メールアドレス"
      inputType="email"
      value={user?.email}
      confirm
    />
    { type == "add" && (
      <AdminFormInput
        labelText="パスワード"
        inputType="text"
        value={user?.password}
        confirm
      />
    )}
    <AdminFormInput
      labelText="生年月日"
      inputType="text"
      value={moment(user?.birthday).format("LL")}
      confirm
    />
    <AdminFormInput
      labelText="電話番号"
      inputType="text"
      value={user?.phone_number}
      confirm
    />
    <AdminFormInput
      labelText="ステータス"
      inputType="text"
      value={selectedRole?.display_name}
      confirm
    />
    <AdminFormInput
      labelText="コース"
      inputType="text"
      value={selectedPlanNames?.join("、")}
      confirm
    />
  </div>;

  return (
    <div>
      { type === "add" && (
        <Modal
          open={open}
          headerTitle="ユーザー新規作成"
          submitText="確定"
          submitFunc={async () => {await addUser()}}
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
          headerTitle="ユーザー情報変更"
          submitText="確定"
          submitFunc={async () => {await updateUser()}}
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
          headerTitle="ユーザー情報確認"
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

export default AdminConfirmUserModal;