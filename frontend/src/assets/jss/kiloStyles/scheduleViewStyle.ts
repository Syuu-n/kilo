import { makeStyles, createStyles } from '@material-ui/core/styles';
import { primaryColor } from 'assets/jss/material-dashboard-react';

const scheduleViewStyle = makeStyles(() =>
createStyles({
  spinnerWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 123px)',
    color: primaryColor
  }
}));

export default scheduleViewStyle;