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
    fontSize: '10px',
    [`@media (min-width: 520px)`]: {
      fontSize: '16px'
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    [`@media (min-width: 520px)`]: {
      flexDirection: 'initial',
      width: 'initial',
      justifyContent: 'center',
    },
  },
  loginButton: {
    margin: '0 0 20px 0',
    width: '70%',
    [`@media (min-width: 520px)`]: {
      margin: '0 15px 0 0',
      width: '140px',
    },
  },
  trialButton: {
    margin: 0,
    width: '70%',
    [`@media (min-width: 520px)`]: {
      width: '140px',
    }
  },
}));

export default topViewStyle;