import { makeStyles, createStyles } from '@material-ui/core/styles';
import { primaryColor } from 'assets/jss/material-dashboard-react';
import trialBackgroundImg from 'assets/img/trial_img.jpg';

const topViewStyle = makeStyles(() =>
createStyles({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  trialView: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    height: '100%',
    maxHeight: '100%',
    backgroundImage: `url(${trialBackgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  spinnerWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 123px)',
  },
  dropDownWrap: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 0 10px 0",
    display: "block",
    [`@media (min-width: 860px)`]: {
      display: "flex",
    },
  },
  flexContainer: {
    display: "flex",
  },
  flexContainerFirst: {
    margin: '0 10px 0 0',
    width: "50%",
  },
  flexContainerLast: {
    width: "50%",
  },
  subtitleContainer: {
    margin: "0 0 40px 0",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    color: primaryColor,
    fontSize: "40px",
    margin: "0 0 10px 0",
  },
}));

export default topViewStyle;