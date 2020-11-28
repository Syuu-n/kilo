import * as React from 'react';
import wizardNavigationStyle from 'assets/jss/kiloStyles/wizardNavigationStyle';

interface Props {
  navs: string[];
  selectedNav: number;
}

const WizardNavigation: React.FC<Props> = (props) => {
  const { navs, selectedNav } = props;
  const classes = wizardNavigationStyle();

  return (
    <div className={classes.navWrap}>
      { navs.map((nav, i) => (
        selectedNav == (i + 1) ? (
          <div key={i}>
            <div className={classes.navCircle}>{i + 1}</div>
            <div className={classes.navTitle}>{nav}</div>
          </div>
        ) : (
          <div key={i}>
            <div className={classes.navCircleGray}>{i + 1}</div>
            <div className={classes.navTitleGray}>{nav}</div>
          </div>
        )
      ))}
    </div>
  );
};

export default WizardNavigation;