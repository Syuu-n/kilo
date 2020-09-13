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
  const accessToken = localStorage.getItem('kiloToken');

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

  const leaveEvent = () => {
    if (selectedEvent) {
      const newEvent:CEvent = {
        title:    selectedEvent.title,
        start:    selectedEvent.start,
        end:      selectedEvent.end,
        lessonId: selectedEvent.lessonId,
        color:    selectedEvent.color,
        joined:   false,
        memo:     selectedEvent.memo,
        users:    selectedEvent.users,
      }
      updateEventFunc(newEvent);
    }
  };

  const handleSubmitJoin = async () => {
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
        switch (json.code) {
          case 'user_already_joined':
            enqueueSnackbar('既に参加済みのレッスンへは参加できません。', { variant: 'error' });
            break;
          case 'user_monthly_limit_error':
            enqueueSnackbar('今月の参加可能数を超えているため参加できませんでした。', { variant: 'error' });
            break;
          default:
            enqueueSnackbar('レッスンへの参加に失敗しました。', { variant: 'error' });
        };
        break;
      default:
        enqueueSnackbar('レッスンへの参加に失敗しました。', { variant: 'error' });
    }
  };

  const handleSubmitLeave = async () => {
    if (!accessToken) {
      return;
    }
    const res = await fetchApp(
      `/v1/lessons/${lessonId}/leave`,
      'DELETE',
      accessToken,
    )
    if (res instanceof NetworkError) {
      console.log('ServerError');
      enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
      return;
    }
    switch (res.status) {
      case 200:
        leaveEvent();
        enqueueSnackbar('レッスンからの辞退が成功しました。', { variant: 'success' });
        break;
      case 400:
        const json = await res.json();
        switch (json.code) {
          case 'user_not_joined':
            enqueueSnackbar('参加していないレッスンから辞退することはできません。', { variant: 'error' });
            break;
          default:
            enqueueSnackbar('レッスンからの辞退に失敗しました。', { variant: 'error' });
        };
        break;
      default:
        enqueueSnackbar('レッスンからの辞退に失敗しました。', { variant: 'error' });
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
      submitText={selectedEvent?.joined ? "辞退" : "参加"}
      submitFunc={selectedEvent?.joined ?
        async () => {await handleSubmitLeave()} :
        async () => {await handleSubmitJoin()}
      }
      closeFunc={() => {closeFunc()}}
    />
  );
};

export default ShowEventModal;