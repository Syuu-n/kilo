import * as React from 'react';
// import { Event } from 'react-big-calendar';
import * as moment from 'moment';
import {
  Modal,
  Table,
} from 'components';
import { User } from 'responses/responseStructs';

interface Props {
  open: boolean;
  selectedEvent: any;
  isAdmin: boolean;
  closeFunc: Function;
}

const ShowEventModal: React.FC<Props> = (props) => {
  const { open, selectedEvent, isAdmin, closeFunc } = props;

  return(
    <Modal
      open={open}
      headerTitle="レッスン詳細"
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
          { isAdmin && selectedEvent?.users ? (
            <div>
              <p>ユーザ一覧</p>
              <ul>
                { selectedEvent.users.map((user:User) => {
                  return <li key={user.id}>{user.name}</li>
                })}
              </ul>
            </div>
          ) : (null) }
        </div>
      }
      submitText="参加"
      submitFunc={() => {console.log(isAdmin)}}
      closeFunc={() => {closeFunc()}}
    />
  );
};

export default ShowEventModal;