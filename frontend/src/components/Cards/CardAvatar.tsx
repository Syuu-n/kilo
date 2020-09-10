import * as React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import cardAvatarStyles from "assets/jss/material-dashboard-react/cardAvatarStyle";

interface Props {
  children: React.ReactNode;
  className?: string;
  profile?: boolean;
  plain?: boolean;
}

const CardAvatar: React.SFC<Props> = (props) => {
  const classes = cardAvatarStyles();
  const { children, plain, profile, ...rest } = props;
  let { className } = props;
  if (className === undefined) {
    className = ''
  }
  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [className]: className !== undefined
  });
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
}

export default CardAvatar;