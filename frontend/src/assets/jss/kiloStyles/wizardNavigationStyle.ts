import { makeStyles, createStyles } from '@material-ui/core/styles';
import { primaryColor, whiteColor, grayColor } from 'assets/jss/material-dashboard-react';

const wizardNavigationStyle = makeStyles(() =>
createStyles({
  navWrap: {
    display: "flex",
    justifyContent: "space-around",
    margin: "0 0 50px 0",
  },
  navCircle: {
    backgroundColor: primaryColor,
    color: whiteColor,
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    textAlign: "center",
    lineHeight: "30px",
    margin: "0 auto 5px auto",
  },
  navCircleGray: {
    backgroundColor: grayColor,
    color: whiteColor,
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    textAlign: "center",
    lineHeight: "30px",
    margin: "0 auto 5px auto",
  },
  navTitle: {
    color: primaryColor,
  },
  navTitleGray: {
    color: grayColor,
  },
}));

export default wizardNavigationStyle;