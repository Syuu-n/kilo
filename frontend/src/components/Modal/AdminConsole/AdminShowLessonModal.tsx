import * as React from 'react';
import * as moment from 'moment';
import {
  Modal,
  Table,
  AdminEditLessonModal,
} from 'components';
import { User, CEvent } from 'responses/responseStructs';
import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';

interface Props {
  open: boolean;
  selectedEvent: CEvent|undefined;
  closeFunc: Function;
  updateEventFunc?: Function;
  users: User[];
}

const AdminShowLessonModal: React.FC<Props> = (props) => {
  const { open, selectedEvent,  closeFunc, users, updateEventFunc } = props;
  const [openEdit, setOpenEdit] = React.useState(false);
  const classes = adminModalStyle();

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
            <div className={classes.descriptionContainer}>
              <p>クラス説明</p>
              <p>{selectedEvent?.memo}</p>
            </div>
            { selectedEvent?.users ? (
              <div>
                <p>参加中のユーザ一</p>
                <ul className={classes.usersContainer}>
                  { selectedEvent.users.length == 0 ? (
                    <li>なし</li>
                  ) : (
                    <div>
                      { selectedEvent.users.map((user:User) => {
                        return <li key={user.id}>{`${user.last_name} ${user.first_name}`}</li>
                      })}
                    </div>
                  )}
                </ul>
              </div>
            ) : (null) }
          </div>
        }
        submitText="変更"
        submitFunc={() => setOpenEdit(true)}
        closeFunc={() => {closeFunc()}}
      />
      { selectedEvent && (
        <AdminEditLessonModal
          open={openEdit}
          closeFunc={() => setOpenEdit(false)}
          openFunc={() => setOpenEdit(true)}
          selectedEvent={selectedEvent}
          users={users}
          updateFunc={updateEventFunc}
        />
      )}
    </div>
  );
};

export default AdminShowLessonModal;