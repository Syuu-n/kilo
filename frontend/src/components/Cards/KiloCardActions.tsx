import * as React from "react";
import classNames from "classnames";
import cardFooterStyle from "assets/jss/material-dashboard-react/cardActionsStyle";
import { CardActions } from "@material-ui/core";

interface Props {
  className?: string;
  plain?: boolean;
  children?: React.ReactNode;
}

/**
 * Material-UI の CardActions
 * https://material-ui.com/api/card-actions/
 * @param props.plain 左右の margin を 5px にする
 */
const KiloCardActions: React.FC<Props> = (props) => {
  const classes = cardFooterStyle();
  const { children, plain, ...rest } = props;
  let { className } = props;
  if (className === undefined) {
    className = ''
  }
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [className]: className !== undefined
  });
  return (
    <CardActions className={cardFooterClasses} {...rest}>
      {children}
    </CardActions>
  );
}

export default KiloCardActions;