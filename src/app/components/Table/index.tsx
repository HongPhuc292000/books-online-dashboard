import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHeader, { HeaderProps } from "./TableHeader";
import { Filter } from "types";
import { memo } from "react";

interface StickyHeadTableProps {
  tableName: string;
  headers: HeaderProps[];
  renderItem: (item: any) => any[];
  total?: number;
  items?: any[];
  filter?: any;
  onFetchDataForPage?: ({ page, size }: Filter) => void;
}

const StickyHeadTable = memo(
  ({
    tableName,
    headers,
    renderItem,
    items = [],
    total = 0,
    filter,
    onFetchDataForPage,
  }: StickyHeadTableProps) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(filter?.size || 10);

    const handleChangePage = (event: unknown, newPage: number) => {
      if (onFetchDataForPage) {
        setPage(newPage);
        onFetchDataForPage({ ...filter, page: newPage, size: rowsPerPage });
      }
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const newRowPerPage = +event.target.value;
      setRowsPerPage(newRowPerPage);
      if (onFetchDataForPage) {
        onFetchDataForPage({ ...filter, page: 0, size: newRowPerPage });
      }
    };

    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "66vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHeader listHeaders={headers} tableName={tableName} />
            <TableBody>
              {items.map((item, index) => {
                return (
                  <TableRow hover key={`item${index}`}>
                    {renderItem(item).map((col, index) => {
                      return (
                        <TableCell
                          key={`item${index}`}
                          align={headers[index].align}
                        >
                          {col}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
);

export default StickyHeadTable;
