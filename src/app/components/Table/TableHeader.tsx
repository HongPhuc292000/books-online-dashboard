import { TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TableHeaderLabel } from "../Label";

export interface HeaderProps {
  name: string;
  minWidth?: number;
  isCommonLabel?: boolean;
  align?: "right" | "center" | "right";
  format?: (value: number) => string;
  width?: number;
}

interface TableHeaderProps {
  tableName: string;
  listHeaders: HeaderProps[];
}

const TableHeader = memo(({ tableName, listHeaders }: TableHeaderProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <TableHead>
      <TableRow>
        {listHeaders.map((header) => (
          <TableCell
            key={header.name}
            align={header.align}
            sx={{
              minWidth: header.minWidth,
              backgroundColor: theme.palette.grey[300],
              width: header.width,
              "&:last-child": {
                borderTopRightRadius: 8,
              },
            }}
          >
            <TableHeaderLabel>
              {header?.isCommonLabel
                ? t(`commonTableHeader.${header.name}`)
                : t(`${tableName}.${header.name}`)}
            </TableHeaderLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
});

export default TableHeader;
