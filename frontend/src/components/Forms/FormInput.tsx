import * as React from 'react';
import { CustomInput } from 'components';
import { FormControlProps } from '@material-ui/core/FormControl';

interface Props {
  labelText?: string;
  inputType?: "email" | "password" | "tel" | "text" | "number";
  onChangeFunc?: Function;
  value?: any;
  placeholder?: string;
  confirm?: boolean;
  customClass?: string;
  formControlProps?: FormControlProps;
  errorText?: string;
  required?: boolean;
  rowsMin?: number;
  rowsMax?: number;
};

const FormInput: React.SFC<Props> = (props) => {
  const { inputType, labelText, onChangeFunc, value, placeholder, confirm, customClass, formControlProps, required, errorText, rowsMin, rowsMax } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeFunc) {
      onChangeFunc(event.currentTarget.value);
    };
  };

  return (
    <div className={customClass ? ' ' + customClass : ''}>
      <CustomInput
        labelText={labelText}
        inputProps={{
          type: inputType,
          onChange: handleChange,
          value: value,
          placeholder: placeholder,
        }}
        formControlProps={{
          disabled: confirm ? true : false,
          fullWidth: true,
          required: required,
          error: errorText ? true : false,
          ...formControlProps,
        }}
        noIcon={true}
        error={errorText ? true : false}
        errorText={errorText}
        rowsMin={rowsMin}
        rowsMax={rowsMax}
      />
    </div>
  );
};

export default FormInput;