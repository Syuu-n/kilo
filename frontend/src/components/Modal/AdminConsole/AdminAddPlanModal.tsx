import * as React from 'react';
import { AdminFormInput, Modal, AdminConfirmPlanModal, CustomCheckBoxList } from 'components';
import { Plan, LessonClass } from 'responses/responseStructs';
import { CreatePlanRequest } from 'request/requestStructs';
import { fetchApp, NetworkError } from 'request/fetcher';
import { ValidationReturn, nameValidation, requireValidation } from 'assets/lib/validations';
import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';

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
  const [lessonClasses, setLessonClasses] = React.useState<LessonClass[]>();
  const [plan, setPlan] = React.useState<CreatePlanRequest>();
  const [selectedLessonClasses, setSelectedLessonClasses] = React.useState<number[]>([]);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const classes = adminModalStyle();

  const getLessonClasses = async (): Promise<LessonClass[] | undefined> => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return;
    }

    const res = await fetchApp(
      '/v1/lesson_classes',
      'GET',
      accessToken,
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      return;
    }

    if (res.ok) {
      const json = await res.json();
      return json;
    } else {
      return;
    }
  };

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
      { lessonClasses && (
        <div>
          <p className={classes.marginTop}>このコースで参加できるクラス</p>
          <div className={classes.listWrap}>
            <CustomCheckBoxList
              listItems={lessonClasses}
              checkedItems={selectedLessonClasses}
              setChecked={setSelectedLessonClasses}
              color="success"
            />
          </div>
        </div>
      )}
    </div>;

  const handleSubmit = () => {
    const pl = {
      name: name.value,
      price: price.value,
      lesson_class_ids: selectedLessonClasses,
    } as CreatePlanRequest;
    setPlan(pl);
    setOpenConfirm(true);
  };

  const doCancelFunc = () => {
    // confirm で修正を押したときに Confirm を閉じてから Add を開き直す
    setOpenConfirm(false);
    openFunc();
  };

  React.useEffect(() => {
    const f = async () => {
      setLessonClasses(await getLessonClasses())
    };
    f();
  }, [])

  // 編集の場合は selectedPlan が prop で渡される
  React.useEffect(() => {
    if (selectedPlan) {
      setName({value: selectedPlan.name, error: undefined});
      setPrice({value: selectedPlan.price, error: undefined});
      setSelectedLessonClasses(selectedPlan.lesson_classes.map((sClass) => sClass.id));
    };
  }, [selectedPlan]);

  React.useEffect(() => {
    // 全てのバリデーションが正しければボタンを有効にする
    if (
      name.error == undefined &&
      price.error == undefined
      ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name, price])

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
      { plan && lessonClasses && (
        <AdminConfirmPlanModal
          open={openConfirm}
          plan={plan}
          selectedLessonClasses={selectedLessonClasses.map((sClass) => lessonClasses.find((klass) => klass.id === sClass)) as LessonClass[]}
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