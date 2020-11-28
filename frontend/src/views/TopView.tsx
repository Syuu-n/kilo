import * as React from 'react';
import { Button } from 'components';
import topViewStyle from 'assets/jss/kiloStyles/topViewStyle';
import history from 'RouterHistory';

const TopView: React.FC = () => {
  const classes = topViewStyle();

  const handleLoginButtonClick = () => {
    // ログインページへ移動
    history.push('/login');
  };

  const handleTrialButtonClick = () => {
    // 体験申し込みページへ移動
    history.push('/trial_register');
  };

  return(
    <div className={classes.wrapContainer}>
      <div className={classes.titleContainer}>
        <h1 className={classes.titleHighLight}>K</h1>
        <h1>Dance Classic Studio</h1>
      </div>
      <div className={classes.subTitleContainer}>
        <p className={classes.subtitle}>ダンスを楽しむ事を大切に<br/>カラダ作り+柔軟性、基礎、技術、表現力を身につける</p>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          customClass={classes.loginButton}
          color="white"
          onClick={() => handleLoginButtonClick()}
        >
          ログイン
        </Button>
        <Button
          customClass={classes.trialButton}
          color="primary"
          onClick={() => handleTrialButtonClick()}
        >
          体験申し込み
        </Button>
      </div>
    </div>
  );
};

export default TopView;