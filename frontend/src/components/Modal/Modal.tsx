import * as React from 'react';
import {
  Button,
  IconButton,
  KSpinner,
} from 'components';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import modalStyle from 'assets/jss/kiloStyles/modalStyle';

interface Props {
  open: boolean;
  headerTitle?: string;
  content?: React.ReactNode;
  submitText?: string;
  submitFunc: Function;
  closeFunc: Function;
}

const Modal: React.FC<Props> = (props) => {
  const { open, headerTitle, content, submitText, submitFunc, closeFunc } = props;
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const classes = modalStyle();

  const doSubmit = async () => {
    setIsLoaded(false);
    await submitFunc();
    setIsLoaded(true);
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
        classes={{ paper: classes.modal}}
      >
        <DialogTitle
          id="modal-header-title"
          className={classes.modalHeader}
          disableTypography
        >
          <IconButton
            color="white"
            customClass={classes.closeButton}
            key="Close"
            onClick={() => closeFunc()}
          >
            <Close/>
          </IconButton>
          <h4 className={classes.modalTitle}>{headerTitle}</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
        >
          {content}
        </DialogContent>
        <DialogActions className={classes.buttonContainer}>
          { isLoaded ? (
            <div>
              <Button
                customClass={classes.cancelButton}
                onClick={() => closeFunc()}
              >
                キャンセル
              </Button>
              <Button
                customClass={classes.submitButton}
                color='primary'
                onClick={() => doSubmit()}
              >
                {submitText}
              </Button>
            </div>
          ) : (
            <KSpinner/>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;