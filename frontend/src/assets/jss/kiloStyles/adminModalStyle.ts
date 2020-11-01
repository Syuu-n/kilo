import { makeStyles, createStyles, createMuiTheme } from '@material-ui/core/styles';

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
  },
}));

const pickerTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#4caf50',
      contrastText: '#FFFFFF',
    },
  },
});

export { adminModalStyle, pickerTheme};