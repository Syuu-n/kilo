import * as React from 'react';
import { AdminFormInput, Modal, AdminConfirmUserModal } from 'components';
import { AuthContext } from 'Auth';
import adminAddUserModalStyle from 'assets/jss/kiloStyles/adminAddUserModalStyle';
import { CreateUserRequest } from 'request/requestStructs';

interface Props {
  open: boolean;
  closeFunc: Function;
};

const AdminAddUserModal: React.FC<Props> = (props) => {
  const { open, closeFunc } = props;
  const { roles } = React.useContext(AuthContext);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [firstNameKana, setFirstNameKana] = React.useState("");
  const [lastNameKana, setLastNameKana] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [user, setUser] = React.useState<CreateUserRequest>();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const classes = adminAddUserModalStyle();

  const content =
    <div>
      <div className={classes.flexContainer}>
        <AdminFormInput
          labelText="名字"
          inputType="text"
          onChangeFunc={setLastName}
          value={lastName}
          customClass={classes.flexContainerFirst}
        />
        <AdminFormInput
          labelText="名前"
          inputType="text"
          onChangeFunc={setFirstName}
          value={firstName}
        />
      </div>
      <div className={classes.flexContainer}>
        <AdminFormInput
          labelText="名字（カナ）"
          inputType="text"
          onChangeFunc={setLastNameKana}
          value={lastNameKana}
          customClass={classes.flexContainerFirst}
        />
        <AdminFormInput
          labelText="名前（カナ）"
          inputType="text"
          onChangeFunc={setFirstNameKana}
          value={firstNameKana}
        />
      </div>
      <AdminFormInput
        labelText="メールアドレス"
        inputType="email"
        onChangeFunc={setEmail}
        value={email}
      />
      <AdminFormInput
        labelText="パスワード"
        inputType="text"
        onChangeFunc={setPassword}
        value={password}
      />
      <AdminFormInput
        labelText="生年月日"
        inputType="text"
        onChangeFunc={setBirthday}
        value={birthday}
      />
      <AdminFormInput
        labelText="電話番号"
        inputType="text"
        onChangeFunc={setPhoneNumber}
        value={phoneNumber}
      />
    </div>;

  const handleSubmit = () => {
    const user = {
      first_name: firstName,
      last_name: lastName,
      first_name_kana: firstNameKana,
      last_name_kana: lastNameKana,
      email: email,
      password: password,
      birthday: birthday,
      phone_number: phoneNumber,
    };
    setUser(user);
    setOpenConfirm(true);
  };

  return (
    <div>
      { roles && (
        <Modal
          open={open}
          headerTitle="ユーザー新規作成"
          submitText="確認"
          submitFunc={async () => {await handleSubmit()}}
          content={content}
          closeFunc={closeFunc}
          color="success"
        />
      )}
      { user && (
        <AdminConfirmUserModal
          open={openConfirm}
          user={user}
          closeFunc={() => setOpenConfirm(false)}
          type="add"
        />
      )}
    </div>
  );
};

export default AdminAddUserModal;