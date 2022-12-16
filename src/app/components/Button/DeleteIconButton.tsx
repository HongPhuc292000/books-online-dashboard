import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { CommonDialogEnum } from "types/enums";

interface DeleteIconButtonProps {
  onDelete: (action: string, id?: string) => void;
  id: string;
}

export const DeleteIconButton = memo(
  ({ onDelete, id }: DeleteIconButtonProps) => {
    const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      onDelete(CommonDialogEnum.DELETE, id);
      e.stopPropagation();
    };

    return (
      <IconButton color="error" onClick={(e) => handleClickDelete(e)}>
        <DeleteIcon />
      </IconButton>
    );
  }
);
