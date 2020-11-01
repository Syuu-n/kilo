import * as React from 'react';
import { AdminFormInput, Modal, AdminConfirmLessonClassModal, CustomDropDown, Card, CardBody, IconButton } from 'components';
import { CreateLessonClassRequest } from 'request/requestStructs';
import { LessonClass } from 'responses/responseStructs';
import { ValidationReturn, nameValidation, requireValidation } from 'assets/lib/validations';
import { LessonColor, lessonColorSets, colorCheck } from 'assets/lib/lessonColors';
import { adminModalStyle, pickerTheme } from 'assets/jss/kiloStyles/adminModalStyle';
import { lessonRuleWeekSets, lessonRuleDotwSets, weekCheck, dotwCheck } from 'assets/lib/lessonRules';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as moment from 'moment';
import { ThemeProvider } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

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
  const [selectedColor, setSelectedColor] = React.useState({value: '', display_name: 'レッスンカラーを選択', error: ''} as CustomDropDownColor);
  const [lessonClass, setLessonClass] = React.useState<CreateLessonClassRequest>();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const newLessonRule = {week: -1, dotw: -1, start_at: moment(), end_at: moment().add(1, 'hour')};
  const [lessonRules, setLessonRules] = React.useState([newLessonRule]);
  const classes = adminModalStyle();

  const handleLessonRuleChange = (count:number, week?:number, dotw?:number, startAt?:moment.Moment|null, endAt?:moment.Moment|null) => {
    // lessonRules のディープコピー
    const lrs = lessonRules.filter((lr) => true);
    const lr = {
      week: week != undefined ? week : lrs[count].week,
      dotw: dotw != undefined ? dotw : lrs[count].dotw,
      start_at: startAt ? startAt : lrs[count].start_at,
      end_at: endAt ? endAt : lrs[count].end_at,
    };
    lrs[count] = lr;
    setLessonRules(lrs);
  };

  const handleAddLessonRule = () => {
    const lrs = lessonRules.filter((lr) => true);
    lrs.push(newLessonRule);
    setLessonRules(lrs);
  };

  const ruleSettings =
    <div>
      { lessonRules.map((lr, i) => (
        <Card key={i}>
          <CardBody>
            <div className={classes.flexMarginBottomContainer}>
              <CustomDropDown
                dropdownList={lessonRuleWeekSets}
                hoverColor="success"
                buttonText={lr.week == -1 ? '週を選択' : weekCheck(lr.week)}
                onClick={(value:any) => handleLessonRuleChange(i, value.name)}
                buttonProps={{color: "success", fullWidth: true}}
                fullWidth
                customClass={classes.flexContainerFirst}
              />
              <CustomDropDown
                dropdownList={lessonRuleDotwSets}
                hoverColor="success"
                buttonText={lr.dotw == -1 ? '曜日を選択' : dotwCheck(lr.dotw)}
                onClick={(value:any) => handleLessonRuleChange(i, undefined, value.name)}
                buttonProps={{color: "success", fullWidth: true}}
                fullWidth
              />
            </div>
            <div className={classes.flexContainer}>
              <ThemeProvider theme={pickerTheme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <TimePicker
                    showTodayButton
                    todayLabel="現在時刻"
                    okLabel="決定"
                    cancelLabel="キャンセル"
                    label="開始時間"
                    value={lr.start_at}
                    onChange={(date:moment.Moment|null) => handleLessonRuleChange(i, undefined, undefined, date)}
                    format="A h:mm"
                    className={classes.flexContainerFirst}
                  />
                  <TimePicker
                    showTodayButton
                    todayLabel="現在時刻"
                    okLabel="決定"
                    cancelLabel="キャンセル"
                    label="終了時間"
                    value={lr.end_at}
                    onChange={(date:moment.Moment|null) => handleLessonRuleChange(i, undefined, undefined, undefined ,date)}
                    format="A h:mm"
                  />
                </MuiPickersUtilsProvider>
              </ThemeProvider>
            </div>
          </CardBody>
        </Card>
      ))}
      { lessonRules.length < 3 && (
        <IconButton
        color="white"
        // customClass={classes.closeButton}
        key="Close"
        onClick={() => handleAddLessonRule()}
        >
          <AddCircle />
        </IconButton>
      )}
    </div>;

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
        errorText={description.error}
        rowsMin={6}
        rowsMax={6}
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
      {ruleSettings}
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