import {
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import SingleDateAndTimePicker from "app/components/DatePicker/SingleDateAndTimePicker";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { DiscountTypeEnum } from "types/enums";

interface CommonFieldsProps {
  formik: any;
  disabled?: boolean;
}

const CommonFields = memo(({ formik, disabled = false }: CommonFieldsProps) => {
  const { t } = useTranslation();

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="customerName"
            name="customerName"
            value={formik.values.customerName}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("order.customerName")}*`}
            error={formik.touched.customerName && !!formik.errors.customerName}
            helperText={
              formik.touched.customerName &&
              t(formik.errors.customerName as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            fullWidth
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            sx={{ mb: 2 }}
            label={`${t("member.phoneNumber")}*`}
            error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            helperText={
              formik.touched.phoneNumber &&
              t(formik.errors.phoneNumber as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label={`${t("discount.value")}*`}
            id="value"
            name="value"
            type="number"
            disabled={disabled}
            value={formik.values.value}
            onChange={formik.handleChange}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            fullWidth
            sx={{ mb: 2 }}
            error={formik.touched.value && !!formik.errors.value}
            helperText={
              formik.touched.value && t(formik.errors.value as string)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formik.values.type === DiscountTypeEnum.PERCENT
                    ? "%"
                    : "VND"}
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t("commonTableHeader.amount")}
            id="amount"
            name="amount"
            type="number"
            disabled={disabled}
            value={formik.values.amount}
            onChange={formik.handleChange}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            fullWidth
            sx={{ mb: 2 }}
            error={formik.touched.amount && !!formik.errors.amount}
            helperText={
              formik.touched.amount && t(formik.errors.amount as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid> */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SingleDateAndTimePicker
            formik={formik}
            field="exp"
            tableName="discount"
            required={true}
            disablePast={true}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            name="enable"
            disabled={disabled}
            onChange={formik.handleChange}
            sx={{ mb: 2 }}
            control={<Switch checked={formik.values.enable} />}
            label={t("common.enable")}
          />
        </Grid>
      </Grid>
    </Paper>
  );
});

export default CommonFields;