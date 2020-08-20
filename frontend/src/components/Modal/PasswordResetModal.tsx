import * as React from 'react';
import { Modal } from 'components';

interface Props {
  open: boolean;
  closeFunc: any;
}

const PasswordResetModal: React.FC<Props> = (props) => {
  const { open, closeFunc } = props;
  const content = 
  <h5>本当によろしいですか？</h5>;

  return (
    <Modal
      open={open}
      headerTitle="パスワード変更"
      content={content}
      submitText="変更"
      submitFunc={() => {console.log('Submit!!')}}
      closeFunc={closeFunc}
    />
  );
};

export default PasswordResetModal;