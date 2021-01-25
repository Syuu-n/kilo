import * as React from 'react';
import { getMe } from 'request/methods/sessions';
import { User } from 'responses/responseStructs';
import { Redirect } from 'react-router-dom';
import { KSpinner } from 'components';
import authStyle from 'assets/jss/kiloStyles/authStyle';

// Context の型
export interface IAuthContext {
  currentUser: User | null;
  setUser: (user:User) => void;
}

// Context の宣言
// null: 未ログインの場合
// JSON: ユーザが存在する場合
const AuthContext = React.createContext<IAuthContext>({ currentUser: null, setUser: () => {} });

const AuthProvider = (props: any) => {
  const classes = authStyle();
  const [isLoaded, setIsLoaded] = React.useState(false);

  const useCurrentUser = (): IAuthContext => {
    const [currentUser, setCurrentUser] = React.useState<User | null>(null);
    const setUser = React.useCallback((current: User): void => {
      setCurrentUser(current);
    }, []);
    return {
      currentUser,
      setUser,
    };
  };
  const ctx = useCurrentUser();

  React.useEffect(() => {
    const f = async () => {
      const getMeFunc = async () => {
        ctx.setUser(await getMe());
      };

      await getMeFunc();
      setIsLoaded(true);
    };
    f();
  }, []);

  // トークンから自身の情報を取得し以下の状態によって分岐させる
  // isLoaded===false : ロード画面を表示
  // isLoaded===true && currentUser===null : ログイン画面を表示（ログイン情報なし）
  // isLoaded===true && currentUser===User : 子要素を表示（ログイン情報あり）

  return (
    <div>
      { isLoaded ? (
        ctx.currentUser ? (
          <AuthContext.Provider
            value={ctx}
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

// currentUser の再取得
const fetchCurrentUser = async (ctx:IAuthContext) => {
  const result = await getMe();
  ctx.setUser(result);
}

export { AuthContext, AuthProvider, fetchCurrentUser };