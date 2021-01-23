import { makeStyles, createStyles } from '@material-ui/core/styles';
import { primaryColor } from 'assets/jss/material-dashboard-react';

const topViewStyle = makeStyles(() =>
createStyles({
  wrapContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    display: 'flex',
  },
  title: {
    fontSize: '30px',
    [`@media (min-width: 520px)`]: {
      fontSize: '48px'
    },
  },
  titleHighLight: {
    color: primaryColor,
    margin: 'auto 10px auto auto',
  },
  subTitleContainer: {
    margin: '0 0 50px 0',
  },
  subtitle: {
    fontSize: '12px',
    [`@media (min-width: 520px)`]: {
      fontSize: '14px',
    },
  },
}));

export default topViewStyle;