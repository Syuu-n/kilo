import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  defaultFont,
} from 'assets/jss/material-dashboard-react';

const richTableCardStyle = makeStyles(() =>
createStyles({
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
  },
  buttonContainer: {
    position: 'absolute',
    right: '30px',
    transform: 'translateY(-50%)',
  },
}));

export default richTableCardStyle;