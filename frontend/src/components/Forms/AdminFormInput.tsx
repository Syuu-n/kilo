import * as React from 'react';
import { CustomInput } from 'components';
import { FormControlProps } from '@material-ui/core/FormControl';

interface Props {
  labelText?: string;
  inputType?: "email" | "password" | "tel" | "text";
  onChangeFunc?: Function;
  value?: any;
  placeholder?: string;
  confirm?: boolean;
  customClass?: string;
  formControlProps?: FormControlProps;
  errorText?: string;
  required?: boolean;
};

const AdminFormInput: React.SFC<Props> = (props) => {
  const { inputType, labelText, onChangeFunc, value, placeholder, confirm, customClass, formControlProps, required, errorText } = props;

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
        success
        noIcon={true}
        error={errorText ? true : false}
        errorText={errorText}
      />
    </div>
  );
};

export default AdminFormInput;