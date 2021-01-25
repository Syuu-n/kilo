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
  CardContent,
  CardHeader,
  CustomInput,
  Button,
} from 'components';
import { login } from 'request/methods/sessions';
import history from 'RouterHistory';
import { useSnackbar } from 'notistack';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';
  cardTitle?: React.ReactNode;
}

const LoginCard: React.FC<Props> = ({ headerColor = 'orange', cardTitle }) => {
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
    await login(email, password, setErrorMessage, setButtonDisabled, enqueueSnackbar);
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
      <CardContent className={classes.cardContent}>
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
      </CardContent>
    </Card>
  );
}

export default LoginCard;