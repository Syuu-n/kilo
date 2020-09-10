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
  children?: React.ReactNode;
}

const Card: React.SFC<Props> = (props) => {
  const classes = cardStyle();
  const { children, plain, profile, chart, ...rest } = props;
  let { className } = props;
  if (className === undefined) {
    className = ''
  }
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className]: className !== undefined
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

export default Card;