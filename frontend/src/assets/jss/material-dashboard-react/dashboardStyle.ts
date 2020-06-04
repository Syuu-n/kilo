// ##############################
// // // Dashboard styles
// #############################

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { successColor } from 'assets/jss/material-dashboard-react';

const dashboardStyle = makeStyles(() =>
createStyles({
  successText: {
    color: successColor,
  },
  upArrowCardCategory: {
    width: 14,
    height: 14,
  },
}));

export default dashboardStyle;
