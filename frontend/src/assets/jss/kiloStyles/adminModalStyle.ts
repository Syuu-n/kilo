import { makeStyles, createStyles } from '@material-ui/core/styles';

const adminModalStyle = makeStyles(() =>
createStyles({
  flexContainer: {
    display: 'flex',
  },
  flexContainerFirst: {
    margin: '0 10px 0 0',
  },
  descriptionContainer: {
    minWidth: '300px',
  }
}));

export default adminModalStyle;