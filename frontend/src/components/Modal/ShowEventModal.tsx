import * as React from 'react';
import * as moment from 'moment';
import {
  Modal,
  Table,
} from 'components';
import { User, CEvent } from 'responses/responseStructs';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';

interface Props {
  open: boolean;
  selectedEvent: CEvent|undefined;
  isAdmin: boolean;
  closeFunc: Function;
  updateEventFunc: Function;
}

const ShowEventModal: React.SFC<Props> = (props) => {
  const { open, selectedEvent, isAdmin, closeFunc, updateEventFunc } = props;
  const { enqueueSnackbar } = useSnackbar();
  const lessonId = selectedEvent?.lessonId;

  const joinEvent = () => {
    if (selectedEvent) {
      const newEvent:CEvent = {
        title:    selectedEvent.title,
        start:    selectedEvent.start,
        end:      selectedEvent.end,
        lessonId: selectedEvent.lessonId,
        color:    selectedEvent.color,
        joined:   true,
        memo:     selectedEvent.memo,
        users:    selectedEvent.users,
      }
      updateEventFunc(newEvent);
    }
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('kiloToken');

    if (!accessToken) {
      return;
    }
    const res = await fetchApp(
      `/v1/lessons/${lessonId}/join`,
      'POST',
      accessToken,
    )
    if (res instanceof NetworkError) {
      console.log('ServerError');
      enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
      return;
    }
    switch (res.status) {
      case 200:
        joinEvent();
        enqueueSnackbar('レッスンへの参加が成功しました。', { variant: 'success' });
        break;
      case 400:
        const json = await res.json();
        if (json.code == 'user_already_joined') {
          enqueueSnackbar('既に参加済みのレッスンのため参加できませんでした。', { variant: 'error' });
        } else {
          enqueueSnackbar('レッスンへの参加に失敗しました。', { variant: 'error' });
        };
        break;
      default:
        enqueueSnackbar('レッスンへの参加に失敗しました。', { variant: 'error' });
    }
  };

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
      submitFunc={async () => {await handleSubmit()}}
      closeFunc={() => {closeFunc()}}
      disabled={selectedEvent?.joined}
    />
  );
};

export default ShowEventModal;