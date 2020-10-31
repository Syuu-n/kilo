import * as React from 'react';
import { AdminFormInput, Modal, AdminConfirmLessonClassModal, CustomDropDown } from 'components';
import { CreateLessonClassRequest } from 'request/requestStructs';
import { LessonClass } from 'responses/responseStructs';
import { ValidationReturn, nameValidation, requireValidation } from 'assets/lib/validations';
import { LessonColor, lessonColorSets, colorCheck } from 'assets/lib/lessonColors';
import adminModalStyle from 'assets/jss/kiloStyles/adminModalStyle';

interface Props {
  open: boolean;
  closeFunc: Function;
  openFunc: Function;
  updateFunc?: Function;
  selectedClass?: LessonClass;
};

interface CustomDropDownColor {
  value: LessonColor;
  display_name: string;
  error: string | undefined;
};

const AdminAddLessonClassModal: React.FC<Props> = (props) => {
  const { open, closeFunc, openFunc, updateFunc, selectedClass } = props;
  const [name, setName] = React.useState<ValidationReturn>({value: '', error: ''});
  const [description, setDescription] = React.useState<ValidationReturn>({value: '', error: ''})
  const [selectedColor, setSelectedColor] = React.useState({value: '', display_name: 'レッスンカラーを選択', error: ''} as CustomDropDownColor);
  const [lessonClass, setLessonClass] = React.useState<CreateLessonClassRequest>();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const classes = adminModalStyle();

  const content =
    <div>
      <AdminFormInput
        labelText="クラス名"
        inputType="text"
        onChangeFunc={(value:string) => {setName({value: value, error: nameValidation(value)})}}
        value={name.value}
        required
        errorText={name.error}
      />
      <AdminFormInput
        labelText="クラス説明"
        inputType="text"
        onChangeFunc={(value:string) => {setDescription({value: value, error: requireValidation(value)})}}
        value={description.value}
        required
        errorText={description.error}
        rowsMin={10}
        rowsMax={10}
        customClass={classes.descriptionContainer}
      />
      <CustomDropDown
        dropdownList={lessonColorSets}
        hoverColor="success"
        buttonText={selectedColor.display_name}
        onClick={setSelectedColor}
        buttonProps={{color: "success", fullWidth: true}}
        fullWidth
      />
    </div>;

  const handleSubmit = () => {
    const lc = {
      name: name.value,
      description: description.value,
      color: selectedColor.value,
    } as CreateLessonClassRequest;
    setLessonClass(lc);
    setOpenConfirm(true);
  };

  const doCancelFunc = () => {
    // confirm で修正を押したときに Confirm を閉じてから Add を開き直す
    setOpenConfirm(false);
    openFunc();
  };

  // 編集の場合は selectedClass が prop で渡される
  React.useEffect(() => {
    if (selectedClass) {
      setName({value: selectedClass.name, error: undefined});
      setDescription({value: selectedClass.description, error: undefined});
      setSelectedColor({value: selectedClass.color, display_name: colorCheck(selectedClass.color).colorName, error: undefined});
    };
  }, [setLessonClass]);

  React.useEffect(() => {
    // 全てのバリデーションが正しければボタンを有効にする
    if (
      name.error == undefined &&
      description.error == undefined &&
      selectedColor.error == undefined
      ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name, description, selectedColor])

  return (
    <div>
      <Modal
        open={open}
        headerTitle={selectedClass ? "クラス情報変更" : "クラス新規作成"}
        submitText="確認"
        submitFunc={async () => {await handleSubmit()}}
        content={content}
        closeFunc={closeFunc}
        color="success"
        disabled={buttonDisabled}
      />
      { lessonClass && (
        <AdminConfirmLessonClassModal
          open={openConfirm}
          lessonClass={lessonClass}
          closeFunc={() => setOpenConfirm(false)}
          cancelFunc={() => doCancelFunc()}
          type={selectedClass ? "edit" : "add"}
          updateFunc={updateFunc}
          lessonClassID={selectedClass ? selectedClass.id : undefined}
        />
      )}
    </div>
  );
};

export default AdminAddLessonClassModal;