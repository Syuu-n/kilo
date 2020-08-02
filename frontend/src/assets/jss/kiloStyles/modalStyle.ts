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
  }
}));

export default modalStyle;