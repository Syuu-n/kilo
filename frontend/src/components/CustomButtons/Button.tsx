import { Button, makeStyles } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import buttonStyle from 'assets/jss/material-dashboard-react/buttonStyle';
import * as cx from 'classnames';
import * as React from 'react';

const useStyles = makeStyles(() => ({
  ...buttonStyle
}));

type ColorType =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'rose'
  | 'white'
  | 'simple'
  | 'transparent';

interface Props {
  color?: ColorType;
  round?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

const RegularButton: React.SFC<
  Props & Pick<ButtonProps, Exclude<keyof ButtonProps, keyof Props>>
> = props => {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    ...rest
  } = props;

  const classes = useStyles();

  const btnClasses = cx(color && classes[color], {
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
  });

  return (
    <Button {...rest} className={classes.button + ' ' + btnClasses}>
      {children}
    </Button>
  );
};

export default RegularButton;
