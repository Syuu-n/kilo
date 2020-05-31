import {
  Checkbox,
  makeStyles
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import checkboxStyle from 'assets/jss/material-dashboard-react/customCheckBoxRadioSwitchStyle';
import * as React from 'react';

const useStyles = makeStyles(() => ({
  ...checkboxStyle
}));

interface Props {
  checked: boolean;
}

interface State {
  checked: boolean;
}

class CustomCheckbox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { checked: props.checked };
    this.handleToggle = this.handleToggle.bind(this);
  }

  render() {
    const { checked } = this.props;
    const classes = useStyles();

    return (
      <Checkbox
        checked={checked}
        onClick={this.handleToggle}
        checkedIcon={<Check className={classes.checkedIcon} />}
        icon={<Check className={classes.uncheckedIcon} />}
        classes={{
          checked: classes.checked,
        }}
      />
    );
  }

  private handleToggle() {
    this.setState({ checked: !this.state.checked });
  }
}

export default CustomCheckbox;