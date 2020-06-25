import * as React from 'react';
import { fetchApp, NetworkError } from 'request/fetcher';
import { User } from 'responses/responseStructs';
import { Redirect } from 'react-router-dom';
import { KSpinner } from 'components';
import authStyle from 'assets/jss/kiloStyles/authStyle';

// Context の型
interface IAuthContext {
  currentUser: User | null;
}

// Context の宣言
// null: 未ログインの場合
// JSON: ユーザが存在する場合
const AuthContext = React.createContext<IAuthContext>({ currentUser: null });

const AuthProvider = (props: any) => {
  const classes = authStyle();
  const [currentUser, setCurrentUser] = React.useState<User | null>(
    null
  );
  const [isLoaded, setIsLoaded] = React.useState(false);

  // アクセストークンのチェック
  // localStorage に既に保存されている場合はアクセストークンの有効性を確かめる
  const checkAccessToken = async () => {
    const accessToken = localStorage.getItem('kiloToken');

    if (!accessToken) {
      return null;
    }

    const res = await fetchApp(
      '/v1/me',
      'GET',
      accessToken
    )

    if (res instanceof NetworkError) {
      console.log('ServerError')
      return null;
    }

    if (res.ok) {
      const json = await res.json();
      return json;
    } else {
      return null;
    }
  }

  React.useEffect(() => {
    checkAccessToken().then((result) => {
      setCurrentUser(result);
      setIsLoaded(true);
    });
  }, []);

  // トークンから自身の情報を取得し以下の状態によって分岐させる
  // isLoaded===false : ロード画面を表示
  // isLoaded===true && currentUser===null : ログイン画面を表示（ログイン情報なし）
  // isLoaded===true && currentUser===User : 子要素を表示（ログイン情報あり）

  return (
    <div>
      { isLoaded ? (
        currentUser ? (
          <AuthContext.Provider
            value={{
              currentUser: currentUser
            }}
          >
            {props.children}
          </AuthContext.Provider>
        ) : (
          <Redirect to='/login' />
        )
      ) : (
        <div className={classes.spinnerWrap}>
          <KSpinner/>
        </div>
      )}
    </div>
  );
};

export { AuthContext, AuthProvider };