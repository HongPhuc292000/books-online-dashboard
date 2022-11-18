import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SimpleTextFieldProps {
  formik: any;
  field: string;
  type?: string;
}

export const SimpleTextField = ({
  formik,
  field,
  type = "text",
}: SimpleTextFieldProps) => {
  const { t } = useTranslation();
  return (
    <TextField
      {...formik.getFieldProps(field)}
      type={type}
      fullWidth
      label={t(`formInput.${field}`)}
      margin="normal"
      error={formik.touched[field] && !!formik.errors[field]}
      helperText={formik.touched[field] && t(formik.errors[field] as string)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
