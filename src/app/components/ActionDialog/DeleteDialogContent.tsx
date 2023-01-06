import { Box, Button, Grid, Typography } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface DeleteDialogContentProps {
  content: string;
  onAcceptDelete: Function;
  onCancel: Function;
}

const DeleteDialogContent = memo(
  ({ content, onAcceptDelete, onCancel }: DeleteDialogContentProps) => {
    const { t } = useTranslation();
    return (
      <Box>
        <Typography>{content}</Typography>
        <Grid container justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 2 }}
            onClick={() => onAcceptDelete()}
          >
            {t("common.accept")}
          </Button>
          <Button variant="contained" color="error" onClick={() => onCancel()}>
            {t("common.cancel")}
          </Button>
        </Grid>
      </Box>
    );
  }
);

export default DeleteDialogContent;
