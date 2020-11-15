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
  disableTextColor: {
    color: '#AAAAAA',
  },
  fullWidth: {
    width: '100%',
  },
  usersContainer: {
    listStyle: "circle",
    padding: "0 0 0 20px",
    margin: 0,
    fontSize: "14px",
    maxHeight: "200px",
    overflow: "auto",
  },
  pickerCell: {
    minWidth: "210px",
  },
  usersContainerWrap: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    boxShadow: "1px 2px 5px 2px rgba(0,0,0,0.4)",
    borderRadius: "3px",
    minWidth: "230px",
    margin: "0 0 10px 0",
  },
  user: {
    '&:hover': {
      background: "rgba(0,0,0,.03)",
    },
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
  },
  userName: {
    margin: 0,
  },
  userSelectButton: {
    padding: 0,
    margin: "0 10px 0 0",
  },
  deleteButton: {
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
  overrides: {
    MuiTabs: {
      root: {
        color: '#FFFFFF !important',
      },
    },
  },
});

export { adminModalStyle, pickerTheme};