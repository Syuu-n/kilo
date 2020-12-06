import * as React from "react";
import classNames from "classnames";
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

/**
 * CardHeader にアイコンを追加
 * CardHeader の icon を true にしておく必要がある
 * @param props.color アイコンの背景色
 */
const KiloCardIcon: React.FC<Props> = (props) => {
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

export default KiloCardIcon;