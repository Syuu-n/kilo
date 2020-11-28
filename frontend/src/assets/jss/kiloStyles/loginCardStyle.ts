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
  dangerColor
} from 'assets/jss/material-dashboard-react';

const loginCardStyle = makeStyles(() =>
createStyles({
  card: {
    maxWidth: '500px',
    ...card,
  },
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
  cardTitle: {
    margin: '10px 0',
    ...defaultFont,
    color: '#FFFFFF',
    fontSize: '1.3em',
    textAlign: 'center',
    fontFamily: 'cursive'
  },
  cardSubtitle: {
    ...defaultFont,
    marginBottom: '0',
    color: 'rgba(255, 255, 255, 0.62)',
    margin: '0 0 10px'
  },
  cardContent: {
    margin: '10px 0 0 0',
    padding: '20px 35px 25px 35px'
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
}));

export default loginCardStyle;