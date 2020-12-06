import * as React from "react";
import classNames from "classnames";
import cardBodyStyle from "assets/jss/material-dashboard-react/cardContentStyle";
import { CardContent } from "@material-ui/core"

interface Props {
  className?: string;
  plain?: boolean;
  children?: React.ReactNode;
}

/**
 * Material-UI の CardContent
 * https://material-ui.com/api/card-content/
 * @param props.plain 左右の margin を 5px にする
 */
const KiloCardContent: React.FC<Props> = (props) => {
  const classes = cardBodyStyle();
  const { children, plain, ...rest } = props;
  let { className } = props;
  if (className === undefined) {
    className = ''
  }
  const cardBodyClasses = classNames({
    [classes.cardBodyPlain]: plain,
    [className]: className !== undefined
  });
  return (
    <CardContent
      className={cardBodyClasses} {...rest}
      classes={{
        root: classes.cardBody,
      }}
    >
      {children}
    </CardContent>
  );
}

export default KiloCardContent;