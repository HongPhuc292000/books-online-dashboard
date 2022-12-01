import { TableCell, TableHead, TableRow } from "@mui/material";
import { memo } from "react";
import { TableLabel } from "../Label";

export interface HeaderProps {
  name: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface TableHeaderProps {
  listHeaders: HeaderProps[];
}

const TableHeader = memo(({ listHeaders }: TableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        {listHeaders.map((header) => (
          <TableCell
            key={header.name}
            align={header.align}
            style={{ minWidth: header.minWidth }}
          >
            <TableLabel>{header.label}</TableLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
});

export default TableHeader;
