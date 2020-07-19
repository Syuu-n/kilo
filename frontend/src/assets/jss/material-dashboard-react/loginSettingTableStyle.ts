// ##############################
// // // Table styles
// #############################

import { Theme, makeStyles, createStyles } from '@material-ui/core';
import {
  defaultFont,
} from 'assets/jss/material-dashboard-react';

const tableStyle = makeStyles((theme: Theme) =>
createStyles({
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
  },
  tableCell: {
    ...defaultFont,
    lineHeight: '1.42857143',
    padding: '0 15px',
    verticalAlign: 'middle',
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
}),
);

export default tableStyle;
