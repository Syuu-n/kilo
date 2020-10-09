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
      <p>{labelText}</p>
      { confirm ? (
        <p>{value}</p>
      ) : (
        <CustomInput
          // formControlProps={{
          //   className: `${labelText}-${inputType}-input`
          // }}
          inputProps={{
            type: inputType,
            onChange: handleChange,
            value: value,
          }}
        />
      )}
    </div>
  );
};

export default AdminFormInput;