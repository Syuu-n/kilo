import { makeStyles, createStyles } from '@material-ui/core/styles';

const adminAddUserModalStyle = makeStyles(() =>
createStyles({
  flexContainer: {
    display: 'flex',
  },
  flexContainerFirst: {
    margin: '0 10px 0 0',
  },
}));

export default adminAddUserModalStyle;