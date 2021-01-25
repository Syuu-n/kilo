import * as React from 'react';
import * as moment from 'moment';
import { Modal, AdminFormInput } from 'components';
import { createUser, updateUser } from 'request/methods/users';
import { useSnackbar } from 'notistack';
import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';
import { CreateUserRequest } from 'request/requestStructs';
import { Role, Plan, User } from 'responses/responseStructs';

interface Props {
  user: CreateUserRequest | User;
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
          submitFunc={async () => {await createUser(user, enqueueSnackbar, updateFunc)}}
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
          submitFunc={async () => {await updateUser(user, enqueueSnackbar, userID, updateFunc)}}
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