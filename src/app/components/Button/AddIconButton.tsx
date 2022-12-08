import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { CommonDialogEnum } from "types/enums";

interface AddIconButtonProps {
  onAddItem: (action: string, id?: string) => void;
}

const AddIconButton = memo(({ onAddItem }: AddIconButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{
        height: { sm: "100%" },
        mt: { xs: 2, sm: 0 },
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
