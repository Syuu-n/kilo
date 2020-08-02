import * as React from 'react';
import {
  Button,
  Modal,
} from 'components';
// import passwordResetButtonStyle from 'assets/jss/kiloStyles/passwordResetButtonStyle';

const PasswordResetButton: React.FC = () => {
  // const classes = passwordResetButtonStyle();
  const [openModal, setOpenModal] = React.useState(false);
  const content = 
    <h5>本当によろしいですか？</h5>;

  return (
    <div>
      <Button
        color='primary'
        onClick={() => setOpenModal(true)}
      >
        変更
      </Button>
      <Modal
        open={openModal}
        headerTitle="パスワード変更"
        content={content}
        submitText="変更"
        submitFunc={() => {console.log('Submit!!')}}
        closeFunc={() => {setOpenModal(false)}}
      />
    </div>
  );
};

export default PasswordResetButton;