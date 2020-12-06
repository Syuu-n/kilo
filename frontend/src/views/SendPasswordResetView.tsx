import * as React from 'react';
import { ItemGrid, Card, CardContent, CardHeader, FormInput, Button } from 'components';
import { Grid } from '@material-ui/core';
import sendPasswordResetViewStyle from 'assets/jss/kiloStyles/sendPasswordResetViewStyle';
import { ValidationReturn, emailValidation } from 'assets/lib/validations';
import { MailOutline } from '@material-ui/icons';
import history from 'RouterHistory';
import { fetchApp } from 'request/fetcher';

const SendPasswordResetView: React.FC = () => {
  const classes = sendPasswordResetViewStyle();
  const [email, setEmail] = React.useState<ValidationReturn>({value: '', error: ''});
  const [openCompletePage, setOpenCompletePage] = React.useState(false);

  const goToLoginPage = () => {
    // ログインページへ移動
    history.push('/login');
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // NOTE: メール送信はセキュリティの都合で失敗しても通知しない
    fetchApp(
      '/v1/passwords',
      'POST',
      '',
      JSON.stringify({
        user: {
          email: email.value,
        },
      })
    )
    setOpenCompletePage(true);
  };

  return (
    <div className={classes.wrapper}>
      <Grid container className={classes.resetView}>
        <ItemGrid xs={12} sm={8} lg={6} className={classes.gridItem}>
          <Card className={classes.card}>
            <CardHeader>
              <h4 className={classes.title}>パスワードの再設定</h4>
            </CardHeader>
            <CardContent>
              <div style={{ display: openCompletePage ? 'none' : '' }}>
                <p>以下の項目を入力後「送信」ボタンをクリックしてください。</p>
                <form onSubmit={handleSubmit}>
                  <FormInput
                    labelText="パスワードの再設定を送信するメールアドレス"
                    inputType="email"
                    onChangeFunc={(value: string) => {setEmail({value: value, error: emailValidation(value)})}}
                    value={email.value}
                    required
                    errorText={email.error}
                  />
                  <div className={classes.buttonWrap}>
                    <Button
                      color="primary"
                      type="submit"
                      width="70%"
                    >
                      送信
                    </Button>
                  </div>
                </form>
              </div>
              <div style={{ display: openCompletePage ? '' : 'none' }}>
                <div className={classes.messageContainer}>
                  <div><MailOutline className={classes.icon}/></div>
                  <p>入力頂いたメールアドレスにパスワード再設定用のメールを送信しました。<br/>再設定後に新しいパスワードでログインが可能です。</p>
                  <Button
                    onClick={() => goToLoginPage()}
                    color="primary"
                    width="70%"
                  >
                    ログイン
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </ItemGrid>
      </Grid>
    </div>
  );
};

export default SendPasswordResetView;