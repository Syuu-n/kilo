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
    "&, &$tableCell": {
      fontSize: "1em"
    },
    whiteSpace: "nowrap",
  },
  tableCell: {
    ...defaultFont,
    lineHeight: '1.42857143',
    padding: '12px 8px',
    verticalAlign: 'middle',
    fontSize: "0.8125rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "200px",
    textOverflow: "ellipsis",
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  tableHeadRow: {
    height: "56px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle"
  },
  tableBodyRow: {
    height: "51px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  selected: {
    background: 'rgba(0,0,0,.03) !important',
  },
}),
);

export default richTableStyle;
