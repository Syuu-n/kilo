import * as React from 'react';
import { AdminFormInput, Modal, AdminConfirmLessonClassModal, CustomDropDown, AdminLessonRuleSetting } from 'components';
import { CreateLessonClassRequest } from 'request/requestStructs';
import { LessonClass } from 'responses/responseStructs';
import { ValidationReturn, nameValidation, requireValidation } from 'assets/lib/validations';
import { LessonColor, lessonColorSets, colorCheck } from 'assets/lib/lessonColors';
import { MomentLessonRule, convertLessonRulesToMoment } from 'assets/lib/lessonRules';
import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';
import * as moment from 'moment';

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
  const [description, setDescription] = React.useState<ValidationReturn>({value: '', error: undefined})
  const [location, setLocation] = React.useState<ValidationReturn>({value: '', error: ''})
  const [selectedColor, setSelectedColor] = React.useState({value: '', display_name: 'レッスンカラーを選択', error: ''} as CustomDropDownColor);
  const [forChildren, setForChildren] = React.useState({value: -1, display_name: '種類を選択'});
  const [price, setPrice] = React.useState<ValidationReturn>({value: 0, error: undefined});
  const [userLimitCount, setUserLimitCount] = React.useState<ValidationReturn>({value: 100, error: undefined});
  const [lessonClass, setLessonClass] = React.useState<CreateLessonClassRequest>();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const newLessonRule = {week: -1, dotw: -1, start_at: moment(), end_at: moment().add(1, 'hour')} as MomentLessonRule;
  const [lessonRules, setLessonRules] = React.useState([newLessonRule]);
  const forChildrenSets = [{value: 0, display_name: '大人コース'}, {value: 1, display_name: '子供コース'}];
  const classes = adminModalStyle();

  // レッスンカラー用の div を追加する
  const lessonColorDiv = (color: LessonColor) => {
    const colorCode = colorCheck(color).colorCode;
    const style = {
      backgroundColor: colorCode,
      borderRadius: '3px',
      height: '41px',
      width: '100px',
      margin: 'auto 0px auto 10px'
    }

    return (
      <div style={style} />
    );
  };

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
        labelText="開催場所"
        inputType="text"
        onChangeFunc={(value:string) => {setLocation({value: value, error: requireValidation(value)})}}
        value={location.value}
        required
        errorText={location.error}
      />
      <AdminFormInput
        labelText="クラス説明"
        inputType="text"
        onChangeFunc={(value:string) => {setDescription({value: value, error: undefined})}}
        value={description.value}
        errorText={description.error}
        rowsMin={6}
        rowsMax={6}
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
        labelText="レッスンに参加できる人数"
        inputType="number"
        onChangeFunc={(value:string) => {setUserLimitCount({value: value, error: requireValidation(value)})}}
        value={userLimitCount.value}
        required
        errorText={userLimitCount.error}
      />
      <CustomDropDown
        dropdownList={forChildrenSets}
        hoverColor="success"
        buttonText={forChildren.display_name}
        onClick={setForChildren}
        buttonProps={{color: "success", fullWidth: true}}
        fullWidth
      />
      <div className={classes.flexContainer}>
        <CustomDropDown
          dropdownList={lessonColorSets}
          hoverColor="success"
          buttonText={selectedColor.display_name}
          onClick={(value:any) => setSelectedColor({value: value.name, display_name: value.display_name, error: undefined})}
          buttonProps={{color: "success", fullWidth: true}}
          fullWidth
        />
        {lessonColorDiv(selectedColor.value)}
      </div>
      <AdminLessonRuleSetting
        lessonRules={lessonRules}
        setLessonRuleFunc={setLessonRules}
      />
    </div>;

  const handleSubmit = () => {
    const forChildrenBool = forChildren.value == 1 ? true : false;
    const lc = {
      name: name.value,
      location: location.value,
      description: description.value,
      color: selectedColor.value,
      for_children: forChildrenBool,
      price: price.value,
      user_limit_count: userLimitCount.value,
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
      setLocation({value: selectedClass.location, error: undefined});
      setDescription({value: selectedClass.description, error: undefined});
      setSelectedColor({value: selectedClass.color, display_name: colorCheck(selectedClass.color).colorName, error: undefined});
      setLessonRules(convertLessonRulesToMoment(selectedClass.lesson_rules))
      setForChildren({
        value: selectedClass.for_children ? 1 : 0,
        display_name: selectedClass.for_children ? '子供コース' : '大人コース',
      });
      setPrice({value: selectedClass.price, error: undefined});
      setUserLimitCount({value: selectedClass.user_limit_count, error: undefined})
    };
  }, [selectedClass]);

  const lessonRulesCheck = () => {
    // レッスンルールに -1 (選択してください状態が含まれている)場合は false を返す
    const lrArray = lessonRules.map((lr) => {
      if (lr.week == -1 || lr.dotw == -1) {
        return 0
      } else {
        return 1
      }
    });
    return !lrArray.includes(0);
  };

  React.useEffect(() => {
    // 全てのバリデーションが正しければボタンを有効にする
    if (
      name.error == undefined &&
      location.error == undefined &&
      description.error == undefined &&
      selectedColor.error == undefined &&
      forChildren.value != -1 &&
      price.error == undefined &&
      userLimitCount.error == undefined &&
      lessonRulesCheck()
      ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name, location, description, selectedColor, forChildren, price, userLimitCount, lessonRules])

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
          momentLessonRules={lessonRules}
        />
      )}
    </div>
  );
};

export default AdminAddLessonClassModal;