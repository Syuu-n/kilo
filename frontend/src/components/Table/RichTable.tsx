import * as React from 'react';
import { 
  TableContainer, Table, TableBody, TableCell, TableRow, TableFooter, TablePagination, TableHead,
} from '@material-ui/core';
import { RichTableActions } from 'components';
import richTableStyle from 'assets/jss/kiloStyles/richTableStyle';
import tablePaginationStyle from 'assets/jss/kiloStyles/tablePaginationStyle';

interface Props {
  tableHead?: string[];
  rows: (string | number | JSX.Element[])[][];
  tableHeaderColor?:
    | 'warning'
    | 'primary'
    | 'danger'
    | 'success'
    | 'info'
    | 'rose'
    | 'gray';
}

const RichTable: React.FC<Props> = ({ tableHead, rows, tableHeaderColor="primary"}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes = richTableStyle();
  const tablePaginationClasses = tablePaginationStyle();

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table className={classes.table}>
        { tableHead && (
          <TableHead>
            <TableRow>
              { tableHead.map((th, thKey) => (
                <TableCell
                  className={classes.tableCell + ' ' + classes.tableHeadCell + ' ' + classes[tableHeaderColor + 'TableHeader']}
                  key={thKey}
                >
                  {th}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {( rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, rowKey) =>
            <TableRow key={rowKey}>
              { row.map((r, cellKey) => (
                  <TableCell key={cellKey} className={classes.tableCell}>
                    {r}
                  </TableCell>
              ))}
            </TableRow>
          )}
          { emptyRows > 0 && (
            <TableRow style={{ height: 59 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, { label: '全て', value: -1}]}
              colSpan={6}
              count={rows.length}
              labelRowsPerPage={"ページごとの行"}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={RichTableActions}
              classes={tablePaginationClasses}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default RichTable;