// ##############################
// // // HeaderLinks styles
// #############################

import { Theme, makeStyles, createStyles } from '@material-ui/core';
import {
  dangerColor,
  defaultFont,
  primaryBoxShadow,
  primaryColor,
} from 'assets/jss/material-dashboard-react';

const headerLinksStyle= makeStyles((theme: Theme) =>
createStyles({
  popperClose: {
    pointerEvents: 'none',
  },
  linkText: {
    zIndex: 4,
    ...defaultFont,
    fontSize: '14px',
    [theme.breakpoints.down('sm')]: {
      lineHeight: '30px',
      margin: 0,
    },
  },
  buttonLink: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'start',
      margin: '10px 15px 0 15px',
      padding: '10px 13px',
      width: '230px',
      borderRadius: '3px',
      color: '#555555',
    },
  },
  margin: {
    zIndex: 4,
    margin: '0',
  },
  links: {
    width: '20px',
    height: '20px',
    zIndex: 4,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: '30px',
      height: '30px',
      marginRight: '41px',
    },
  },
  notifications: {
    zIndex: 4,
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '5px',
      border: '1px solid #FFF',
      right: '10px',
      fontSize: '9px',
      background: dangerColor,
      color: '#FFFFFF',
      minWidth: '16px',
      height: '16px',
      borderRadius: '10px',
      textAlign: 'center',
      lineHeight: '16px',
      verticalAlign: 'middle',
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      ...defaultFont,
      fontSize: '14px',
      marginRight: '8px',
    },
  },
  dropdown: {
    borderRadius: '3px',
    border: '0',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
    top: '100%',
    zIndex: 1000,
    minWidth: '160px',
    padding: '5px 0',
    margin: '2px 0 0',
    fontSize: '14px',
    textAlign: 'left',
    listStyle: 'none',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
  },
  popperResponsive: {
    [theme.breakpoints.down('sm')]: {
      zIndex: 1640,
      position: 'static',
      float: 'none',
      width: 'auto',
      marginTop: '0',
      backgroundColor: 'transparent',
      border: '0',
      boxShadow: 'none',
      color: 'black',
    },
  },
  dropdownItem: {
    ...defaultFont,
    fontSize: '13px',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '2px',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: 400,
    lineHeight: '1.42857143',
    color: '#333',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: primaryColor,
      color: '#FFFFFF',
      ...primaryBoxShadow,
    },
  },
  currentUserContainer: {
    cursor: 'pointer',
  },
}),
);

export default headerLinksStyle;
