import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  whiteColor,
} from 'assets/jss/material-dashboard-react';

const spinnerStyle = makeStyles(() =>
createStyles({
  primary: {
    color: primaryColor,
  },
  info: {
    color: infoColor,
  },
  success: {
    color: successColor,
  },
  warning: {
    color: warningColor,
  },
  danger: {
    color: dangerColor,
  },
  rose: {
    color: roseColor,
  },
  white: {
    color: whiteColor,
  },
}));

export default spinnerStyle;