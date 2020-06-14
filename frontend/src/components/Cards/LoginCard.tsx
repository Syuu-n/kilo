import {
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  Typography
} from '@material-ui/core';
import {
  Email,
  Lock,
} from '@material-ui/icons';
import * as React from 'react';
import loginCardStyle from 'assets/jss/kiloStyles/loginCardStyle';
import {
  CustomCheckbox,
  CustomInput,
  Button,
  P
} from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple';
  cardTitle?: React.ReactNode;
  cardSubtitle?: React.ReactNode;
}

const LoginCard: React.FC<Props> = ({ headerColor = 'orange', cardTitle, cardSubtitle }) => {
  const classes = loginCardStyle();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const handleLogin = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonDisabled(true);
    console.log('Email:' + email, 'Password:' + password, 'RememberMe:' + rememberMe)
    const res = await fetchApp(
      '/v1/login',
      'POST',
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
        break;
      case 200:
        const json = await res.json();
        localStorage.setItem('kiloToken', json.access_token);
        break;
      default:
        setErrorMessage('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
    }
    setButtonDisabled(false);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root:
            classes.cardHeader +
            ' ' +
            classes[headerColor + 'CardHeader'],
          title: classes.cardTitle,
          subheader: classes.cardSubtitle,
        }}
        title={cardTitle}
        subheader={cardSubtitle}
      />
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
          <div className={classes.rememberMeContainer}>
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
          </div>
          <div className={classes.errorMessageContainer}>
            <P>{errorMessage}</P>
          </div>
          <div className={classes.loginBtnWrap}>
            <Button
              color='primary'
              width='70%'
              type='submit'
              disabled={buttonDisabled}
            >
              ログイン
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginCard;