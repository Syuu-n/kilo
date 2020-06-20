import { makeStyles, createStyles } from '@material-ui/core/styles';
import { primaryColor } from 'assets/jss/material-dashboard-react';

const authStyle = makeStyles(() =>
createStyles({
  spinnerWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: primaryColor
  }
}));

export default authStyle;