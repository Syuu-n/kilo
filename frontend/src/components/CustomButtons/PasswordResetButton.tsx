import * as React from 'react';
import {
  Button,
} from 'components';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import passwordResetButtonStyle from 'assets/jss/kiloStyles/passwordResetButtonStyle';

const PasswordResetButton: React.SFC = () => {
  const [modal, setModal] = React.useState(false);
  const classes = passwordResetButtonStyle();

  return (
    <div>
      <Button
        color='primary'
        onClick={() => setModal(true)}
      >
        変更
      </Button>
      <Dialog
        open={modal}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          className={classes.modalHeader}
          disableTypography
        >
          <Button
            customClass={classes.closeButton}
            color='transparent'
            key="Close"
            onClick={() => setModal(false)}
          >
            <Close/>
          </Button>
          <h4 className={classes.modalTitle}>パスワード変更</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
        >
          <h5>本当によろしいですか？</h5>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModal(false)}
          >
            キャンセル
          </Button>
          <Button
            color='primary'
            onClick={() => setModal(false)}
          >
            変更
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PasswordResetButton;