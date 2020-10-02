import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import tableStyle from 'assets/jss/material-dashboard-react/tableStyle';
import * as React from 'react';

interface Props {
  tableHeaderColor?:
    | 'warning'
    | 'primary'
    | 'danger'
    | 'success'
    | 'info'
    | 'rose'
    | 'gray';
  tableHead?: string[];
  tableData?: any[][];
}

const CustomTable: React.SFC<Props> = props => {
  const { tableHead, tableData, tableHeaderColor } = props;
  const classes = tableStyle();

  const tableRows =
    tableData &&
    tableData.map((rowProp, rowKey) => {
      const rowCells = rowProp.map((cellProp, cellKey) => (
        <TableCell className={classes.tableCell} key={cellKey}>
          {cellProp}
        </TableCell>
      ));

      return <TableRow key={rowKey}>{rowCells}</TableRow>;
    });

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead && (
          <TableHead>
            <TableRow>
              {tableHead.map((prop, key) => (
                <TableCell
                  className={classes.tableCell + ' ' + classes.tableHeadCell + ' ' + classes[tableHeaderColor + 'TableHeader']}
                  key={key}
                >
                  {prop}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}

        <TableBody>{tableRows}</TableBody>
      </Table>
    </div>
  );
};

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
};

export default CustomTable;
