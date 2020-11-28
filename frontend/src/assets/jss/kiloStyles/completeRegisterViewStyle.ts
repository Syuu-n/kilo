import { makeStyles, createStyles } from '@material-ui/core/styles';
import { primaryColor } from 'assets/jss/material-dashboard-react';
import loginBackgroundImg from 'assets/img/login_img.jpg';

const completeRegisterViewStyle = makeStyles(() =>
createStyles({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  completeView: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    height: '100%',
    maxHeight: '100%',
    backgroundImage: `url(${loginBackgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  spinnerWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: "300px",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
  },
  icon: {
    color: primaryColor,
    fontSize: "40px",
    margin: "0 0 10px 0",
  },
  loginButton: {
    minWidth: "260px",
  },
}));

export default completeRegisterViewStyle;