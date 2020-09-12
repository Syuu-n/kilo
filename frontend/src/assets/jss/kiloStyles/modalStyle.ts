import { makeStyles, createStyles } from '@material-ui/core/styles';
import { defaultFont } from 'assets/jss/material-dashboard-react';

const modalStyle = makeStyles(() => 
createStyles({
  modal: {
    padding: '0 15px',
    ...defaultFont,
  },
  modalHeader: {
    display: 'flex',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: 0,
    margin: '0 20px 0 0',
  },
  modalTitle: {
    margin: 0,
  },
  cancelButton: {
    minWidth: '120px',
  },
  submitButton: {
    minWidth: '120px',
  },
  buttonContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}));

export default modalStyle;