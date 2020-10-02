import { IconButton, Tooltip, TooltipProps } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import tooltipButtonStyle from 'assets/jss/kiloStyles/tooltipButtonStyle';
import * as React from 'react';

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
  tooltipTitle?: string;
  tooltipPlacement?: TooltipProps["placement"];
}

const TooltipButton: React.SFC<
  Props & Pick<IconButtonProps, Exclude<keyof IconButtonProps, keyof Props>>
> = props => {
  const { color, children, customClass, tooltipTitle, tooltipPlacement, ...rest } = props;
  const classes = tooltipButtonStyle();

  return (
    <Tooltip
      title={tooltipTitle ? tooltipTitle : ""}
      placement={tooltipPlacement ? tooltipPlacement : "top"}
    >
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
    </Tooltip>
  );
};

export default TooltipButton;
