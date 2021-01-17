import { Grid } from '@material-ui/core';
import * as React from 'react';
import { confirmTrial } from 'request/methods/trials';
import { ItemGrid, KSpinner, Card, CardContent, Button } from 'components';
import completeRegisterView from 'assets/jss/kiloStyles/completeRegisterViewStyle';
import { Check, ErrorOutline } from '@material-ui/icons';
import history from 'RouterHistory';

const CompleteRegisterView: React.FC = () => {
  const classes = completeRegisterView();
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [submitFailed, setSubmitFailed] = React.useState(true);

  const goToLoginPage = () => {
    // ログインページへ移動
    history.push('/login');
  };

  React.useEffect(() => {
    const f = async () => {
      await confirmTrial(token, setSubmitFailed);
      setIsLoaded(true);
    };
    f();
  }, []);

  return (
    <div className={classes.wrapper}>
      <Grid container className={classes.completeView}>
        <ItemGrid xs={12} sm={8} lg={6}  className={classes.gridItem}>
          <Card className={classes.card}>
            <CardContent>
              { isLoaded ? (
                // 認証の失敗かどうか
                submitFailed ? (
                  <div className={classes.messageContainer}>
                    <div><ErrorOutline className={classes.icon}/></div>
                    <p>すでに登録済みか不明なエラーが発生したため登録に失敗しました。</p>
                  </div>
                ) : (
                  <div className={classes.messageContainer}>
                    <div><Check className={classes.icon}/></div>
                    <p>登録が完了しました。<br/>以下のボタンからログインが可能です。</p>
                    <Button
                      onClick={() => goToLoginPage()}
                      color="primary"
                      customClass={classes.loginButton}
                    >
                      ログイン
                    </Button>
                  </div>
                )
              ) : (
                <div className={classes.spinnerWrap}>
                  <KSpinner/>
                </div>
              )}
            </CardContent>
          </Card>
        </ItemGrid>
      </Grid>
    </div>
  );
};

export default CompleteRegisterView;