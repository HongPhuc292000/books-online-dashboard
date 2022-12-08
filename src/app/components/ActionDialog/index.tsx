import * as React from "react";
import {
  Breakpoint,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface ActionDialogProps {
  title: string;
  dialogContent: React.ReactNode;
  onCancel: Function;
  isOpen: boolean;
  maxWidth?: Breakpoint | false;
}

const ActionDialog = React.memo(
  ({
    title,
    dialogContent,
    onCancel,
    isOpen,
    maxWidth = "sm",
  }: ActionDialogProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClose = () => {
      onCancel();
    };

    return (
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth={maxWidth}
      >
        <Grid
          container
          justifyContent="center"
          flexDirection="column"
          sx={{ height: "100%" }}
        >
          <Grid item>
            <DialogTitle>{title}</DialogTitle>
          </Grid>
          <Grid item>
            <DialogContent>{dialogContent}</DialogContent>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
);

export default ActionDialog;
