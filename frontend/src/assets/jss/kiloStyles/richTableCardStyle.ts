import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  defaultFont,
} from 'assets/jss/material-dashboard-react';

const richTableCardStyle = makeStyles(() =>
createStyles({
  cardTitle: {
    margin: '10px 0 0 0',
    ...defaultFont,
    fontFamily: 'cursive',
  },
  table: {
    marginBottom: '0',
    overflow: 'visible',
  },
  tableRow: {
    position: 'relative',
    borderBottom: '1px solid #dddddd',
  },
  tableCell: {
    ...defaultFont,
    padding: '8px',
    verticalAlign: 'middle',
    border: 'none',
    lineHeight: '1.42857143',
    fontSize: '14px',
  }
}));

export default richTableCardStyle;