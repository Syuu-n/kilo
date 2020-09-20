import { makeStyles, createStyles } from '@material-ui/core/styles';

const showEventModalStyle = makeStyles(() =>
createStyles({
  usersContainer: {
    listStyle: "circle",
    padding: "0 0 0 30px",
    margin: 0,
    fontSize: "14px",
    maxHeight: "120px",
    overflow: "auto",
  },
}));

export default showEventModalStyle;
