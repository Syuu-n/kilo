// ##############################
// // // CustomInput styles
// #############################

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { dangerColor, defaultFont, primaryColor, successColor } from 'assets/jss/material-dashboard-react';

const customInputStyle = makeStyles(() =>
createStyles({
  disabled: {
    '&:before': {
      borderColor: 'transparent !important',
    },
  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: '#D2D2D2 !important',
      borderWidth: '1px !important',
    },
    '&:after': {
      borderColor: primaryColor,
    },
  },
  underlineError: {
    '&:after': {
      borderColor: dangerColor,
    },
  },
  underlineSuccess: {
    '&:after': {
      borderColor: successColor,
    },
  },
  whiteUnderline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: '#FFFFFF'
    },
    '&:after': {
      borderColor: '#FFFFFF'
    }
  },
  labelRoot: {
    ...defaultFont,
    color: '#AAAAAA !important',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '1.42857',
    letterSpacing: 'unset',
    '& + $underline': {
      marginTop: '0px'
    }
  },
  labelRootError: {
    color: dangerColor,
  },
  labelRootSuccess: {
    color: successColor,
  },
  feedback: {
    position: 'absolute',
    top: '18px',
    right: '0',
    zIndex: 2,
    display: 'block',
    width: '24px',
    height: '24px',
    textAlign: 'center',
    pointerEvents: 'none',
  },
  marginTop: {
    marginTop: '16px',
  },
  formControl: {
    paddingTop: '17px',
    margin: '0 0 27px 0',
    position: 'relative',
  },
}));

export default customInputStyle;
