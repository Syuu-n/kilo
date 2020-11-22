import * as React from 'react';
import { Modal, AdminFormInput, AdminLessonRuleSetting } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';
import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';
import { CreateLessonClassRequest } from 'request/requestStructs';
import { LessonClass } from 'responses/responseStructs';
import { colorCheck, LessonColor } from 'assets/lib/lessonColors';
import { MomentLessonRule, convertMomentLessonRulesToRequest } from 'assets/lib/lessonRules';

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

const AdminConfirmLessonClassModal: React.SFC<Props> = (props) => {
  const { lessonClass, open, closeFunc, cancelFunc, type, updateFunc, lessonClassID, momentLessonRules } = props;
  const { enqueueSnackbar } = useSnackbar();
  const classes = adminModalStyle();

  const addLessonClass = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return;
    }

    // NOTE: JSON.stringify で key になるため lesson_class という名前になっている
    const lesson_class = {
      name: lessonClass.name,
      description: lessonClass.description,
      color: lessonClass.color,
      lesson_rules: convertMomentLessonRulesToRequest(momentLessonRules),
    };

    const res = await fetchApp(
      '/v1/lesson_classes',
      'POST',
      accessToken,
      JSON.stringify({
        lesson_class,
      })
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
      return;
    }
    const json = await res.json();
    switch (res.status) {
      case 201:
        enqueueSnackbar('クラスの作成に成功しました。', { variant: 'success'});
        break;
      case 422:
        switch (json.code) {
          case 'no_lesson_rule_error':
            enqueueSnackbar('スケジュールが設定されていないためクラスの作成に失敗しました。', { variant: 'error' });
            break;
          case 'lesson_rule_invalid_error':
            enqueueSnackbar('スケジュールの作成に失敗したためクラスの作成に失敗しました。', { variant: 'error' });
          default:
            enqueueSnackbar('クラスの作成に失敗しました。内容を確かめてください。', { variant: 'error' });
        };
        break;
      default:
        enqueueSnackbar('クラスの作成に失敗しました。', { variant: 'error' });
    }
  };

  const addLessonClassFunc = async () => {
    await addLessonClass();
    if (updateFunc) updateFunc();
  };

  const updateLessonClass = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return;
    }
    if (!lessonClassID) {
      return;
    }

    // NOTE: JSON.stringify で key になるため lesson_class という名前になっている
    const lesson_class = {
      name: lessonClass.name,
      description: lessonClass.description,
      color: lessonClass.color,
      lesson_rules: convertMomentLessonRulesToRequest(momentLessonRules),
    };

    const res = await fetchApp(
      `/v1/lesson_classes/${lessonClassID}`,
      'PATCH',
      accessToken,
      JSON.stringify({
        lesson_class,
      })
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
      return;
    }
    const json = await res.json();
    switch (res.status) {
      case 200:
        enqueueSnackbar('クラス情報の変更に成功しました。', { variant: 'success'});
        break;
      case 404:
        enqueueSnackbar(`ID:${lessonClassID}のクラスが存在しないため変更に失敗しました。`, { variant: 'error' });
        break;
      case 422:
        switch (json.code) {
          case 'no_lesson_rule_error':
            enqueueSnackbar('スケジュールが設定されていないためクラス情報の変更に失敗しました。', { variant: 'error' });
            break;
          case 'lesson_rule_invalid_error':
            enqueueSnackbar('スケジュールの作成に失敗したためクラス情報の変更に失敗しました。', { variant: 'error' });
          default:
            enqueueSnackbar('クラス情報の変更に失敗しました。内容を確かめてください。', { variant: 'error' });
        };
        break;
      default:
        enqueueSnackbar('クラス情報の変更に失敗しました。', { variant: 'error' });
    }
  };

  const updateLessonClassFunc = async () => {
    await updateLessonClass();
    if (updateFunc) updateFunc();
  };

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
      labelText="クラス説明"
      inputType="text"
      value={lessonClass.description}
      confirm
      rowsMin={6}
      rowsMax={6}
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
          submitFunc={async () => {await addLessonClassFunc()}}
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
          submitFunc={async () => {await updateLessonClassFunc()}}
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