import { makeStyles, createStyles } from '@material-ui/core/styles';

const cardContentStyle = makeStyles(() =>
createStyles({
  cardBody: {
    padding: "20px",
    flex: "1 1 auto",
    // WebkitBoxFlex: "1",
    position: "relative"
  },
  cardBodyPlain: {
    paddingLeft: "5px",
    paddingRight: "5px"
  },
}));

export default cardContentStyle;
