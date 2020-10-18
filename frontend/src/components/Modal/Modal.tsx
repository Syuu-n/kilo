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
  cancelText?: string;
  cancelFunc?: Function;
  closeFunc: Function;
  disabled?: boolean;
  color?:
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'rose'
  | 'white'
  noSubmit?: boolean;
}

const Modal: React.FC<Props> = (props) => {
  const { open, headerTitle, content, submitText, submitFunc, cancelText, cancelFunc, closeFunc, disabled, color, noSubmit } = props;
  const [isLoaded, setIsLoaded] = React.useState(true);
  const classes = modalStyle();

  const doSubmit = async () => {
    setIsLoaded(false);
    await submitFunc();
    setIsLoaded(true);
    closeFunc();
  }

  return (
    <div>
      <Dialog
        open={open}
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
                onClick={()=> {cancelFunc ? cancelFunc() : closeFunc()}}
              >
                {cancelText ? cancelText : "キャンセル"}
              </Button>
              { !noSubmit && (
                <Button
                  customClass={classes.submitButton}
                  color={color ? color : 'primary'}
                  onClick={() => doSubmit()}
                  disabled={disabled}
                >
                  {submitText}
                </Button>
              )}
            </div>
          ) : (
            <KSpinner color={color ? color : 'primary'}/>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;