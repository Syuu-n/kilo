import * as React from 'react';
import { CustomInput } from 'components';

interface Props {
  labelText?: string;
  inputType?: "email" | "password" | "tel" | "text";
  onChangeFunc?: Function;
  value?: any;
  confirm?: boolean;
};

const AdminFormInput: React.SFC<Props> = (props) => {
  const { inputType, labelText, onChangeFunc, value, confirm } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeFunc) {
      onChangeFunc(event.currentTarget.value);
    };
  };

  return (
    <div>
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
      />
    </div>
  );
};

export default AdminFormInput;