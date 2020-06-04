import {
  Checkbox,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import checkboxStyle from 'assets/jss/material-dashboard-react/customCheckBoxRadioSwitchStyle';
import * as React from 'react';

interface Props {
  checked: boolean;
}

const CustomCheckbox: React.FC<Props> = ({ checked }) => {
  const [check, setChecked] = React.useState(checked);
  const classes = checkboxStyle();

  const handleToggle = () => {
    setChecked(!check);
  }

  return (
    <Checkbox
      checked={check}
      onClick={handleToggle}
      checkedIcon={<Check className={classes.checkedIcon} />}
      icon={<Check className={classes.uncheckedIcon} />}
      classes={{
        checked: classes.checked,
      }}
    />
  );
}

export default CustomCheckbox;