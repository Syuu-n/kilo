import * as React from 'react';
import {
  People,
  PersonAdd,
} from '@material-ui/icons';
import {
  RichTableCard,
  KSpinner,
} from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { User } from 'responses/responseStructs';
import usersViewStyle from 'assets/jss/kiloStyles/usersViewStyle';

const UsersView: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>();
  const classes = usersViewStyle();

  const getUsers = async (): Promise<User[] | null> => {
    const accessToken = localStorage.getItem('kiloToken');
    if (!accessToken) {
      return null;
    }

    const res = await fetchApp(
      '/v1/users',
      'GET',
      accessToken,
    )

    if (res instanceof NetworkError) {
      console.log("ServerError");
      return null;
    }

    if (res.ok) {
      const json = await res.json();
      return json;
    } else {
      return null;
    }
  };

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
          dataType="lesson_classes"
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