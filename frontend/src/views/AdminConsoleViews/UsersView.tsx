import * as React from 'react';
import {
  People,
  PersonAdd,
} from '@material-ui/icons';
import {
  RichTableCard,
  KSpinner,
} from 'components';
import { getUsers } from 'request/methods/users';
import { User } from 'responses/responseStructs';
import usersViewStyle from 'assets/jss/kiloStyles/usersViewStyle';

const UsersView: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>();
  const classes = usersViewStyle();

  const usersUpdateFunc = async () => {
    const users = await getUsers();
    if (users) setUsers(users);
  };

  React.useEffect(() => {
    usersUpdateFunc();
  }, []);

  return(
    <div>
      { users ? (
        <RichTableCard
          icon={People}
          addIcon={PersonAdd}
          headerColor="green"
          tableHeaderColor="success"
          cardTitle="ユーザー"
          tableHead={["ID", "名前", "名前（カナ）", "メールアドレス", "ステータス"]}
          tableSources={users}
          updateFunc={usersUpdateFunc}
          dataType="users"
        >
        </RichTableCard>
      ) : (
        <div className={classes.spinnerWrap}>
          <KSpinner color="success"/>
        </div>
      )}
    </div>

  );
};

export default UsersView;