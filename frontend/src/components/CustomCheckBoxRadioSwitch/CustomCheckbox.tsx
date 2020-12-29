import {
  Checkbox,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import checkboxStyle from 'assets/jss/material-dashboard-react/customCheckBoxRadioSwitchStyle';
import * as React from 'react';

type ColorType =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'rose'

interface Props {
  checked: boolean;
  onClick?: any;
  color?: ColorType;
}

const CustomCheckbox: React.FC<Props> = ({ checked, onClick, color="primary" }) => {
  const classes = checkboxStyle();

  return (
    <Checkbox
      checked={checked}
      onClick={onClick ? () => onClick() : undefined}
      checkedIcon={<Check className={classes.checkedIcon} />}
      icon={<Check className={classes.uncheckedIcon} />}
      classes={{
        checked: classes[color],
      }}
    />
  );
}

export default CustomCheckbox;