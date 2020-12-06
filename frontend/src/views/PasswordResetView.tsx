import * as React from 'react';
import { ItemGrid, Card, CardContent, CardHeader, FormInput, Button } from 'components';
import { Grid } from '@material-ui/core';
import passwordResetViewStyle from 'assets/jss/kiloStyles/passwordResetViewStyle';
import { passwordValidation, ValidationReturn } from 'assets/lib/validations';
import { fetchApp, NetworkError } from 'request/fetcher';
import { Check } from '@material-ui/icons';
import history from 'RouterHistory';

const PasswordResetView: React.FC = () => {
  const classes = passwordResetViewStyle();
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const [newPassword, setNewPassword] = React.useState<ValidationReturn>({value: '', error: ''});
  const [passwordConfirm, setPasswordConfirm] = React.useState<ValidationReturn>({value: '', error: ''});
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [openCompletePage, setOpenCompletePage] = React.useState(false);

  const goToLoginPage = () => {
    // ログインページへ移動
    history.push('/login');
  };

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      setErrorMessage('既にパスワードが変更されているため無効な操作です。');
      return
    }
    if (newPassword.value != passwordConfirm.value) {
      const confirm = passwordConfirm;
      setPasswordConfirm({value: confirm.value, error: "パスワードが一致しません。"});
      return
    }

    setButtonDisabled(true);
    
    const res = await fetchApp(
      '/v1/passwords',
      'PUT',
      '',
      JSON.stringify({
        user: {
          password: newPassword.value,
          password_confirmation: passwordConfirm.value,
          reset_password_token: token
        }
      })
    )
    if (res instanceof NetworkError) {
      setErrorMessage('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
      setButtonDisabled(false);
      return
    }

    const json = await res.json();
    switch (res.status) {
      case 200:
        setOpenCompletePage(true);
        break
      case 400:
        switch (json.code) {
          case 'reset_password_token_expired_error':
            setErrorMessage('既にパスワードが変更されているため無効な操作です。');
            setButtonDisabled(false);
            break
          case 'password_reset_error':
            setErrorMessage('パスワードの変更に失敗しました。');
            setButtonDisabled(false);
            break
          default:
            setErrorMessage('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
            setButtonDisabled(false);
        }
        break
      case 422:
        setErrorMessage('パスワードが一致しません。');
        setButtonDisabled(false);
        break
      default:
        setErrorMessage('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
        setButtonDisabled(false);
        break
    }
  };

  return (
    <div className={classes.wrapper}>
      <Grid container className={classes.resetView}>
        <ItemGrid xs={12} sm={8} lg={6} className={classes.gridItem}>
          <Card className={classes.card}>
            <CardHeader>
              <h4 className={classes.title}>パスワードの変更</h4>
            </CardHeader>
            <CardContent>
              <div style={{ display: openCompletePage ? 'none' : '' }}>
                <p>以下の項目を入力後「変更」ボタンをクリックしてください。</p>
                <form onSubmit={handleSubmit}>
                  <FormInput
                    labelText="新しいパスワード"
                    inputType="text"
                    onChangeFunc={(value: string) => {setNewPassword({value: value, error: passwordValidation(value)})}}
                    value={newPassword.value}
                    required
                    errorText={newPassword.error}
                  />
                  <FormInput
                    labelText="パスワードの確認（再入力）"
                    inputType="text"
                    onChangeFunc={(value: string) => {setPasswordConfirm({value: value, error: passwordValidation(value)})}}
                    value={passwordConfirm.value}
                    required
                    errorText={passwordConfirm.error}
                  />
                  <div className={classes.errorMessageContainer}>
                    <p className={classes.errorMessage}>{errorMessage}</p>
                  </div>
                  <div className={classes.buttonWrap}>
                    <Button
                      color="primary"
                      type="submit"
                      width="70%"
                      disabled={buttonDisabled}
                    >
                      変更
                    </Button>
                  </div>
                </form>
              </div>
              <div style={{ display: openCompletePage ? '' : 'none' }}>
                <div className={classes.messageContainer}>
                  <div><Check className={classes.icon}/></div>
                  <p>パスワードの変更が完了しました。<br/>以下のボタンからログインが可能です。</p>
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

export default PasswordResetView;