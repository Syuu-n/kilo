import * as React from 'react';
import { Modal, AdminFormInput } from 'components';
// import { fetchApp, NetworkError } from 'request/fetcher';
// import { useSnackbar } from 'notistack';
import adminAddUserModalStyle from 'assets/jss/kiloStyles/adminAddUserModalStyle';
import { CreateLessonClassRequest } from 'request/requestStructs';
import { LessonClass } from 'responses/responseStructs';
import { colorCheck } from 'assets/lib/lessonColors';

interface Props {
  lessonClass?: CreateLessonClassRequest | LessonClass;
  open: boolean;
  closeFunc: Function;
  cancelFunc?: Function;
  type: "add" | "edit" | "show";
  updateFunc?: Function;
  lessonClassID?: number;
};

const AdminConfirmLessonClassModal: React.SFC<Props> = (props) => {
  const { lessonClass, open, closeFunc, cancelFunc, type, updateFunc } = props;
  // const { enqueueSnackbar } = useSnackbar();
  const classes = adminAddUserModalStyle();

  const addLessonClass = async () => {
    // const accessToken = localStorage.getItem('kiloToken');
    // if (!accessToken) {
    //   return;
    // }

    // const res = await fetchApp(
    //   '/v1/users',
    //   'POST',
    //   accessToken,
    //   JSON.stringify({
    //     user,
    //   })
    // )

    // if (res instanceof NetworkError) {
    //   console.log("ServerError");
    //   enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    //   return;
    // }

    // switch (res.status) {
    //   case 201:
    //     enqueueSnackbar('ユーザーの作成に成功しました。', { variant: 'success'});
    //     break;
    //   case 400:
    //     enqueueSnackbar('既に使用されているメールアドレスです。', { variant: 'error' });
    //     break; 
    //   case 422:
    //     enqueueSnackbar('ユーザーの作成に失敗しました。内容を確かめてください。', { variant: 'error' });
    //     break;
    // }
  };

  const addLessonClassFunc = async () => {
    await addLessonClass();
    if (updateFunc) updateFunc();
  };

  const updateLessonClass = async () => {
    // const accessToken = localStorage.getItem('kiloToken');
    // if (!accessToken) {
    //   return;
    // }
    // if (!userID) {
    //   return;
    // }

    // const res = await fetchApp(
    //   `/v1/users/${userID}`,
    //   'PATCH',
    //   accessToken,
    //   JSON.stringify({
    //     user,
    //   })
    // )

    // if (res instanceof NetworkError) {
    //   console.log("ServerError");
    //   enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    //   return;
    // }

    // switch (res.status) {
    //   case 200:
    //     enqueueSnackbar('ユーザー情報の変更に成功しました。', { variant: 'success'});
    //     break;
    //   case 404:
    //     enqueueSnackbar(`ID:${userID}のユーザが存在しないため変更に失敗しました。`, { variant: 'error' });
    //     break;
    //   case 422:
    //     enqueueSnackbar('ユーザー情報の変更に失敗しました。内容を確かめてください。', { variant: 'error' });
    //     break;
    // }
  };

  const updateLessonClassFunc = async () => {
    await updateLessonClass();
    if (updateFunc) updateFunc();
  };

  const content =
  <div>
    <AdminFormInput
      labelText="クラス名"
      inputType="text"
      value={lessonClass?.name}
      customClass={classes.flexContainerFirst}
      confirm
    />
    <AdminFormInput
      labelText="クラス説明"
      inputType="text"
      value={lessonClass?.description}
      confirm
    />
    <AdminFormInput
      labelText="レッスンカラー"
      inputType="text"
      value={colorCheck(lessonClass?.color).colorName}
      confirm
    />
  </div>;

  return (
    <div>
      { type === "add" && (
        <Modal
          open={open}
          headerTitle="クラス新規作成"
          submitText="確定"
          submitFunc={async () => {await addLessonClassFunc()}}
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
          headerTitle="クラス情報変更"
          submitText="確定"
          submitFunc={async () => {await updateLessonClassFunc()}}
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
          headerTitle="クラス情報確認"
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

export default AdminConfirmLessonClassModal;