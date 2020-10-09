import * as React from 'react';
import { Modal, AdminFormInput } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';

interface Props {
  user: any;
  open: boolean;
  closeFunc: Function;
  type: "add" | "edit" | "show";
};

const AdminConfirmUserModal: React.SFC<Props> = (props) => {
  const { user, open, closeFunc, type } = props;
  const { enqueueSnackbar } = useSnackbar();

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
    <AdminFormInput
      labelText="名前"
      value={user.first_name}
      confirm
    />;

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
        />
      )}
    </div>

  );
};

export default AdminConfirmUserModal;