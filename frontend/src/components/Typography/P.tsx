import { makeStyles } from '@material-ui/core';
import typographyStyle from 'assets/jss/material-dashboard-react/typographyStyle';
import * as React from 'react';

const useStyles = makeStyles(() => ({
  ...typographyStyle
}));

interface Props {
}

const P: React.SFC<Props> = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <p className={classes.defaultFontStyle + ' ' + classes.pStyle}>
      {children}
    </p>
  );
};

export default P;
