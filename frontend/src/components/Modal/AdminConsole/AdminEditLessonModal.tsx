import * as React from 'react';
import { Modal, Table, AdminEventUsersInput, ItemGrid, Button } from 'components';
import { CEvent, User } from 'responses/responseStructs';
import { adminModalStyle, pickerTheme } from 'assets/jss/kiloStyles/adminModalStyle';
import { ThemeProvider, Grid } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as moment from 'moment';

interface Props {
  open: boolean;
  closeFunc: Function;
  // openFunc: Function;
  // updateFunc?: Function;
  selectedEvent: CEvent;
  users: User[];
};

const AdminEditLessonModal: React.FC<Props> = (props) => {
  const { open, closeFunc, selectedEvent, users } = props;
  const [startAt, setStartAt] = React.useState<moment.Moment|null>(moment(selectedEvent.start));
  const [endAt, setEndAt] = React.useState<moment.Moment|null>(moment(selectedEvent.end));
  const [joinedUsers, setJoinedUsers] = React.useState(selectedEvent.users);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const classes = adminModalStyle();

  const handleSubmit = () => {
    console.log('Submit!');
  };

  const addJoinedUser = (user:User) => {
    if (joinedUsers?.some((jUser) => jUser.id == user.id)) {
      return;
    };

    const newJoindUsers = joinedUsers?.filter((ju) => true);
    newJoindUsers?.push(user);
    setJoinedUsers(newJoindUsers);
  };

  const removeJoinedUsers = (user:User) => {
    if (!joinedUsers) return;

    const newJoindUsers = joinedUsers.slice();
    const userIndex = joinedUsers.findIndex((jUser:User) => jUser.id === user.id);
    newJoindUsers.splice(userIndex, 1);

    setJoinedUsers(newJoindUsers);
  };

  const content =
    <div>
      <ThemeProvider theme={pickerTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Table
            tableData={[
              [
                "クラス名",
                selectedEvent.title,
              ],
              [
                "開始時間",
                <DateTimePicker
                  showTodayButton
                  todayLabel="現在時刻"
                  okLabel="決定"
                  cancelLabel="キャンセル"
                  value={startAt}
                  format="YYYY年 MM月 DD日 HH時 mm分"
                  onChange={setStartAt}
                  ampm={false}
                  className={classes.pickerCell}
                />
              ],
              [
                "終了時間",
                <DateTimePicker
                  showTodayButton
                  todayLabel="現在時刻"
                  okLabel="決定"
                  cancelLabel="キャンセル"
                  value={endAt}
                  format="YYYY年 MM月 DD日 HH時 mm分"
                  onChange={setEndAt}
                  ampm={false}
                  className={classes.pickerCell}
                />
              ],
            ]}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
      <p>クラス説明</p>
      <p>{selectedEvent.memo}</p>
      { joinedUsers ? (
        <Grid container>
          <ItemGrid xs={12} sm={6}>
            <p>参加中のユーザ一</p>
            <ul className={classes.usersContainer}>
              { joinedUsers.length == 0 ? (
                <li>なし</li>
              ) : (
                <div>
                  { joinedUsers.map((user:User) => {
                    return (
                      <li  key={user.id} className={classes.user}>
                        <p className={classes.userName}>{`${user.last_name} ${user.first_name}`}</p>
                        <Button
                          color="danger"
                          round
                          customClass={classes.userSelectButton}
                          onClick={() => removeJoinedUsers(user)}
                        >
                          削除
                        </Button>
                      </li>
                    )
                  })}
                </div>
              )}
            </ul>
          </ItemGrid>
          <ItemGrid xs={12} sm={6}>
            <p>ユーザ一の追加</p>
            <AdminEventUsersInput
              joinedUsers={joinedUsers}
              users={users}
              addUserFunc={(user:User) => addJoinedUser(user)}
            />
          </ItemGrid>
        </Grid>
      ) : (null) }
    </div>

  // selectedEvent が変更された際に state を更新する
  React.useEffect(() => {
    if (selectedEvent) {
      setStartAt(moment(selectedEvent.start));
      setEndAt(moment(selectedEvent.end));
      setJoinedUsers(selectedEvent.users);
    };
  }, [selectedEvent]);

  React.useEffect(() => {
    // 全てのバリデーションが正しければボタンを有効にする
    if (startAt?.isBefore(endAt)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [startAt, endAt])

  return (
    <div>
      <Modal
        open={open}
        headerTitle="レッスン情報変更"
        submitText="確定"
        submitFunc={async () => {await handleSubmit()}}
        content={content}
        closeFunc={closeFunc}
        color="success"
        disabled={buttonDisabled}
      />
    </div>
  );
};

export default AdminEditLessonModal;