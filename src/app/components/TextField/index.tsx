import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SimpleTextFieldProps {
  formik: any;
  field: string;
  type?: string;
  tableName: string;
  required?: boolean;
  rows?: number;
}

export const SimpleTextField = ({
  formik,
  field,
  type = "text",
  tableName,
  required = false,
  rows,
}: SimpleTextFieldProps) => {
  const { t } = useTranslation();

  return (
    <TextField
      id={field}
      name={field}
      type={type}
      value={formik.values[field]}
      onChange={formik.handleChange}
      fullWidth
      sx={{ mb: 2 }}
      label={`${t(`${tableName}.${field}`)}${required ? "*" : ""}`}
      error={formik.touched[field] && !!formik.errors[field]}
      helperText={formik.touched[field] && t(formik.errors[field] as string)}
      multiline={!!rows}
      rows={rows}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
