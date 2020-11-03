import { makeStyles, createStyles, createMuiTheme } from '@material-ui/core/styles';

const adminModalStyle = makeStyles(() =>
createStyles({
  flexContainer: {
    display: 'flex',
  },
  flexMarginBottomContainer: {
    display: 'flex',
    margin: '0 0 10px 0',
  },
  flexContainerFirst: {
    margin: '0 10px 0 0',
  },
  ruleSettingTitle: {
    margin: 0,
  },
  ruleSettingTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 0 5px 0',
  },
  ruleSettingCloseButton: {
    margin: 0,
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