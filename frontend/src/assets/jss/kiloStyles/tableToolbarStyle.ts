import { makeStyles, createStyles } from '@material-ui/core';

const tableToolbarStyle = makeStyles(() =>
createStyles({
  toolbarContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 15px",
  },
  buttonIcon: {
    margin: "0 5px 0 0",
  },
  addButton: {
    height: "40px",
  },
  searchContainer: {
    display: "flex",
    margin: "0 0 0 15px",
  },
  // TODO: 検索機能の実装
  // inputForm: {
  //   margin: "0 7px 0 0",
  // },
  // searchIcon: {
  //   color: "#fff"
  // },
}),
);

export default tableToolbarStyle;
