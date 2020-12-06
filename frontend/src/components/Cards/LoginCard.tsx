import {
  InputAdornment,
  // TODO: rememberMe を有効にするにはアンコメント
  // Typography
} from '@material-ui/core';
import {
  Email,
  Lock,
} from '@material-ui/icons';
import * as React from 'react';
import loginCardStyle from 'assets/jss/kiloStyles/loginCardStyle';
import {
  // TODO: rememberMe を有効にするにはアンコメント
  // CustomCheckbox,
  Card,
  CardBody,
  CardHeader,
  CustomInput,
  Button,
} from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import history from 'RouterHistory';
import { useSnackbar } from 'notistack';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
  cardSubtitle?: React.ReactNode;
}

const LoginCard: React.FC<Props> = ({ headerColor = 'orange', cardTitle, cardSubtitle }) => {
  const classes = loginCardStyle();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // TODO: rememberMe を有効にするにはアンコメント
  // const [rememberMe, setRememberMe] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [cardAnimation, setCardAnimation] = React.useState("cardHidden");
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonDisabled(true);
    const res = await fetchApp(
      '/v1/login',
      'POST',
      '',
      JSON.stringify({
        email: email,
        password: password
      })
    )
    if (res instanceof NetworkError) {
      setErrorMessage('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
      setButtonDisabled(false);
      return
    }

    switch (res.status) {
      case 400:
        setErrorMessage('入力された情報の組み合わせが正しくありません。');
        setButtonDisabled(false);
        break;
      case 401:
        setErrorMessage('メールアドレスの本人確認が必要です。');
        setButtonDisabled(false);
        break;
      case 200:
        const json = await res.json();
        // TODO: rememberMe を有効にするにはアンコメント
        // if (rememberMe === true) {
        //   localStorage.setItem('kiloToken', json.access_token);
        // } else {
        //   localStorage.removeItem('kiloToken');
        // }
        localStorage.setItem('kiloToken', json.access_token);
        // トップページへ移動
        history.push('/schedule');
        enqueueSnackbar('ログインしました。', { variant: 'info' })
        break;
      default:
        setErrorMessage('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
        setButtonDisabled(false);
    }
  }

  const goToPasswordResetSendPage = () => {
    // パスワードリセット用メールアドレス入力ページへ移動
    history.push('/send_password_reset');
  };

  // カードの表示に動きをつける
  React.useEffect(() => {
    const timer = setTimeout(() => setCardAnimation(""), 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Card className={classes.card + ' ' + classes[cardAnimation]}>
      <CardHeader
        color={headerColor}
      >
        <h4 className={classes.cardTitle}>{cardTitle}</h4>
      </CardHeader>
      <CardBody className={classes.cardContent}>
        <form onSubmit={handleLogin}>
          <CustomInput
            labelText="メールアドレス"
            formControlProps={{
                fullWidth: true,
                className: 'email-input'
            }}
            inputProps={{
              type: 'email',
              endAdornment: (<InputAdornment className={classes.inputIcon} position="start"><Email/></InputAdornment>),
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.currentTarget.value)},
              value: email
            }}
          />
          <CustomInput
            labelText="パスワード"
            formControlProps={{
                fullWidth: true,
                className: 'password-input'
            }}
            inputProps={{
              type: 'password',
              endAdornment: (<InputAdornment className={classes.inputIcon} position="start"><Lock/></InputAdornment>),
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.currentTarget.value)},
              value: password
            }}
          />
          {/* TODO: rememberMe を有効にするにはアンコメント */}
          {/* <div className={classes.rememberMeContainer}>
            <CustomCheckbox
              checked={rememberMe}
              onClick={() => setRememberMe(!rememberMe)}
            />
            <Typography
              component="label"
              className={classes.rememberLabel}
            >
              ログインしたままにする
            </Typography>
          </div> */}
          <div className={classes.errorMessageContainer}>
            <p className={classes.errorMessage}>{errorMessage}</p>
          </div>
          <div className={classes.loginBtnWrap}>
            <Button
              color='primary'
              width='90%'
              type='submit'
              disabled={buttonDisabled}
            >
              ログイン
            </Button>
          </div>
        </form>
        {/* パスワードリセット */}
        <a
          onClick={goToPasswordResetSendPage}
          className={classes.passwordResetButton}
        >
          パスワードを忘れた場合はこちら
          </a>
      </CardBody>
    </Card>
  );
}

export default LoginCard;