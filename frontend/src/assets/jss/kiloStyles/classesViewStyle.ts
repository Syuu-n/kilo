import { makeStyles, createStyles } from '@material-ui/core/styles';
import { defaultFont } from 'assets/jss/material-dashboard-react';

const classesViewStyle = makeStyles(() =>
createStyles({
  spinnerWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 123px)',
  },
  cardTitle: {
    margin: '10px 0 0 0',
    ...defaultFont,
    fontFamily: 'cursive',
  },
}));

export default classesViewStyle;