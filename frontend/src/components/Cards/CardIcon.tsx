import * as React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import cardIconStyles from "assets/jss/material-dashboard-react/cardIconStyle";

interface Props {
  className: string;
  color:
    "warning"|
    "success"|
    "danger"|
    "info"|
    "primary"|
    "rose",
  children: React.ReactNode;
}

const CardIcon: React.SFC<Props> = (props) => {
  const classes = cardIconStyles();
  const { className, children, color, ...rest } = props;
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