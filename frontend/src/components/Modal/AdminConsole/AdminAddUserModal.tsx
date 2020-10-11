import * as React from 'react';
import { AdminFormInput, Modal, AdminConfirmUserModal, CustomDropDown } from 'components';
import adminAddUserModalStyle from 'assets/jss/kiloStyles/adminAddUserModalStyle';
import { CreateUserRequest } from 'request/requestStructs';
import { fetchApp, NetworkError } from 'request/fetcher';
import { Role } from 'responses/responseStructs';

interface Props {
  open: boolean;
  closeFunc: Function;
};

const AdminAddUserModal: React.FC<Props> = (props) => {
  const { open, closeFunc } = props;
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [firstNameKana, setFirstNameKana] = React.useState("");
  const [lastNameKana, setLastNameKana] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [roles, setRoles] = React.useState<Role[]>()
  const [selectedRole, setSelectedRole] = React.useState({id: 0, name: 'none', display_name: 'ステータスを選択'} as Role);
  const [user, setUser] = React.useState<CreateUserRequest>();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const classes = adminAddUserModalStyle();

  const getRoles = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return null;
    }
  
    const res = await fetchApp(
      '/v1/roles',
      'GET',
      accessToken,
    )
  
    if (res instanceof NetworkError) {
      console.log("ServerError");
      return null;
    }
  
    if (res.ok) {
      const json = await res.json();
      return json;
    } else {
      return null;
    }
  };

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
      { roles && (
        <CustomDropDown
          dropdownList={roles}
          hoverColor="success"
          buttonText={selectedRole.display_name}
          onClick={setSelectedRole}
          buttonProps={{color: "success", fullWidth: true}}
          fullWidth
        />
      )}
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
      role_id: selectedRole.id,
    };
    setUser(user);
    setOpenConfirm(true);
  };

  React.useEffect(() => {
    const f = async () => {
      setRoles(await getRoles());
    };
    f();
  }, [])

  return (
    <div>
      <Modal
        open={open}
        headerTitle="ユーザー新規作成"
        submitText="確認"
        submitFunc={async () => {await handleSubmit()}}
        content={content}
        closeFunc={closeFunc}
        color="success"
      />
      { user && (
        <AdminConfirmUserModal
          open={openConfirm}
          user={user}
          selectedRole={selectedRole}
          closeFunc={() => setOpenConfirm(false)}
          type="add"
        />
      )}
    </div>
  );
};

export default AdminAddUserModal;