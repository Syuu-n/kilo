import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  roseCardHeader,
  grayColor
} from "assets/jss/material-dashboard-react";

const cardIconStyle = makeStyles(() =>
createStyles({
  cardIcon: {
    "&$orangeCardHeader,&$greenCardHeader,&$redCardHeader,&$blueCardHeader,&$purpleCardHeader,&$roseCardHeader": {
      borderRadius: "3px",
      backgroundColor: grayColor[0],
      padding: "15px",
      marginTop: "-20px",
      marginRight: "15px",
      float: "left"
    }
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  roseCardHeader,
}));

export default cardIconStyle;
