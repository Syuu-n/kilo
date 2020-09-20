import * as React from 'react';
import * as moment from 'moment';
import {
  Modal,
  Table,
  Badge,
} from 'components';
import { User, CEvent, Lesson } from 'responses/responseStructs';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';
import showEventModalStyle from 'assets/jss/kiloStyles/showEventModalStyle';

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
  const lessonId = selectedEvent?.id;
  const accessToken = localStorage.getItem('kiloToken');
  const classes = showEventModalStyle();
  console.log(selectedEvent?.users)

  const updateEvent = (lesson:Lesson) => {
    const newEvent:CEvent = {
      id: lesson.id,
      title: lesson.class_name,
      start: new Date(lesson.start_at),
      end:   new Date(lesson.end_at),
      color: lesson.color,
      joined: lesson.joined,
      memo: lesson.class_memo ? lesson.class_memo : "",
      users: lesson.users ? lesson.users : undefined,
    }
    updateEventFunc(newEvent);
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
    const json = await res.json();
    switch (res.status) {
      case 200:
        updateEvent(json);
        enqueueSnackbar('レッスンへの参加が成功しました。', { variant: 'success' });
        break;
      case 400:
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
    const json = await res.json();
    switch (res.status) {
      case 200:
        updateEvent(json);
        enqueueSnackbar('レッスンへの参加取り消しが成功しました。', { variant: 'success' });
        break;
      case 400:
        switch (json.code) {
          case 'user_not_joined':
            enqueueSnackbar('参加していないレッスンを取り消すことはできません。', { variant: 'error' });
            break;
          default:
            enqueueSnackbar('レッスンへの参加取り消しに失敗しました。', { variant: 'error' });
        };
        break;
      default:
        enqueueSnackbar('レッスンへの参加取り消しに失敗しました。', { variant: 'error' });
    }
  };

  return(
    <Modal
      open={open}
      headerTitle="レッスン詳細"
      content={
        <div>
          { selectedEvent?.joined ? (
              <Badge color="primary">参加中のレッスン</Badge>
          ) : (null)}
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
              <p>参加中のユーザ一</p>
              <ul className={classes.usersContainer}>
                { selectedEvent.users.length == 0 ? (
                  <li>なし</li>
                ) : (
                  <div>
                    { selectedEvent.users.map((user:User) => {
                      return <li key={user.id}>{user.name}</li>
                    })}
                  </div>
                )}
              </ul>
            </div>
          ) : (null) }
        </div>
      }
      submitText={selectedEvent?.joined ? "参加取り消し" : "参加"}
      submitFunc={selectedEvent?.joined ?
        async () => {await handleSubmitLeave()} :
        async () => {await handleSubmitJoin()}
      }
      closeFunc={() => {closeFunc()}}
      // 選択したレッスンが過去の場合はボタンを無効に
      disabled={moment(new Date).isAfter(moment(selectedEvent?.start))}
    />
  );
};

export default ShowEventModal;