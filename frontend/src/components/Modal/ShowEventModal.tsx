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
import { fetchCurrentUser, AuthContext } from 'Auth';

interface Props {
  open: boolean;
  selectedEvent: CEvent|undefined;
  isAdmin: boolean;
  closeFunc: Function;
  updateEventFunc: Function;
}

const ShowEventModal: React.FC<Props> = (props) => {
  const { open, selectedEvent, isAdmin, closeFunc, updateEventFunc } = props;
  const { enqueueSnackbar } = useSnackbar();
  const lessonId = selectedEvent?.id;
  const accessToken = localStorage.getItem('kiloToken');
  const classes = showEventModalStyle();
  const ctx = React.useContext(AuthContext);

  const updateEvent = (lesson:Lesson) => {
    const newEvent:CEvent = {
      id: lesson.id,
      title: lesson.name,
      start: new Date(lesson.start_at),
      end:   new Date(lesson.end_at),
      color: lesson.color,
      joined: lesson.joined,
      description: lesson.description ? lesson.description : "",
      users: lesson.users ? lesson.users : undefined,
      location: lesson.location,
    }
    updateEventFunc(newEvent);
  };

  const isButtonDisable = () => {
    // 現在のユーザが存在しない場合
    if (!ctx.currentUser) {
      return true;
    }
    // 過去のイベントに対してのアクションの場合
    if (moment(new Date).isAfter(moment(selectedEvent?.start))) {
      return true;
    }
    // 今月の残り参加可能数が 0 の場合に参加しようとした場合
    if (ctx.currentUser.remaining_monthly_count < 1 && !selectedEvent?.joined) {
      return  true;
    }
    return false;
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
        await fetchCurrentUser(ctx);
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
        await fetchCurrentUser(ctx);
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
              ["開催場所", selectedEvent?.location],
              ["開始時間", moment(selectedEvent?.start).format("YYYY年 MM月 DD日 H時 m分")],
              ["終了時間", moment(selectedEvent?.end).format("YYYY年 MM月 DD日 H時 m分")],
            ]}
          />
          <div className={classes.descriptionContainer}>
            <p>クラス説明</p>
            <p>{selectedEvent?.description}</p>
          </div>
          { isAdmin && selectedEvent?.users ? (
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
      submitText={selectedEvent?.joined ? "参加取り消し" : "参加"}
      submitFunc={selectedEvent?.joined ?
        async () => {await handleSubmitLeave()} :
        async () => {await handleSubmitJoin()}
      }
      closeFunc={() => {closeFunc()}}
      // 選択したレッスンが過去の場合はボタンを無効に
      disabled={isButtonDisable()}
    />
  );
};

export default ShowEventModal;