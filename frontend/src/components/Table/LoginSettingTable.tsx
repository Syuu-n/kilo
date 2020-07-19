import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import tableStyle from 'assets/jss/material-dashboard-react/loginSettingTableStyle';
import * as React from 'react';
import { Button } from 'components';

const CustomTable: React.SFC = () => {
  const classes = tableStyle();

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        <TableBody>
          {/* メールアドレス */}
          <TableRow>
            <TableCell className={classes.tableCell}>
              メールアドレス
            </TableCell>
            <TableCell  className={classes.tableCell}>
              <Button
                color='primary'
              >
                変更
              </Button>
            </TableCell>
          </TableRow>
          {/* パスワード */}
          <TableRow>
            <TableCell className={classes.tableCell}>
              パスワード
            </TableCell>
            <TableCell  className={classes.tableCell}>
              <Button
                color='primary'
              >
                変更
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;
