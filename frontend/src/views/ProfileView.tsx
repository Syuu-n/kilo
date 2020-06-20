import * as React from 'react';
import { AuthContext } from 'Auth';

const ProfileView: React.SFC = () => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <div>
      <h2>プロフィール</h2>
      { currentUser ? (
        <div>
          <p>{currentUser.name}</p>
          <p>{currentUser.name_kana}</p>
          <p>{currentUser.email}</p>
        </div>
      ) : (
        <p>ユーザ情報なし</p>
      )
    }
    </div>
  );
};

export default ProfileView;