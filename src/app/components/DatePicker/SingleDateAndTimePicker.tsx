import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import { useTranslation } from "react-i18next";

interface SingleDateAndTimePickerProps {
  formik: any;
  field: string;
  tableName: string;
  required?: boolean;
  disablePast?: boolean;
  disabled?: boolean;
}

export default function SingleDateAndTimePicker({
  formik,
  field,
  tableName,
  required = false,
  disablePast = false,
  disabled = false,
}: SingleDateAndTimePickerProps) {
  const { t } = useTranslation();
  return (
    <Stack spacing={3}>
      <DateTimePicker
        label={`${t(`${tableName}.${field}`)}${required ? "*" : ""}`}
        value={formik.values[field]}
        inputFormat="DD/MM/YYYY hh:mm A"
        disablePast={!!disablePast}
        onChange={(newValue) => {
          formik.setFieldValue(field, moment(newValue).format(), true);
        }}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            name={field}
            sx={{ mb: 2 }}
            error={formik.touched[field] && !!formik.errors[field]}
            helperText={
              formik.touched[field] && t(formik.errors[field] as string)
            }
            inputProps={{
              ...params.inputProps,
              placeholder: "",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </Stack>
  );
}
