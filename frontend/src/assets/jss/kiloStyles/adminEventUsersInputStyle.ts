import { makeStyles, createStyles } from '@material-ui/core/styles';
import { successColor, dangerColor } from 'assets/jss/material-dashboard-react';

const adminEventUsersInputStyle = makeStyles(() =>
createStyles({
  underline: {
    '&:before': {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important",
    },
    '&:after': {
      borderColor: successColor,
    },
  },
  flexContainer: {
    display: "flex",
  },
  searchButton: {
    padding: 0,
    margin: "0 0 0 10px",
  },
  searchContainer: {
    position: "relative",
  },
  usersContainerWrap: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    boxShadow: "1px 2px 5px 2px rgba(0,0,0,0.4)",
    borderRadius: "3px",
    minWidth: "230px",
    margin: "0 0 10px 0",
    maxHeight: "200px",
    overflow: "auto",
  },
  usersContainer: {
    listStyle: "none",
    padding: "0 0 0 10px",
    fontSize: "13px",
  },
  user: {
    '&:hover': {
      background: "rgba(0,0,0,.03)",
    },
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
  },
  userName: {
    margin: 0,
  },
  userSelectButton: {
    padding: 0,
    margin: "0 10px 0 0",
  },
  userRemainingCount: {
    color: dangerColor,
    margin: "0 15px 0 0",
    fontSize: "13px",
  },
}));

export default adminEventUsersInputStyle;
