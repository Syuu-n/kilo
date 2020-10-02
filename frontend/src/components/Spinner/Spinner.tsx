import * as React from 'react';
import Spinner from '@material-ui/core/CircularProgress';
import spinnerStyle from 'assets/jss/kiloStyles/spinnerStyle';

interface Props {
  color?:
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'rose'
  | 'white'
}

const KSpinner: React.SFC<Props> =({ color="primary"}) => {
  const classes = spinnerStyle();

  return (
    <div className={color ? classes[color] : classes.primary}>
      <Spinner color='inherit'/>
    </div>
  );
};

export default KSpinner;