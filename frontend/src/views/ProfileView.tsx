import * as React from 'react';
import { AuthContext } from 'Auth';
import { 
  MyProfileCard,
  LoginSettingCard,
  ItemGrid,
} from 'components';
import {
  AccountCircle,
  LocalAtm,
  LockOutlined,
} from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import * as moment from 'moment';

const ProfileView: React.SFC = () => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <div>
      { currentUser ? (
        <div>
          <Grid container>
            <ItemGrid xs={12} md={6} lg={6}>
              <MyProfileCard
                headerColor="orange"
                cardTitle="マイプロフィール"
                icon={AccountCircle}
                tableData={[
                  ["名前", currentUser.name],
                  ["名前（カナ）", currentUser.name_kana],
                  ["電話番号", currentUser.phone_number],
                  ["メールアドレス", currentUser.email],
                  ["年齢", currentUser.age + " 歳"],
                  ["生年月日", moment(currentUser.birthday).format("LL")],
                ]}
              />
            </ItemGrid>
            <ItemGrid xs={12} md={6} lg={4}>
              <MyProfileCard
                headerColor="orange"
                cardTitle="マイコース"
                icon={LocalAtm}
                tableData={[
                  ["名前", currentUser.plan.name],
                  ["毎月の参加可能数", currentUser.plan.monthly_lesson_count + " 回"],
                  ["種類", `${currentUser.plan.for_children ? "子供" : "大人"}` + "コース"],
                ]}
              />
            </ItemGrid>
          </Grid>
          <Grid container>
            <ItemGrid>
              <LoginSettingCard
                headerColor="orange"
                cardTitle="ログイン設定"
                icon={LockOutlined}
              />
            </ItemGrid>
          </Grid>
        </div>
      ) : (
        <p>予期せぬエラーが発生しました。時間をおいて再度お試しください。</p>
      )
      }
    </div>
  );
};

export default ProfileView;