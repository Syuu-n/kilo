import * as React from 'react';
import * as moment from 'moment';
import {
  Modal,
  Table,
} from 'components';
import { User, CEvent, Lesson } from 'responses/responseStructs';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';
import { adminModalStyle } from 'assets/jss/kiloStyles/adminModalStyle';

interface Props {
  open: boolean;
  selectedEvent: CEvent;
  closeFunc: Function;
  cancelFunc?: Function
  updateFunc?: Function;
  startAt: moment.Moment | null;
  endAt: moment.Moment | null;
  joinedUsers: User[] | undefined;
}

const AdminConfirmLessonModal: React.FC<Props> = (props) => {
  const { open, selectedEvent,  closeFunc, cancelFunc, updateFunc, startAt, endAt, joinedUsers } = props;
  const { enqueueSnackbar } = useSnackbar();
  const lessonId = selectedEvent?.id;
  const classes = adminModalStyle();

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
    if (updateFunc) {
      updateFunc(newEvent);
    }
  };

  const updateLesson = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return;
    }
    if (!lessonId) {
      return;
    }

    const lesson = {
      start_at: startAt?.toDate(),
      end_at: endAt?.toDate(),
      user_ids: joinedUsers?.map((user) => user.id),
    };

    const res = await fetchApp(
      `/v1/lessons/${lessonId}`,
      'PATCH',
      accessToken,
      JSON.stringify({
        lesson,
      })
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
        enqueueSnackbar('レッスン情報の変更に成功しました。', { variant: 'success' });
        break;
      case 404:
        enqueueSnackbar(`ID:${lessonId}}のレッスンが存在しないため変更に失敗しました。`, { variant: 'error' });
        break;
      case 422:
        enqueueSnackbar('レッスン情報の変更に失敗しました。内容を確かめてください。', { variant: 'error' });
        break;
      default:
        enqueueSnackbar('レッスン情報の変更に失敗しました。', { variant: 'error' });
    }
  };

  return(
    <Modal
      open={open}
      headerTitle="レッスン情報変更"
      color="success"
      content={
        <div>
          <Table
            tableData={[
              ["クラス名", selectedEvent.title],
              ["開始時間", startAt?.format("YYYY年 MM月 DD日 HH時 mm分")],
              ["終了時間", endAt?.format("YYYY年 MM月 DD日 HH時 mm分")],
            ]}
          />
          <p>クラス説明</p>
          <p>{selectedEvent.memo}</p>
          { joinedUsers ? (
            <div>
              <p>参加中のユーザ一</p>
              <ul className={classes.usersContainer}>
                { joinedUsers.length == 0 ? (
                  <li>なし</li>
                ) : (
                  <div>
                    { joinedUsers.map((user:User) => {
                      return <li key={user.id}>{`${user.last_name} ${user.first_name}`}</li>
                    })}
                  </div>
                )}
              </ul>
            </div>
          ) : (null) }
        </div>
      }
      submitText="確定"
      submitFunc={async () => {await updateLesson()}}
      closeFunc={() => {closeFunc()}}
      cancelText="修正"
      cancelFunc={cancelFunc}
    />
  );
};

export default AdminConfirmLessonModal;