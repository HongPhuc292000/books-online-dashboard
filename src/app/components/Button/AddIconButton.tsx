import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { CommonDialogEnum } from "types/enums";

interface AddIconButtonProps {
  onAddItem: Function;
  permited: boolean;
}

const AddIconButton = memo(({ onAddItem, permited }: AddIconButtonProps) => {
  const { t } = useTranslation();
  return (
    <>
      {permited ? (
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
      ) : null}
    </>
  );
});

export default AddIconButton;
