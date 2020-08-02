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
import passwordResetButtonStyle from 'assets/jss/kiloStyles/modalStyle';

interface Props {
  open: boolean;
  headerTitle?: string;
  content?: React.ReactNode;
  submitText?: string;
  submitFunc?: any;
  closeFunc?: any;
}

const Modal: React.FC<Props> = (props) => {
  const { open, headerTitle, content, submitText, submitFunc, closeFunc } = props;
  const [openModal, setOpenModal] = React.useState(false);
  const classes = passwordResetButtonStyle();
  const doSubmit = () => {
    submitFunc();
    closeFunc();
  }

  React.useEffect(() => {
    setOpenModal(open)
  }, [open])

  return (
    <div>
      <Dialog
        open={openModal}
        keepMounted
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <DialogTitle
          id="modal-header-title"
          className={classes.modalHeader}
          disableTypography
        >
          <Button
            customClass={classes.closeButton}
            color='transparent'
            key="Close"
            onClick={() => closeFunc()}
          >
            <Close/>
          </Button>
          <h4 className={classes.modalTitle}>{headerTitle}</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
        >
          {content}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => closeFunc()}
          >
            キャンセル
          </Button>
          <Button
            color='primary'
            onClick={() => doSubmit()}
          >
            {submitText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;