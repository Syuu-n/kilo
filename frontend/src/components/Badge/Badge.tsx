import * as React from "react";
import badgeStyle from "assets/jss/kiloStyles/badgeStyle";

interface Props {
  color?:  "primary" | "warning" | "danger" | "success" | "info" | "rose" | "gray";
}

const Badge: React.SFC<Props> = ({ color = "gray", children }) => {
  const classes = badgeStyle();
  return (
    <span className={classes.badge + " " + classes[color]}>{children}</span>
  );
}

export default Badge;