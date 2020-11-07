import * as React from 'react';
import { AdminFormInput, Modal, AdminConfirmPlanModal, CustomDropDown } from 'components';
import { Plan } from 'responses/responseStructs';
import { ValidationReturn, nameValidation, requireValidation } from 'assets/lib/validations';
// import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';

interface Props {
  open: boolean;
  closeFunc: Function;
  openFunc: Function;
  updateFunc?: Function;
  selectedPlan?: Plan;
};

const AdminAddPlanModal: React.FC<Props> = (props) => {
  const { open, closeFunc, openFunc, updateFunc, selectedPlan } = props;
  const [name, setName] = React.useState<ValidationReturn>({value: '', error: ''});
  const [price, setPrice] = React.useState<ValidationReturn>({value: 0, error: undefined});
  const [monthlyLessonCount, setMonthlyLessonCount] = React.useState<ValidationReturn>({value: 0, error: undefined});
  const [forChildren, setForChildren] = React.useState({value: -1, display_name: 'コースの種類を選択'});
  const [plan, setPlan] = React.useState<Plan>();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const forChildrenSets = [{value: 0, display_name: '大人コース'}, {value: 1, display_name: '子供コース'}];
  // const classes = adminModalStyle();

  const content =
    <div>
      <AdminFormInput
        labelText="コース名"
        inputType="text"
        onChangeFunc={(value:string) => {setName({value: value, error: nameValidation(value)})}}
        value={name.value}
        required
        errorText={name.error}
      />
      <AdminFormInput
        labelText="毎月の料金"
        inputType="number"
        onChangeFunc={(value:string) => {setPrice({value: value, error: requireValidation(value)})}}
        value={price.value}
        required
        errorText={price.error}
      />
      <AdminFormInput
        labelText="毎月の参加可能数"
        inputType="number"
        onChangeFunc={(value:string) => {setMonthlyLessonCount({value: value, error: requireValidation(value)})}}
        value={monthlyLessonCount.value}
        required
        errorText={monthlyLessonCount.error}
      />
      <CustomDropDown
        dropdownList={forChildrenSets}
        hoverColor="success"
        buttonText={forChildren.display_name}
        onClick={setForChildren}
        buttonProps={{color: "success", fullWidth: true}}
        fullWidth
      />
    </div>;

  const handleSubmit = () => {
    const forChildrenBool = forChildren.value == 1 ? true : false;
    const pl = {
      name: name.value,
      price: price.value,
      monthly_lesson_count: monthlyLessonCount.value,
      for_children: forChildrenBool,
    } as Plan;
    setPlan(pl);
    setOpenConfirm(true);
  };

  const doCancelFunc = () => {
    // confirm で修正を押したときに Confirm を閉じてから Add を開き直す
    setOpenConfirm(false);
    openFunc();
  };

  // 編集の場合は selectedPlan が prop で渡される
  React.useEffect(() => {
    if (selectedPlan) {
      setName({value: selectedPlan.name, error: undefined});
      setPrice({value: selectedPlan.price, error: undefined});
      setMonthlyLessonCount({value: selectedPlan.monthly_lesson_count, error: undefined});
      setForChildren({
        value: selectedPlan.for_children ? 1 : 0,
        display_name: selectedPlan.for_children ? '子供コース' : '大人コース',
      });
    };
  }, [selectedPlan]);

  React.useEffect(() => {
    // 全てのバリデーションが正しければボタンを有効にする
    if (
      name.error == undefined &&
      price.error == undefined &&
      monthlyLessonCount.error == undefined &&
      forChildren.value != -1
      ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name, price, monthlyLessonCount, forChildren])

  return (
    <div>
      <Modal
        open={open}
        headerTitle={selectedPlan ? "コース情報変更" : "コース新規作成"}
        submitText="確認"
        submitFunc={async () => {await handleSubmit()}}
        content={content}
        closeFunc={closeFunc}
        color="success"
        disabled={buttonDisabled}
      />
      { plan && (
        <AdminConfirmPlanModal
          open={openConfirm}
          plan={plan}
          closeFunc={() => setOpenConfirm(false)}
          cancelFunc={() => doCancelFunc()}
          type={selectedPlan ? "edit" : "add"}
          updateFunc={updateFunc}
          planID={selectedPlan ? selectedPlan.id : undefined}
        />
      )}
    </div>
  );
};

export default AdminAddPlanModal;