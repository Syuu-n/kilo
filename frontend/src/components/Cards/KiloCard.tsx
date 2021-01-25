import * as React from "react";
import cardStyle from "assets/jss/material-dashboard-react/cardStyle";
import { Card } from "@material-ui/core";

interface Props {
  className?: string;
  children?: React.ReactNode;
}


/**
 * Material-UI の Card
 * https://material-ui.com/api/card/
 */
const KiloCard: React.FC<Props> = (props) => {
  const classes = cardStyle();
  const { children, className, ...rest } = props;

  return (
    <Card className={classes.card + (className ? ' ' + className : '')} {...rest}>
      {children}
    </Card>
  );
}

export default KiloCard;