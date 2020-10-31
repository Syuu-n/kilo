import { FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';
import { FormControlProps } from '@material-ui/core/FormControl';
import { Check, Clear } from '@material-ui/icons';
import customInputStyle from 'assets/jss/material-dashboard-react/customInputStyle';
import * as cx from 'classnames';
import * as React from 'react';

interface Props {
  labelText?: React.ReactNode;
  labelProps?: object;
  id?: string;
  inputProps?: object;
  formControlProps?: FormControlProps;
  error?: boolean;
  success?: boolean;
  noIcon?: boolean;
  errorText?: string;
  rowsMin?: number;
  rowsMax?: number;
}

const CustomInput: React.SFC<Props> = props => {
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    noIcon,
    errorText,
    rowsMin,
    rowsMax,
  } = props;

  const classes = customInputStyle();

  const labelClasses = cx({
    [' ' + classes.labelRootError]: error,
    [' ' + classes.labelRootSuccess]: success && !error,
  });

  const underlineClasses = cx({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });

  const marginTop = cx({
    [classes.marginTop]: labelText === undefined,
  });

  const formControlClasses = cx(
    formControlProps && formControlProps.className,
    classes.formControl,
  );

  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
        multiline={rowsMin ? true : false}
        rows={rowsMin}
        rowsMax={rowsMax}
      />
      {error && !noIcon ? (
        <Clear className={classes.feedback + ' ' + classes.labelRootError} />
      ) : success && !noIcon ? (
        <Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
      ) : null}
      {error && (
        <FormHelperText>
          {errorText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;
