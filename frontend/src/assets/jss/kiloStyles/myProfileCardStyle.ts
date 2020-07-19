import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  blueCardHeader,
  card,
  cardHeader,
  defaultFont,
  greenCardHeader,
  orangeCardHeader,
  purpleCardHeader,
  redCardHeader,
  roseCardHeader,
  // dangerColor
} from 'assets/jss/material-dashboard-react';

const myProfileCardStyle = makeStyles(() =>
createStyles({
  card,
  cardHeader: {
    ...cardHeader,
    ...defaultFont
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  roseCardHeader,
  headerContainer: {
    display: 'flex',
  },
  cardIcon: {
    width: '33px',
    height: '33px',
    fill: '#fff',
  },
  cardAvatar: {
    margin: 0,
    height: '33px',
  },
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

export default myProfileCardStyle;