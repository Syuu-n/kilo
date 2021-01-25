import { makeStyles, createStyles } from '@material-ui/core/styles';

const customCheckBoxListStyle = makeStyles(() =>
createStyles({
  list: {
    margin: "0",
  },
  listItem: {
    padding: "0",
  },
  listText: {
    fontSize: "13px",
  },
}));

export default customCheckBoxListStyle;