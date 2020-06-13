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
  Button
} from 'components';

interface Props {
  headerColor?: 'orange' | 'green' | 'red' | 'blue' | 'purple';
  cardTitle?: React.ReactNode;
  cardSubtitle?: React.ReactNode;
}

const LoginCard: React.FC<Props> = ({ headerColor = 'orange', cardTitle, cardSubtitle }) => {
  const classes = loginCardStyle();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Email:' + email, 'Password' + password)
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
          <div className={classes.rememberMeWrap}>
            <CustomCheckbox
              checked={false}
            />
            <Typography
              component="label"
              className={classes.rememberLabel}
            >
              ログインしたままにする
            </Typography>
          </div>
          <div className={classes.loginBtnWrap}>
            <Button
              color='primary'
              width='70%'
              type='submit'
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