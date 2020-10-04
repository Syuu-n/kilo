import { Theme, makeStyles, createStyles } from '@material-ui/core';
import {
  dangerColor,
  defaultFont,
  grayColor,
  infoColor,
  primaryColor,
  roseColor,
  successColor,
  warningColor,
} from 'assets/jss/material-dashboard-react';

const richTableStyle = makeStyles((theme: Theme) =>
createStyles({
  warningTableHeader: {
    color: `${warningColor} !important`,
  },
  primaryTableHeader: {
    color: `${primaryColor} !important`,
  },
  dangerTableHeader: {
    color: `${dangerColor} !important`,
  },
  successTableHeader: {
    color: `${successColor} !important`,
  },
  infoTableHeader: {
    color: `${infoColor} !important`,
  },
  roseTableHeader: {
    color: `${roseColor} !important`,
  },
  grayTableHeader: {
    color: `${grayColor} !important`,
  },
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
  },
  tableHeadCell: {
    color: 'inherit',
    ...defaultFont,
    fontSize: '1em',
  },
  tableCell: {
    ...defaultFont,
    lineHeight: '1.42857143',
    padding: '12px 8px',
    verticalAlign: 'middle',
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
}),
);

export default richTableStyle;
