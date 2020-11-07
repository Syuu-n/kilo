import * as React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import cardStyle from "assets/jss/material-dashboard-react/cardStyle";

interface Props {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  chart?: boolean;
  login?: boolean;
  children?: React.ReactNode;
}

const Card: React.SFC<Props> = (props) => {
  const classes = cardStyle();
  const { children, plain, profile, chart, login, className, ...rest } = props;

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [classes.cardLogin]: login,
  });
  return (
    <div className={cardClasses + (className ? ' ' + className : '')} {...rest}>
      {children}
    </div>
  );
}

export default Card;