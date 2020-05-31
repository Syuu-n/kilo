import {
  IconButton,
  Snackbar as Snack,
  SvgIcon,
  makeStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import snackbarContentStyle from 'assets/jss/material-dashboard-react/snackbarContentStyle';
import * as cx from 'classnames';
import * as React from 'react';

const useStyles = makeStyles(() => ({
  ...snackbarContentStyle
}));

type ColorType = 'info' | 'success' | 'warning' | 'danger' | 'primary';

interface Props {
  message: React.ReactNode;

  closeNotification: () => void;

  color?: ColorType;
  close?: boolean;
  icon?: typeof SvgIcon;
  place: 'tl' | 'tr' | 'tc' | 'br' | 'bl' | 'bc';
  open: boolean;
}

const Snackbar: React.SFC<Props> = props => {
  const { message, color, close, icon, place, open } = props;
  const classes = useStyles();

  let action: JSX.Element[] = [];

  if (close !== undefined) {
    const iconButton = (
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={props.closeNotification}
      >
        <Close className={classes.close} />
      </IconButton>
    );

    action = [iconButton];
  }

  const messageClasses = cx({
    [classes.iconMessage]: icon !== undefined,
  });

  return (
    <Snack
      anchorOrigin={{
        vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
        horizontal:
          place.indexOf('l') !== -1
            ? 'left'
            : place.indexOf('c') !== -1
              ? 'center'
              : 'right',
      }}
      open={open}
      message={
        <div>
          {props.icon && <props.icon className={classes.icon} />}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      ContentProps={{
        classes: {
          root: cx(classes.root, color && classes[color]),
          message: classes.message,
        },
      }}
    />
  );
};

export default Snackbar;
