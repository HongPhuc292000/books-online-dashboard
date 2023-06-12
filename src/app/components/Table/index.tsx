import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { memo, useEffect, useState } from "react";
import { Filter } from "types";
import TableHeader, { HeaderProps } from "./TableHeader";

interface StickyHeadTableProps {
  tableName: string;
  headers: HeaderProps[];
  renderItem: (item: any, index: number) => any[];
  permited?: boolean;
  total?: number;
  items?: any[];
  pageResponse?: number;
  sizeResponse?: number;
  filter?: any;
  onFetchDataForPage?: ({ page, size }: Filter) => void;
  onSelectRow?: (id: string) => void;
}

const StickyHeadTable = memo(
  ({
    tableName,
    headers,
    renderItem,
    permited = false,
    items = [],
    total = 0,
    pageResponse = 0,
    sizeResponse = 10,
    filter,
    onFetchDataForPage,
    onSelectRow,
  }: StickyHeadTableProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
      setPage(0);
      if (onFetchDataForPage) {
        onFetchDataForPage({ ...filter, page: 0, size: newRowPerPage });
      }
    };

    useEffect(() => {
      setPage(pageResponse);
    }, [pageResponse]);

    useEffect(() => {
      setRowsPerPage(sizeResponse);
    }, [sizeResponse]);

    return (
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 3 }}>
        <TableContainer sx={{ overflowX: "auto", height: "52vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHeader listHeaders={headers} tableName={tableName} />
            <TableBody>
              {items.map((item, index) => {
                return (
                  <TableRow
                    sx={{
                      "&:hover": {
                        cursor: onSelectRow ? "pointer" : "default",
                      },
                    }}
                    hover
                    key={`item${index}`}
                    onClick={() => {
                      if (onSelectRow && permited) {
                        onSelectRow(item._id);
                      }
                    }}
                  >
                    {renderItem(
                      item,
                      index + 1 + pageResponse * sizeResponse
                    ).map((col, index) => {
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
