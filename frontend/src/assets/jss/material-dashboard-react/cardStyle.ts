import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  blackColor,
  whiteColor,
  hexToRgb
} from "assets/jss/material-dashboard-react";

const cardStyle = makeStyles(() =>
createStyles({
  card: {
    border: "0",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
    background: whiteColor,
    width: "100%",
    boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
    overflow: "inherit",
  },
}));

export default cardStyle;
