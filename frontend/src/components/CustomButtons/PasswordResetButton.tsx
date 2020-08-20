import * as React from 'react';
import {
  Button,
  PasswordResetModal,
} from 'components';
import passwordResetButtonStyle from 'assets/jss/kiloStyles/passwordResetButtonStyle';

const PasswordResetButton: React.FC = () => {
  const classes = passwordResetButtonStyle();
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <div className={classes.buttonWrap}>
      <Button
        customClass={classes.resetButton}
        color='primary'
        onClick={() => setOpenModal(true)}
      >
        変更
      </Button>
      <PasswordResetModal
        open={openModal}
        closeFunc={() => {setOpenModal(false)}}
      />
    </div>
  );
};

export default PasswordResetButton;