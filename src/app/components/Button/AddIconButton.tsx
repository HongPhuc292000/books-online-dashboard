import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { CommonDialogEnum } from "types/enums";

interface AddIconButtonProps {
  onAddItem: Function;
}

const AddIconButton = memo(({ onAddItem }: AddIconButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{
        height: 40,
      }}
      onClick={() => {
        onAddItem(CommonDialogEnum.ADD);
      }}
      endIcon={<AddCircleIcon />}
    >
      {t("common.addNew")}
    </Button>
  );
});

export default AddIconButton;
