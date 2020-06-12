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
} from 'assets/jss/material-dashboard-react';

const loginCardStyle = makeStyles(() =>
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
  cardTitle: {
    color: '#FFFFFF',
    margin: '10px 0',
    ...defaultFont,
    fontSize: '1.125em',
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
  rememberMeWrap: {
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
}));

export default loginCardStyle;