import * as React from 'react';
import * as moment from 'moment';
import { AdminFormInput, Modal, AdminConfirmUserModal, CustomDropDown, CustomCheckBoxList } from 'components';
import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';
import { CreateUserRequest } from 'request/requestStructs';
import { getPlans } from 'request/methods/plans';
import { getRoles } from 'request/methods/sessions';
import { Role, Plan, User } from 'responses/responseStructs';
import { ValidationReturn, nameValidation, emailValidation, passwordValidation, birthdayValidation, phoneNumberValidation } from 'assets/lib/validations';

interface Props {
  open: boolean;
  closeFunc: Function;
  openFunc: Function;
  updateFunc?: Function;
  selectedUser?: User;
};

const AdminAddUserModal: React.FC<Props> = (props) => {
  const { open, closeFunc, openFunc, updateFunc, selectedUser } = props;
  const [firstName, setFirstName] = React.useState<ValidationReturn>({value: '', error: ''});
  const [lastName, setLastName] = React.useState<ValidationReturn>({value: '', error: ''});
  const [firstNameKana, setFirstNameKana] = React.useState<ValidationReturn>({value: '', error: ''});
  const [lastNameKana, setLastNameKana] = React.useState<ValidationReturn>({value: '', error: ''});
  const [email, setEmail] = React.useState<ValidationReturn>({value: '', error: ''});
  const [password, setPassword] = React.useState<ValidationReturn>({value: '', error: ''});
  const [birthday, setBirthday] = React.useState<ValidationReturn>({value: '', error: ''});
  const [phoneNumber, setPhoneNumber] = React.useState<ValidationReturn>({value: '', error: ''});
  const [roles, setRoles] = React.useState<Role[]>();
  const [selectedRole, setSelectedRole] = React.useState({id: 0, name: 'none', display_name: 'ステータスを選択', error: ''} as Role);
  const [plans, setPlans] = React.useState<Plan[]>();
  const [selectedPlans, setSelectedPlans] = React.useState<number[]>([]);
  const [user, setUser] = React.useState<CreateUserRequest>();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const classes = adminModalStyle();

  const content =
    <div>
      <div className={classes.flexContainer}>
        <AdminFormInput
          labelText="名字"
          inputType="text"
          onChangeFunc={(value:string) => {setLastName({value: value, error: nameValidation(value)})}}
          value={lastName.value}
          customClass={classes.flexContainerFirst}
          required
          errorText={lastName.error}
        />
        <AdminFormInput
          labelText="名前"
          inputType="text"
          onChangeFunc={(value:string) => {setFirstName({value: value, error: nameValidation(value)})}}
          value={firstName.value}
          required
          errorText={firstName.error}
        />
      </div>
      <div className={classes.flexContainer}>
        <AdminFormInput
          labelText="名字（カナ）"
          inputType="text"
          onChangeFunc={(value:string) => {setLastNameKana({value: value, error: nameValidation(value)})}}
          value={lastNameKana.value}
          customClass={classes.flexContainerFirst}
          required
          errorText={lastNameKana.error}
        />
        <AdminFormInput
          labelText="名前（カナ）"
          inputType="text"
          onChangeFunc={(value:string) => {setFirstNameKana({value: value, error: nameValidation(value)})}}
          value={firstNameKana.value}
          required
          errorText={firstNameKana.error}
        />
      </div>
      <AdminFormInput
        labelText="メールアドレス"
        inputType="email"
        onChangeFunc={(value:string) => {setEmail({value: value, error: emailValidation(value)})}}
        value={email.value}
        required
        errorText={email.error}
      />
      { !selectedUser && (
        <AdminFormInput
          labelText="パスワード"
          inputType="text"
          onChangeFunc={(value:string) => {setPassword({value: value, error: passwordValidation(value)})}}
          value={password.value}
          required
          errorText={password.error}
        />
      )}
      <AdminFormInput
        labelText="生年月日"
        inputType="text"
        onChangeFunc={(value:string) => {setBirthday({value: value, error: birthdayValidation(value)})}}
        value={birthday.value}
        placeholder="例：19970216"
        required
        errorText={birthday.error}
      />
      <AdminFormInput
        labelText="電話番号（ハイフンなし）"
        inputType="text"
        onChangeFunc={(value:string) => {setPhoneNumber({value: value, error: phoneNumberValidation(value)})}}
        value={phoneNumber.value}
        placeholder="例：00000000000"
        required
        errorText={phoneNumber.error}
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
      { plans && (
        <div>
          <p className={classes.marginTop}>コースを選択</p>
          <div className={classes.listWrap}>
            <CustomCheckBoxList
              listItems={plans}
              checkedItems={selectedPlans}
              setChecked={setSelectedPlans}
              color="success"
            />
          </div>
        </div>
      )}
    </div>;

  const handleSubmit = () => {
    const user = {
      first_name: firstName.value,
      last_name: lastName.value,
      first_name_kana: firstNameKana.value,
      last_name_kana: lastNameKana.value,
      email: email.value,
      password: password.value,
      birthday: birthday.value,
      phone_number: phoneNumber.value,
      role_id: selectedRole.id,
      plan_ids: selectedPlans,
    } as CreateUserRequest;
    setUser(user);
    setOpenConfirm(true);
  };

  const doCancelFunc = () => {
    // confirm で修正を押したときに Confirm を閉じてから Add を開き直す
    setOpenConfirm(false);
    openFunc();
  };

  React.useEffect(() => {
    const f = async () => {
      await Promise.all([
        setRoles(await getRoles()),
        setPlans(await getPlans()),
      ])
    };
    f();
  }, [])

  React.useEffect(() => {
    if (selectedUser) {
      setFirstName({value: selectedUser.first_name, error: undefined});
      setLastName({value: selectedUser.last_name, error: undefined});
      setFirstNameKana({value: selectedUser.first_name_kana, error: undefined});
      setLastNameKana({value: selectedUser.last_name_kana, error: undefined});
      setEmail({value: selectedUser.email, error: undefined});
      setPassword({value: '', error: undefined})
      setBirthday({value: moment(selectedUser.birthday).format('YYYYMMDD'), error: undefined});
      setPhoneNumber({value: selectedUser.phone_number, error: undefined});
      setSelectedRole(selectedUser.role);
      setSelectedPlans(selectedUser.plans.map((plan) => plan.id));
    };
  }, [selectedUser]);

  React.useEffect(() => {
    // 全てのバリデーションが正しければボタンを有効にする
    if (
      lastName.error == undefined &&
      firstName.error == undefined &&
      lastNameKana.error == undefined &&
      firstNameKana.error == undefined &&
      email.error == undefined &&
      password.error == undefined &&
      birthday.error == undefined &&
      phoneNumber.error == undefined &&
      selectedRole.id != 0
      ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [lastName, firstName, firstNameKana, lastNameKana, email, password, birthday, phoneNumber, selectedRole])

  return (
    <div>
      <Modal
        open={open}
        headerTitle={selectedUser ? "ユーザ情報変更" : "ユーザー新規作成"}
        submitText="確認"
        submitFunc={async () => {await handleSubmit()}}
        content={content}
        closeFunc={closeFunc}
        color="success"
        disabled={buttonDisabled}
      />
      { user && plans && (
        <AdminConfirmUserModal
          open={openConfirm}
          user={user}
          selectedRole={selectedRole}
          selectedPlans={selectedPlans.map((sPlan) => plans.find((plan) => plan.id === sPlan)) as Plan[]}
          closeFunc={() => setOpenConfirm(false)}
          cancelFunc={() => doCancelFunc()}
          type={selectedUser ? "edit" : "add"}
          updateFunc={updateFunc}
          userID={selectedUser ? selectedUser.id : undefined}
        />
      )}
    </div>
  );
};

export default AdminAddUserModal;