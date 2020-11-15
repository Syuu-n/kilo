import * as React from 'react';
import { User } from 'responses/responseStructs';
import { Input, ClickAwayListener } from '@material-ui/core';
import { Button } from 'components';
import adminEventUsersInputStyle from 'assets/jss/kiloStyles/adminEventUsersInputStyle';

interface Props {
  joinedUsers: User[];
  users: User[];
  addUserFunc: Function;
  selectedEventUsers: User[] | undefined;
}

const AdminEventUsersInput: React.FC<Props> = (props) => {
  const { users, joinedUsers, addUserFunc, selectedEventUsers } = props;
  const classes = adminEventUsersInputStyle();
  const [keyword, setKeyword] = React.useState("");
  const [searchResultUsers, setSearchResultUsers] = React.useState<User[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleSearch = (keyword:string) => {
    if (keyword == "") {
      setSearchResultUsers([]);
    } else {
      // (名字 or 名前に keyword が含まれる) && イベントへ参加済みではない
      const hits = users.filter((user) => {
        if ((
            user.first_name.indexOf(keyword) >= 0 ||
            user.last_name.indexOf(keyword) >= 0
            ) && !joinedUsers.find((u) => u.id == user.id)
          ) return user;
        return;
      });
      setSearchResultUsers(hits);
    };
    setOpen(true);
  };

  const addUser = (user:User) => {
    // 検索結果から削除してからユーザを追加する
    const newJoindUsers = searchResultUsers.slice();
    const userIndex = searchResultUsers.findIndex((jUser:User) => jUser.id === user.id);
    newJoindUsers.splice(userIndex, 1);
    setSearchResultUsers(newJoindUsers);

    addUserFunc(user);
  };

  // イベントにユーザが参加済みかどうか
  const checkAlreadyJoinedUser = (user:User) => {
    if (!selectedEventUsers) return false;
    if (selectedEventUsers.find((u) => u.id == user.id)) return true;
    return false;
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={classes.searchContainer}>
        <div className={classes.flexContainer}>
          <Input
            className={classes.underline}
            placeholder="名前を入力"
            inputProps={{
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {setKeyword(event.currentTarget.value)},
              onKeyDown: () => {handleSearch(keyword)},
            }}
          />
          <Button
            color="success"
            round
            customClass={classes.searchButton}
            onClick={() => handleSearch(keyword)}
          >
            検索
          </Button>
        </div>
        <div className={classes.usersContainerWrap} style={{ display: open ? '' : 'none' }}>
          {searchResultUsers.length > 0 ? (
            <ul className={classes.usersContainer}>
              { searchResultUsers.map((user:User) => {
                return (
                  <li  key={user.id} className={classes.user}>
                    <p className={classes.userName}>
                      {`${user.last_name} ${user.first_name}`}
                    </p>
                    { user.remaining_monthly_count ==  && !checkAlreadyJoinedUser(user) ? (
                      <p className={classes.userRemainingCount}>参加不可</p>
                    ) : (
                      <Button
                        color="success"
                        round
                        customClass={classes.userSelectButton}
                        onClick={() => addUser(user)}
                      >
                        追加
                      </Button>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <ul className={classes.usersContainer}>
              <li>該当なし</li>
            </ul>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default AdminEventUsersInput;