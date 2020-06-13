import {
  Checkbox,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import checkboxStyle from 'assets/jss/material-dashboard-react/customCheckBoxRadioSwitchStyle';
import * as React from 'react';

interface Props {
  checked: boolean;
  onClick: any;
}

const CustomCheckbox: React.FC<Props> = ({ checked, onClick }) => {
  const classes = checkboxStyle();

  return (
    <Checkbox
      checked={checked}
      onClick={() => onClick()}
      checkedIcon={<Check className={classes.checkedIcon} />}
      icon={<Check className={classes.uncheckedIcon} />}
      classes={{
        checked: classes.checked,
      }}
    />
  );
}

export default CustomCheckbox;