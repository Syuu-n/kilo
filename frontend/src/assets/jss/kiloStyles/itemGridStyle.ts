import { makeStyles, createStyles } from '@material-ui/core/styles';

const itemGridStyle = makeStyles(() =>
createStyles({
  grid: {
    padding: '0 15px !important',
  },
  noPadding: {
    [`@media (max-width: 600px)`]: {
      padding: '0 !important',
    },
  },
}));

export default itemGridStyle;