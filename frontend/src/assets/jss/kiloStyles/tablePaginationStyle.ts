import { makeStyles, createStyles } from '@material-ui/core';
import {
  defaultFont,
} from 'assets/jss/material-dashboard-react';

const tablePaginationStyle = makeStyles(() =>
createStyles({
  root: {
    ...defaultFont,
  },
}),
);

export default tablePaginationStyle;
