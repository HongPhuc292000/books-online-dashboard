import { useSnackbar } from "notistack";

const useToastMessage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showErrorSnackbar = (title: string) => {
    enqueueSnackbar(title, { variant: "error" });
  };

  const showSuccessSnackbar = (title: string) => {
    enqueueSnackbar(title, { variant: "success" });
  };

  const showInfoSnackbar = (title: string) => {
    enqueueSnackbar(title, { variant: "info" });
  };

  return {
    showErrorSnackbar,
    showSuccessSnackbar,
    showInfoSnackbar,
    closeSnackbar,
  };
};

export default useToastMessage;
