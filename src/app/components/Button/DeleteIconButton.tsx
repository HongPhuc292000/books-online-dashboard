import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { CommonDialogEnum } from "types/enums";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeleteIconButtonProps {
  onDelete: (action: string, id?: string) => void;
  id: string;
  permited: boolean;
}

export const DeleteIconButton = memo(
  ({ onDelete, id, permited }: DeleteIconButtonProps) => {
    const { t } = useTranslation();
    const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      onDelete(CommonDialogEnum.DELETE, id);
      e.stopPropagation();
    };

    return (
      <Tooltip title={permited ? "" : t("common.deleteDenied")}>
        <span>
          <IconButton
            disabled={!permited}
            color="error"
            onClick={(e) => handleClickDelete(e)}
          >
            <DeleteIcon />
          </IconButton>
        </span>
      </Tooltip>
    );
  }
);
