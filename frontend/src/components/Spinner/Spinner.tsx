import * as React from 'react';
import Spinner from '@material-ui/core/CircularProgress';
import spinnerStyle from 'assets/jss/kiloStyles/spinnerStyle';

const KSpinner: React.SFC =() => {
  const classes = spinnerStyle();

  return (
    <div className={classes.spinnerWrap}>
      <Spinner color='inherit'/>
    </div>
  );
};

export default KSpinner;