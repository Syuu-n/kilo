import { makeStyles, createStyles } from '@material-ui/core/styles';
// import { primaryColor, whiteColor, grayColor } from 'assets/jss/material-dashboard-react';

const wizardNavigationStyle = makeStyles(() =>
createStyles({
  card: {
    maxWidth: "800px",
  },
  title: {
    margin: 0,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 15px",
    height: "61px",
  },
  buttonContainerEnd: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    padding: "0 15px",
    height: "61px",
  },
  displayNone: {
    display: "none",
  },
  spinnerWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default wizardNavigationStyle;