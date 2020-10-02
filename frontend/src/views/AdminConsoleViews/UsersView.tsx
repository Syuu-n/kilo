import * as React from 'react';
import {
  People,
} from '@material-ui/icons';
import {
  RichTableCard,
  KSpinner,
} from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { User } from 'responses/responseStructs';
import usersViewStyle from 'assets/jss/kiloStyles/usersViewStyle';

const UsersView: React.FC = () => {
  const [users, setUsers] = React.useState<User[] | null>();
  const classes = usersViewStyle();

  const getUsers = async () => {
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
  }

  const translateRoleName = (role:string) => {
    let roleName = "";
    switch (role) {
      case "admin":
        roleName = "管理者";
        break;
      case "normal":
        roleName = "会員";
        break;
      case "trial":
        roleName = "体験";
        break;
    }
    return roleName;
  }

  React.useEffect(() => {
    const f = async () => {
      setUsers(await getUsers());
    };
    f();
  }, []);

  return(
    <div>
      { users ? (
        <RichTableCard
          icon={People}
          headerColor="green"
          tableHeaderColor="success"
          cardTitle="ユーザー"
          tableHead={["名前", "名前（カナ）", "年齢", "メールアドレス", "ステータス"]}
          tableData={
            users.map((user) => {
              return [user.name, user.name_kana, user.age, user.email, translateRoleName(user.role)]
            })
          }
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