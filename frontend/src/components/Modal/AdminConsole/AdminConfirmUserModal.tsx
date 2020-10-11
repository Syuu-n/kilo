import * as React from 'react';
import { Modal, AdminFormInput } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';
import adminAddUserModalStyle from 'assets/jss/kiloStyles/adminAddUserModalStyle';
import { CreateUserRequest } from 'request/requestStructs';
import { Role } from 'responses/responseStructs';

interface Props {
  user: CreateUserRequest;
  open: boolean;
  closeFunc: Function;
  type: "add" | "edit" | "show";
  selectedRole: Role;
};

const AdminConfirmUserModal: React.SFC<Props> = (props) => {
  const { user, open, closeFunc, type, selectedRole } = props;
  const { enqueueSnackbar } = useSnackbar();
  const classes = adminAddUserModalStyle();

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
        enqueueSnackbar('ユーザーの作成が成功しました。', { variant: 'success'});
        break;
      case 400:
        enqueueSnackbar('既に使用されているメールアドレスです。', { variant: 'error' });
        break; 
      case 422:
        enqueueSnackbar('ユーザーの作成に失敗しました', { variant: 'error' });
        break;
    }
  };

  const content =
  <div>
    <div className={classes.flexContainer}>
      <AdminFormInput
        labelText="名字"
        inputType="text"
        value={user.last_name}
        customClass={classes.flexContainerFirst}
        confirm
      />
      <AdminFormInput
        labelText="名前"
        inputType="text"
        value={user.first_name}
        confirm
      />
    </div>
    <div className={classes.flexContainer}>
      <AdminFormInput
        labelText="名字（カナ）"
        inputType="text"
        value={user.last_name_kana}
        customClass={classes.flexContainerFirst}
        confirm
      />
      <AdminFormInput
        labelText="名前（カナ）"
        inputType="text"
        value={user.first_name_kana}
        confirm
      />
    </div>
    <AdminFormInput
      labelText="メールアドレス"
      inputType="email"
      value={user.email}
      confirm
    />
    <AdminFormInput
      labelText="パスワード"
      inputType="text"
      value={user.password}
      confirm
    />
    <AdminFormInput
      labelText="生年月日"
      inputType="text"
      value={user.birthday}
      confirm
    />
    <AdminFormInput
      labelText="電話番号"
      inputType="text"
      value={user.phone_number}
      confirm
    />
    <AdminFormInput
      labelText="ステータス"
      inputType="text"
      value={selectedRole.display_name}
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
          submitFunc={async () => {await closeFunc()}}
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
        />
      )}
    </div>

  );
};

export default AdminConfirmUserModal;