import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface ActionDialogProps {
  title: string;
  dialogContent: React.ReactNode;
  onCancel: Function;
  isOpen: boolean;
}

const ActionDialog = React.memo(
  ({ title, dialogContent, onCancel, isOpen }: ActionDialogProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClose = () => {
      onCancel();
    };

    return (
      <Dialog fullScreen={fullScreen} open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
      </Dialog>
    );
  }
);

export default ActionDialog;
