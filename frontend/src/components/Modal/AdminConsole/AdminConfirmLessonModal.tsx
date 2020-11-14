import * as React from 'react';
import * as moment from 'moment';
import {
  Modal,
  Table,
  AdminEditLessonModal,
} from 'components';
import { User, CEvent } from 'responses/responseStructs';
// import { fetchApp, NetworkError } from 'request/fetcher';
// import { useSnackbar } from 'notistack';
import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';

interface Props {
  open: boolean;
  selectedEvent: CEvent|undefined;
  closeFunc: Function;
  updateEventFunc: Function;
  users: User[];
}

const AdminConfirmLessonModal: React.FC<Props> = (props) => {
  const { open, selectedEvent, closeFunc, users } = props;
  const [openEdit, setOpenEdit] = React.useState(false);
  // const { enqueueSnackbar } = useSnackbar();
  // const lessonId = selectedEvent?.id;
  // const accessToken = localStorage.getItem('kiloToken');
  const classes = adminModalStyle();

  // const updateEvent = (lesson:Lesson) => {
  //   const newEvent:CEvent = {
  //     id: lesson.id,
  //     title: lesson.class_name,
  //     start: new Date(lesson.start_at),
  //     end:   new Date(lesson.end_at),
  //     color: lesson.color,
  //     joined: lesson.joined,
  //     memo: lesson.class_memo ? lesson.class_memo : "",
  //     users: lesson.users ? lesson.users : undefined,
  //   }
  //   updateEventFunc(newEvent);
  // };

  const handleSubmit = () => {
    setOpenEdit(true);
  };

  return(
    <div>
      <Modal
        open={open}
        headerTitle="レッスン情報確認"
        color="success"
        content={
          <div>
            <Table
              tableData={[
                ["クラス名", selectedEvent?.title],
                ["開始時間", moment(selectedEvent?.start).format("YYYY年 MM月 DD日 HH時 mm分")],
                ["終了時間", moment(selectedEvent?.end).format("YYYY年 MM月 DD日 HH時 mm分")],
              ]}
            />
            <p>クラス説明</p>
            <p>{selectedEvent?.memo}</p>
            { selectedEvent?.users ? (
              <div>
                <p>参加中のユーザ一</p>
                <ul className={classes.usersContainer}>
                  { selectedEvent.users.length == 0 ? (
                    <li>なし</li>
                  ) : (
                    <div>
                      { selectedEvent.users.map((user:User) => {
                        return <li key={user.id}>{user.last_name + " " + user.first_name}</li>
                      })}
                    </div>
                  )}
                </ul>
              </div>
            ) : (null) }
          </div>
        }
        submitText={"変更"}
        submitFunc={async () => {await handleSubmit()}}
        closeFunc={() => {closeFunc()}}
      />
      { selectedEvent && (
        <AdminEditLessonModal
          open={openEdit}
          closeFunc={() => setOpenEdit(false)}
          selectedEvent={selectedEvent}
          users={users}
        />
      )}
    </div>
  );
};

export default AdminConfirmLessonModal;