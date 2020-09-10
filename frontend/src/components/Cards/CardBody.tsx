import * as React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import cardBodyStyle from "assets/jss/material-dashboard-react/cardBodyStyle";

interface Props {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  children?: React.ReactNode;
}

const CardBody: React.SFC<Props> = (props) => {
  const classes = cardBodyStyle();
  const { children, plain, profile, ...rest } = props;
  let { className } = props;
  if (className === undefined) {
    className = ''
  }
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyProfile]: profile,
    [className]: className !== undefined
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

export default CardBody;