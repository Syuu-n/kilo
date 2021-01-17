import * as React from 'react';
import { Modal, AdminFormInput, AdminLessonRuleSetting } from 'components';
import { useSnackbar } from 'notistack';
import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';
import { CreateLessonClassRequest } from 'request/requestStructs';
import { createLessonClass, updateLessonClass } from 'request/methods/lessonClasses';
import { LessonClass } from 'responses/responseStructs';
import { colorCheck, LessonColor } from 'assets/lib/lessonColors';
import { MomentLessonRule } from 'assets/lib/lessonRules';

interface Props {
  lessonClass: CreateLessonClassRequest | LessonClass;
  open: boolean;
  closeFunc: Function;
  cancelFunc?: Function;
  type: "add" | "edit" | "show";
  updateFunc?: Function;
  lessonClassID?: number;
  momentLessonRules: MomentLessonRule[];
};

const AdminConfirmLessonClassModal: React.FC<Props> = (props) => {
  const { lessonClass, open, closeFunc, cancelFunc, type, updateFunc, lessonClassID, momentLessonRules } = props;
  const { enqueueSnackbar } = useSnackbar();
  const classes = adminModalStyle();

  // レッスンカラー用の div を追加する
  const lessonColorDiv = (color: LessonColor) => {
    const colorCode = colorCheck(color).colorCode;
    const style = {
      backgroundColor: colorCode,
      borderRadius: '3px',
      height: '30px',
      width: '100px',
      margin: 'auto 10px'
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
      value={lessonClass.name}
      confirm
    />
    <AdminFormInput
      labelText="開催場所"
      inputType="text"
      value={lessonClass.location}
      confirm
    />
    <AdminFormInput
      labelText="クラス説明"
      inputType="text"
      value={lessonClass.description}
      confirm
      rowsMin={6}
      rowsMax={6}
    />
    <AdminFormInput
      labelText="毎月の料金"
      inputType="text"
      value={lessonClass.price + " 円"}
      confirm
    />
    <AdminFormInput
      labelText="レッスンに参加できる人数"
      inputType="text"
      value={lessonClass.user_limit_count + " 人"}
      confirm
    />
    <AdminFormInput
      labelText="種類"
      inputType="text"
      value={lessonClass.for_children ? "子供コース" : "大人コース"}
      confirm
    />
    <div className={classes.flexContainer}>
      <AdminFormInput
        labelText="レッスンカラー"
        inputType="text"
        value={colorCheck(lessonClass.color).colorName}
        confirm
        customClass={classes.fullWidth}
      />
      {lessonColorDiv(lessonClass.color)}
    </div>
    <AdminLessonRuleSetting
      lessonRules={momentLessonRules}
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
          submitFunc={async () => {await createLessonClass(lessonClass, momentLessonRules, enqueueSnackbar, updateFunc)}}
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
          submitFunc={async () => {await updateLessonClass(lessonClass, momentLessonRules, enqueueSnackbar, lessonClassID, updateFunc)}}
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