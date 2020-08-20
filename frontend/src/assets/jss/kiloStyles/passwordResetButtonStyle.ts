import { makeStyles, createStyles } from '@material-ui/core/styles';

const passwordResetButtonStyle = makeStyles(() => 
createStyles({
  buttonWrap:{
    display: 'flex',
    justifyContent: 'center',
  },
  resetButton: {
    margin: 0,
  },
}));

export default passwordResetButtonStyle;