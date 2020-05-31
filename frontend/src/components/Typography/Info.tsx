import { makeStyles } from '@material-ui/core';
import typographyStyle from 'assets/jss/material-dashboard-react/typographyStyle';
import * as React from 'react';

const useStyles = makeStyles(() => ({
  ...typographyStyle
}));

interface Props {
}

const Info: React.SFC<Props> = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.defaultFontStyle + ' ' + classes.infoText}>
      {children}
    </div>
  );
};

export default Info;
