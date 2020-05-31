import { IconButton, makeStyles } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import iconButtonStyle from 'assets/jss/material-dashboard-react/iconButtonStyle';
import * as React from 'react';

const useStyles = makeStyles(() => ({
  ...iconButtonStyle
}));

interface Props {
  color?:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'rose'
    | 'white'
    | 'simple';
  customClass?: string;
  disabled?: boolean;
}

const IconCustomButton: React.SFC<
  Props & Pick<IconButtonProps, Exclude<keyof IconButtonProps, keyof Props>>
> = props => {
  const { color, children, customClass, ...rest } = props;
  const classes = useStyles();

  return (
    <IconButton
      {...rest}
      className={
        classes.button +
        (color ? ' ' + classes[color] : '') +
        (customClass ? ' ' + customClass : '')
      }
    >
      {children}
    </IconButton>
  );
};

export default IconCustomButton;
