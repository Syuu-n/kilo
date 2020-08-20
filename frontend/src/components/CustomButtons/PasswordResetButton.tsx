import * as React from 'react';
import {
  Button,
  PasswordResetModal,
} from 'components';
import passwordResetButtonStyle from 'assets/jss/kiloStyles/passwordResetButtonStyle';

interface Props {
  email: string;
}

const PasswordResetButton: React.FC<Props> = (props) => {
  const classes = passwordResetButtonStyle();
  const [openModal, setOpenModal] = React.useState(false);
  const { email } = props;

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
        email={email}
      />
    </div>
  );
};

export default PasswordResetButton;