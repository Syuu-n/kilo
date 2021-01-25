import * as React from 'react';
import { Modal, AdminFormInput } from 'components';
import { useSnackbar } from 'notistack';
// import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';
import { LessonClass, Plan } from 'responses/responseStructs';
import { CreatePlanRequest } from 'request/requestStructs';
import { createPlan, updatePlan } from 'request/methods/plans';

interface Props {
  plan: Plan | CreatePlanRequest;
  open: boolean;
  closeFunc: Function;
  cancelFunc?: Function;
  type: "add" | "edit" | "show";
  selectedLessonClasses?: LessonClass[];
  updateFunc?: Function;
  planID?: number;
};

const AdminConfirmPlanModal: React.FC<Props> = (props) => {
  const { plan, open, closeFunc, cancelFunc, type, selectedLessonClasses, updateFunc, planID } = props;
  const { enqueueSnackbar } = useSnackbar();
  const selectedLessonClassNames = selectedLessonClasses?.map((sClass) => sClass.name);
  // const classes = adminModalStyle();

  const content =
  <div>
    <AdminFormInput
      labelText="コース名"
      inputType="text"
      value={plan.name}
      confirm
    />
    <AdminFormInput
      labelText="毎月の料金"
      inputType="text"
      value={plan.price + " 円"}
      confirm
    />
    <AdminFormInput
      labelText="このコースで参加できるクラス"
      inputType="text"
      value={selectedLessonClassNames?.join("、")}
      confirm
    />
  </div>;

  return (
    <div>
      { type === "add" && (
        <Modal
          open={open}
          headerTitle="コース新規作成"
          submitText="確定"
          submitFunc={async () => {await createPlan(plan, enqueueSnackbar, updateFunc)}}
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
          headerTitle="コース情報変更"
          submitText="確定"
          submitFunc={async () => {await updatePlan(plan, enqueueSnackbar, planID, updateFunc)}}
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
          headerTitle="コース情報確認"
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

export default AdminConfirmPlanModal;