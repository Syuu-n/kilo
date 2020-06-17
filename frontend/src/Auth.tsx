import * as React from 'react';
import { fetchApp, NetworkError } from 'request/fetcher';

// Context の型
interface IAuthContext {
  currentUser: JSON | null | undefined;
}

// Context の宣言
// undefined: ユーザがまだロードされていない場合
// null: 未ログインの場合
// JSON: ユーザが存在する場合
const AuthContext = React.createContext<IAuthContext>({ currentUser: undefined });

const AuthProvider = (props: any) => {
  const [currentUser, setCurrentUser] = React.useState<JSON | null | undefined>(
    undefined
  );

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
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };