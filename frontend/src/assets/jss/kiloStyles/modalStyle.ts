import { makeStyles, createStyles } from '@material-ui/core/styles';

const modalStyle = makeStyles(() => 
createStyles({
  modalHeader: {
    display: 'flex',
  },
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: 0,
    margin: 0,
    padding: '10px',
  },
  modalTitle: {
    margin: 0,
  },
  cancelButton: {
    minWidth: '120px',
  },
  submitButton: {
    minWidth: '120px',
    marginRight: '50px',
  },
}));

export default modalStyle;