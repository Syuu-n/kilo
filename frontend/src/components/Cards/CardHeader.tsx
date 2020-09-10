import * as React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import cardHeaderStyles from "assets/jss/material-dashboard-react/cardheaderStyle";

interface Props {
  className?: string;
  color?: 
    "orange"|
    "green"|
    "red"|
    "blue"|
    "purple"|
    "rose"
  ,
  plain?: boolean;
  stats?: boolean;
  icon?: boolean;
  children?: React.ReactNode;
}

const CardHeader: React.SFC<Props> = (props) => {
  const classes = cardHeaderStyles();
  const { children, color, plain, stats, icon, ...rest } = props;
  let { className } = props;
  if (className === undefined) {
    className = ''
  }
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

export default CardHeader;