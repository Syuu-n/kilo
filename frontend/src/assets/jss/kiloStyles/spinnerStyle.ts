import { makeStyles, createStyles } from '@material-ui/core/styles';
import { primaryColor } from 'assets/jss/material-dashboard-react';

const spinnerStyle = makeStyles(() =>
createStyles({
  spinnerWrap: {
    color: primaryColor
  }
}));

export default spinnerStyle;