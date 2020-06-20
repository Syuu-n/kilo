// ##############################
// // // Header styles
// #############################

import { Theme, makeStyles, createStyles } from '@material-ui/core';
import {
  container,
  dangerColor,
  defaultBoxShadow,
  defaultFont,
  infoColor,
  primaryColor,
  successColor,
  warningColor,
} from 'assets/jss/material-dashboard-react';

const headerStyle = makeStyles((theme: Theme) =>
createStyles({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '10px',
    zIndex: 1029,
    color: '#555555',
    border: '0',
    borderRadius: '3px',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '50px',
    display: 'block',
  },
  container: {
    ...container,
    minHeight: '50px',
  },
  flex: {
    flex: 1,
  },
  title: {
    ...defaultFont,
    lineHeight: '30px',
    fontSize: '18px',
    color: 'inherit',
    margin: 0,
    display: 'inline-block'
  },
  highlighter: {
    margin: 0,
    borderTop: "2px solid",
    color: primaryColor,
  },
  appResponsive: {
    top: '8px',
  },
  primary: {
    backgroundColor: primaryColor,
    color: '#FFFFFF',
    ...defaultBoxShadow,
  },
  info: {
    backgroundColor: infoColor,
    color: '#FFFFFF',
    ...defaultBoxShadow,
  },
  success: {
    backgroundColor: successColor,
    color: '#FFFFFF',
    ...defaultBoxShadow,
  },
  warning: {
    backgroundColor: warningColor,
    color: '#FFFFFF',
    ...defaultBoxShadow,
  },
  danger: {
    backgroundColor: dangerColor,
    color: '#FFFFFF',
    ...defaultBoxShadow,
  },
}),
);

export default headerStyle;
