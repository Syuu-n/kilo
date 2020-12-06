import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  blueCardHeader,
  defaultFont,
  greenCardHeader,
  orangeCardHeader,
  purpleCardHeader,
  redCardHeader,
  roseCardHeader,
  dangerColor
} from 'assets/jss/material-dashboard-react';

const loginCardStyle = makeStyles(() =>
createStyles({
  card: {
    maxWidth: '500px',
    transform: 'translate3d(0, 0, 0)',
    transition: 'all 300ms linear',
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  roseCardHeader,
  cardTitle: {
    margin: '10px 0',
    ...defaultFont,
    color: '#FFFFFF',
    fontSize: '17px',
    textAlign: 'center',
    fontFamily: 'cursive'
  },
  cardContent: {
    margin: '10px 0 0 0',
  },
  inputIcon: {
    color: '#555555'
  },
  rememberMeContainer: {
    display: 'flex'
  },
  rememberLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px'
  },
  loginBtnWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px'
  },
  errorMessageContainer: {
    textAlign: 'center',
    marginTop: '10px'
  },
  errorMessage: {
    color: dangerColor,
  },
  cardHidden: {
    transform: 'translate3d(0, -60px, 0) !important',
    opacity: 0,
  },
  passwordResetButton: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
    margin: '20px 0 0 0',
    cursor: 'pointer',
  },
}));

export default loginCardStyle;