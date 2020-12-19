import * as React from 'react';
import { Modal, Table, AdminEventUsersInput, ItemGrid, Button, AdminConfirmLessonModal, AdminFormInput, CustomDropDown } from 'components';
import { CEvent, User } from 'responses/responseStructs';
import { adminModalStyle, pickerTheme } from 'assets/jss/kiloStyles/adminModalStyle';
import { ThemeProvider, Grid } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as moment from 'moment';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';
import { ValidationReturn, requireValidation } from 'assets/lib/validations';
import { LessonColor, lessonColorSets, colorCheck } from 'assets/lib/lessonColors';

interface Props {
  open: boolean;
  openFunc: Function;
  closeFunc: Function;
  selectedEvent: CEvent;
  users: User[];
  updateFunc?: Function;
  isAddEvent?: boolean;
  cancelFunc?: Function;
};

interface CustomDropDownColor {
  value: LessonColor;
  display_name: string;
  error: string | undefined;
};

const AdminEditLessonModal: React.FC<Props> = (props) => {
  const { open, openFunc, closeFunc, selectedEvent, users, updateFunc, isAddEvent, cancelFunc } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [startAt, setStartAt] = React.useState<moment.Moment|null>(moment(selectedEvent?.start));
  const [endAt, setEndAt] = React.useState<moment.Moment|null>(moment(selectedEvent?.end));
  const [joinedUsers, setJoinedUsers] = React.useState(selectedEvent?.users);
  const [name, setName] = React.useState<ValidationReturn>({value: selectedEvent?.title, error: undefined})
  const [description, setDescription] = React.useState<ValidationReturn>({value: selectedEvent?.description, error: undefined})
  const [location, setLocation] = React.useState<ValidationReturn>({value: selectedEvent?.location, error: undefined})
  const [color, setColor] = React.useState({value: selectedEvent?.color, display_name: colorCheck(selectedEvent?.color).colorName, error: undefined} as CustomDropDownColor);
  const lessonId = selectedEvent.id;
  const classes = adminModalStyle();

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

  const doCancel = () => {
    // confirm で修正を押したときに Confirm を閉じてから Edit を開き直す
    setOpenConfirm(false);
    openFunc();
  };

  const deleteLesson = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return;
    }
    if (!lessonId) {
      return;
    }

    const res = await fetchApp(
      `/v1/lessons/${lessonId}`,
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
        if (updateFunc) updateFunc([selectedEvent], "delete");
        enqueueSnackbar('レッスンの削除に成功しました。', { variant: 'success' });
        break;
      case 404:
        enqueueSnackbar(`ID:${lessonId}のレッスンが存在しないため削除に失敗しました。`, { variant: 'error' });
        break;
      default:
        enqueueSnackbar('レッスンの削除に失敗しました。', { variant: 'error' });
    }
  };

  const deleteLessonFunc = () => {
    if (confirm(`選択中のレッスン ID:${lessonId}）を本当に削除しますか？`)) {
      deleteLesson();
      closeFunc();
    };
  };

  // レッスンカラー用の div を追加する
  const lessonColorDiv = (color: LessonColor) => {
    const colorCode = colorCheck(color).colorCode;
    const style = {
      backgroundColor: colorCode,
      borderRadius: '3px',
      height: '41px',
      width: '100px',
      margin: 'auto 0px auto 10px'
    }

    return (
      <div style={style} />
    );
  };

  const content =
    <div>
      {/* レッスン編集の時のみ削除ボタンを追加する */}
      { isAddEvent == undefined && (
        <Button
          color="danger"
          className={classes.deleteButton}
          onClick={() => deleteLessonFunc()}
        >
          レッスンを削除
        </Button>
      )}
      <ThemeProvider theme={pickerTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Table
            tableData={[
              [
                "クラス名",
                <AdminFormInput
                  labelText="クラス名"
                  inputType="text"
                  onChangeFunc={(value:string) => {setName({value: value, error: requireValidation(value)})}}
                  value={name.value}
                  required
                  errorText={name.error}
                  formControlProps={{className: classes.locationForm}}
                />
              ],
              [
                "開催場所",
                <AdminFormInput
                  labelText="開催場所"
                  inputType="text"
                  onChangeFunc={(value:string) => {setLocation({value: value, error: requireValidation(value)})}}
                  value={location.value}
                  required
                  errorText={location.error}
                  formControlProps={{className: classes.locationForm}}
                />
              ],
              [
                "開始時間",
                <DateTimePicker
                  showTodayButton
                  todayLabel="現在時刻"
                  okLabel="決定"
                  cancelLabel="キャンセル"
                  value={startAt}
                  format="YYYY年 MM月 DD日 H時 m分"
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
                  format="YYYY年 MM月 DD日 H時 m分"
                  onChange={setEndAt}
                  ampm={false}
                  className={classes.pickerCell}
                />
              ],
              [
                "レッスンカラー",
                <div className={classes.flexContainer}>
                <CustomDropDown
                  dropdownList={lessonColorSets}
                  hoverColor="success"
                  buttonText={color.display_name}
                  onClick={(value:any) => setColor({value: value.name, display_name: value.display_name, error: undefined})}
                  buttonProps={{color: "success", fullWidth: true}}
                  fullWidth
                />
                {lessonColorDiv(color.value)}
              </div>
              ],
            ]}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
      <div className={classes.descriptionContainer}>
        <p>クラス説明</p>
        <AdminFormInput
          labelText="クラス説明"
          inputType="text"
          onChangeFunc={(value:string) => {setDescription({value: value, error: undefined})}}
          value={description.value}
          errorText={description.error}
          formControlProps={{className: classes.locationForm}}
          rowsMin={6}
          rowsMax={6}
        />
      </div>
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
                        <p className={classes.userName}>
                          {`${user.last_name} ${user.first_name}`}
                        </p>
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
              selectedEventUsers={selectedEvent.users}
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
      setLocation({value: selectedEvent.location, error: undefined});
      setName({value: selectedEvent.title, error: undefined});
      setDescription({value: selectedEvent.description, error: undefined});
      setColor({value: selectedEvent.color, display_name: colorCheck(selectedEvent.color).colorName, error: undefined} as CustomDropDownColor);
    };
  }, [selectedEvent]);

  React.useEffect(() => {
    // 開始時刻が終了時刻よりも前かつ開催場所のエラーがない場合にボタンを有効化
    if (
      startAt?.isBefore(endAt) &&
      location.error == undefined && 
      name.error == undefined &&
      description.error == undefined
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [startAt, endAt, location])

  return (
    <div>
      <Modal
        open={open}
        headerTitle={ isAddEvent ? "レッスン新規作成" : "レッスン情報変更"}
        submitText="確認"
        submitFunc={() => setOpenConfirm(true)}
        content={content}
        closeFunc={closeFunc}
        color="success"
        disabled={buttonDisabled}
        cancelText={isAddEvent ? "修正" : "キャンセル"}
        cancelFunc={isAddEvent ? cancelFunc : closeFunc}
      />
      <AdminConfirmLessonModal
        open={openConfirm}
        selectedEvent={selectedEvent}
        updateFunc={updateFunc}
        closeFunc={() => setOpenConfirm(false)}
        cancelFunc={() => doCancel()}
        startAt={startAt}
        endAt={endAt}
        joinedUsers={joinedUsers}
        location={location.value}
        name={name.value}
        description={description.value}
        color={color.value}
        isAddEvent={isAddEvent}
      />
    </div>
  );
};

export default AdminEditLessonModal;