import { makeStyles, createStyles } from '@material-ui/core/styles';
import loginBackgroundImg from 'assets/img/login_img.jpg';
import { dangerColor, primaryColor } from 'assets/jss/material-dashboard-react';

const passwordResetViewStyle = makeStyles(() => 
createStyles({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  card: {
    maxWidth: '500px',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    margin: 0,
  },
  resetView: {
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
  errorMessageContainer: {
    textAlign: 'center',
    marginTop: '10px'
  },
  errorMessage: {
    color: dangerColor,
  },
  buttonWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px'
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: primaryColor,
    fontSize: "40px",
    margin: "0 0 10px 0",
  },
}));

export default passwordResetViewStyle;