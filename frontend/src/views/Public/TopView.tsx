import * as React from 'react';
import { PublicHeader } from 'components';
import topViewStyle from 'assets/jss/kiloStyles/topViewStyle';

const TopView: React.FC = () => {
  const classes = topViewStyle();

  return(
    <div>
      <PublicHeader/>
      <div className={classes.wrapContainer}>
        <div className={classes.titleContainer}>
          <h1 className={classes.title +  " "  + classes.titleHighLight}>K</h1>
          <h1 className={classes.title}>Dance Classic Studio</h1>
        </div>
        <div className={classes.subTitleContainer}>
          <p className={classes.subtitle}>ダンスを楽しむ事を大切に<br/>カラダ作り+柔軟性、基礎、技術、表現力を身につける</p>
        </div>
      </div>
    </div>
  );
};

export default TopView;