import { makeStyles, createStyles } from '@material-ui/core/styles';

const usersViewStyle = makeStyles(() =>
createStyles({
  spinnerWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 123px)',
  }
}));

export default usersViewStyle;