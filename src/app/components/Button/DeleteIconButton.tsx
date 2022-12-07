import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteIconButtonProps {
  onDelete: (id: string) => void;
  id: string;
}

export const DeleteIconButton = memo(
  ({ onDelete, id }: DeleteIconButtonProps) => {
    const handleClickDelete = () => {
      onDelete(id);
    };

    return (
      <IconButton color="error" onClick={handleClickDelete}>
        <DeleteIcon />
      </IconButton>
    );
  }
);
