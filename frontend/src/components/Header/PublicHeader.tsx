import * as React from 'react';
import logoImg from 'assets/img/logo.png';
import { Button, IconButton } from 'components';
import history from 'RouterHistory';
import publicHeaderStyle from 'assets/jss/kiloStyles/publicHeaderStyle';
import { ExitToApp, Create } from '@material-ui/icons';

const PublicHeader: React.FC = () => {
  const classes = publicHeaderStyle();

  const handleLoginButtonClick = () => {
    // ログインページへ移動
    history.push('/login');
  };

  const handleTrialButtonClick = () => {
    // 体験申し込みページへ移動
    history.push('/trial_register');
  };

  return (
    <header className={classes.header}>
      <div className={classes.logoWrap}>
        <a href="/">
          <img src={logoImg} alt="logo" />
        </a>
      </div>
      <div className={classes.buttonWrap}>
        <Button
          color="white"
          round
          onClick={() => handleLoginButtonClick()}
        >
          ログイン
        </Button>
        <Button
          color="primary"
          round
          onClick={() => handleTrialButtonClick()}
        >
          体験申し込み
        </Button>
      </div>
      <div className={classes.mobileButtonWrap}>
        <div className={classes.mobileLoginButton}>
          <IconButton
            color="white"
            onClick={() => handleLoginButtonClick()}
          >
            <ExitToApp />
          </IconButton>
          <span className={classes.mobileLoginButtonLabel}>ログイン</span>
        </div>
        <div className={classes.mobileButton}>
          <IconButton
          color="primary"
          onClick={() => handleTrialButtonClick()}
        >
          <Create />
        </IconButton>
        <span className={classes.mobileTrialButtonLabel}>体験申し込み</span>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;