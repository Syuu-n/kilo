import * as React from 'react';
import { Modal, CustomDropDown, AdminEditLessonModal } from 'components';
import { slotInfo } from 'request/requestStructs';
import { LessonClass, CEvent, User } from 'responses/responseStructs';

interface Props {
  open: boolean;
  closeFunc: Function;
  openFunc: Function;
  slot?: slotInfo;
  users: User[];
  lessonClasses: LessonClass[];
  updateFunc: Function;
}

const AdminAddLessonModal: React.FC<Props> = (props) => {
  const { open, closeFunc, openFunc, slot, users, lessonClasses, updateFunc } = props;
  const [selectedLessonClass, setSelectedLessonClass] = React.useState<LessonClass>({id: 0, name: "クラスを選択"} as LessonClass);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [createdEvent, setCreatedEvent] = React.useState<CEvent>();

  const handleSubmit = () => {
    if (slot) {
      const event = {
        id: -1,
        title: selectedLessonClass.name,
        color: selectedLessonClass.color,
        joined: false,
        memo: selectedLessonClass.description,
        users: [],
        start: slot.start,
        end: slot.end,
        lesson_class_id: selectedLessonClass.id,
      } as CEvent;
      setCreatedEvent(event);
      setOpenEditModal(true);
    } else {
      console.log("Slot not found");
    };
  };

  const doCancel = () => {
    // edit で修正を押したときに edit を閉じてから add を開き直す
    setOpenEditModal(false);
    openFunc();
  };

  const content =
    <div>
      <CustomDropDown
        dropdownList={lessonClasses}
        hoverColor="success"
        buttonText={selectedLessonClass.name}
        onClick={setSelectedLessonClass}
        buttonProps={{color: "success", fullWidth: true}}
        fullWidth
      />
    </div>

  React.useEffect(() => {
    // クラスが選択されていればボタンを有効にする
    if (selectedLessonClass.id != 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true);
    }
  }, [selectedLessonClass]);

  return (
    <div>
      <Modal
        open={open}
        closeFunc={closeFunc}
        color="success"
        headerTitle="レッスン新規作成"
        submitText="次へ"
        submitFunc={() => handleSubmit()}
        content={content}
        disabled={buttonDisabled}
      />
      { createdEvent && (
        <AdminEditLessonModal
          open={openEditModal}
          closeFunc={() => setOpenEditModal(false)}
          openFunc={() => setOpenEditModal(true)}
          users={users}
          updateFunc={updateFunc}
          selectedEvent={createdEvent}
          cancelFunc={() => doCancel()}
          isAddEvent
        />
      )}
    </div>
  );
};

export default AdminAddLessonModal;