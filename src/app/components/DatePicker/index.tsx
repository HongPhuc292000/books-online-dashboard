import { useMediaQuery, useTheme, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { DesktopDatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useTranslation } from "react-i18next";

interface SimpleTextFieldProps {
  formik: any;
  field: string;
  tableName: string;
  required?: boolean;
  disablePast?: boolean;
}

export const SimpleDatePicker = ({
  formik,
  field,
  tableName,
  required = false,
  disablePast = false,
}: SimpleTextFieldProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isMobile ? (
        <Stack>
          <MobileDatePicker
            label={`${t(`${tableName}.${field}`)}${required ? "*" : ""}`}
            value={formik.values[field]}
            inputFormat="DD/MM/YYYY"
            disablePast={!!disablePast}
            onChange={(newValue) => {
              formik.setFieldValue(field, moment(newValue).format(), true);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name={field}
                sx={{ mb: 2 }}
                error={formik.touched[field] && !!formik.errors[field]}
                helperText={
                  formik.touched[field] && t(formik.errors[field] as string)
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Stack>
      ) : (
        <Stack>
          <DesktopDatePicker
            label={`${t(`${tableName}.${field}`)}${required ? "*" : ""}`}
            value={formik.values[field]}
            inputFormat="DD/MM/YYYY"
            disablePast={!!disablePast}
            onChange={(newValue) => {
              if (newValue) {
                formik.setFieldValue(field, moment(newValue).format(), true);
              } else {
                formik.setFieldValue(field, null, true);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name={field}
                sx={{ mb: 2 }}
                error={formik.touched[field] && !!formik.errors[field]}
                helperText={
                  formik.touched[field] && t(formik.errors[field] as string)
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Stack>
      )}
    </>
  );
};
