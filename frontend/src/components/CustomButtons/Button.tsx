import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import buttonStyle from 'assets/jss/material-dashboard-react/buttonStyle';
import * as cx from 'classnames';
import * as React from 'react';

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
  width?: string;
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
    width,
    ...rest
  } = props;

  const classes = buttonStyle();

  const btnClasses = cx(color && classes[color], {
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled
  });

  const widthStyle = {
    width: width
  };

  return (
    <Button {...rest} className={classes.button + ' ' + btnClasses} style={widthStyle}>
      {children}
    </Button>
  );
};

export default RegularButton;
