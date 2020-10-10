import * as React from 'react';
import { CustomInput } from 'components';

interface Props {
  labelText?: string;
  inputType?: "email" | "password" | "tel" | "text";
  onChangeFunc?: Function;
  value?: any;
  confirm?: boolean;
  customClass?: string;
};

const AdminFormInput: React.SFC<Props> = (props) => {
  const { inputType, labelText, onChangeFunc, value, confirm, customClass } = props;

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
        }}
        formControlProps={{
          disabled: confirm ? true : false,
          fullWidth: true,
        }}
        success
        noIcon
      />
    </div>
  );
};

export default AdminFormInput;