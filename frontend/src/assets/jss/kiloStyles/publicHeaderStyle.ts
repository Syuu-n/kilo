import { makeStyles, createStyles } from '@material-ui/core';
import { primaryColor } from "assets/jss/material-dashboard-react";

const publicHeaderStyle = makeStyles(() =>
createStyles({
  header: {
    position: 'fixed',
    width: '100%',
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
    background: '#FFF',
    borderBottom: 'solid 1px #eee',
  },
  logoWrap: {
    margin: '0 0 0 3%',
    '& img': {
      width: '200px',
    },
  },
  buttonWrap: {
    margin: '0 3% 0 0',
    display: 'none',
    [`@media (min-width: 600px)`]: {
      display: 'flex',
    },
    '& button': {
      margin: '0 10px 0 0',
    },
  },
  mobileButtonWrap: {
    margin: '0 3% 0 0',
    display: 'flex',
    [`@media (min-width: 600px)`]: {
      display: 'none',
    },
  },
  mobileButton: {
    display: 'flex',
    flexDirection: 'column',
  },
  mobileLoginButton: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 15px 0 0',
  },
  mobileLoginButtonLabel: {
    fontSize: '11px',
    margin: '2px 0 0 0',
  },
  mobileTrialButtonLabel: {
    fontSize: '11px',
    color: primaryColor,
    margin: '2px 0 0 0',
  },
}));

export default publicHeaderStyle;
