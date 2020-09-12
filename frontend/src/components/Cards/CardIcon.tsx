import * as React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import cardIconStyles from "assets/jss/material-dashboard-react/cardIconStyle";

interface Props {
  className?: string;
  color?:
    "orange"|
    "green"|
    "red"|
    "blue"|
    "purple"|
    "rose"
  children?: React.ReactNode;
}

const CardIcon: React.SFC<Props> = (props) => {
  const classes = cardIconStyles();
  const { children, color, ...rest } = props;
  let { className } = props;
  if (className === undefined) {
    className = ''
  }
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}

export default CardIcon;