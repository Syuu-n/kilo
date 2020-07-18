import * as React from 'react';
import { AuthContext } from 'Auth';
import { 
  MyProfileCard,
  ItemGrid,
} from 'components';
import { AccountCircle } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import * as moment from 'moment';
import { fetchApp, NetworkError } from 'request/fetcher';

const ProfileView: React.SFC = () => {
  const { currentUser } = React.useContext(AuthContext);
  const accessToken = localStorage.getItem('kiloToken');
  const fetchMyPlan = async => {
    const res = await fetchApp(
      `/v1/${currentUser?.id}/plan`,
      'GET',
      accessToken,
    )
    if (res instanceof NetworkError) {
      console.log("Network Error");
      return
    }

    switch(res.status) {
      case 403:
        console.log("Not Permitted");
        break;
      case 200:

    }
  }

  return (
    <div>
      { currentUser ? (
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
        </Grid>
      ) : (
        <p>予期せぬエラーが発生しました。時間をおいて再度お試しください。</p>
      )
      }
    </div>
  );
};

export default ProfileView;