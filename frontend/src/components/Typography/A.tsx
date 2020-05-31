import { makeStyles } from '@material-ui/core';
import typographyStyle from 'assets/jss/material-dashboard-react/typographyStyle';
import * as React from 'react';

const useStyles = makeStyles(() => ({
  ...typographyStyle
}));

const A: React.SFC<
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
> = (props) => {
  const { children, ...rest } = props;
  const classes = useStyles();

  return (
    <a {...rest} className={classes.defaultFontStyle + ' ' + classes.aStyle}>
      {children}
    </a>
  );
};

export default A;
