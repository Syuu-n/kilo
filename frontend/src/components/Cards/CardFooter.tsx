import * as React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import cardFooterStyle from "assets/jss/material-dashboard-react/cardFooterStyle";

interface Props {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  stats?: boolean;
  chart?: boolean;
  children?: React.ReactNode;
}

const CardFooter: React.SFC<Props> = (props) => {
  const classes = cardFooterStyle();
  const { children, plain, profile, stats, chart, ...rest } = props;
  let { className } = props;
  if (className === undefined) {
    className = ''
  }
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
    [className]: className !== undefined
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}

export default CardFooter;