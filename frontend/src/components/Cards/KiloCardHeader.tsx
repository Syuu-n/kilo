import * as React from "react";
import classNames from "classnames";
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
  icon?: boolean;
  children?: React.ReactNode;
}

/**
 * Material-UI の CardHeader ではなく div 要素
 * @param props.color ヘッダーのカラー
 * @param props.plain 左右の margin を 0 にする
 * @param props.icon CardIcon を有効にする
 */
const KiloCardHeader: React.FC<Props> = (props) => {
  const classes = cardHeaderStyles();
  const { children, color, plain, icon, ...rest } = props;
  let { className } = props;
  if (className === undefined) {
    className = ''
  }
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

export default KiloCardHeader;