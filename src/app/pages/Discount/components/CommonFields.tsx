import {
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { SimpleDatePicker } from "app/components/DatePicker";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { DiscountTypeEnum } from "types/enums";

interface CommonFieldsProps {
  formik: any;
}

const CommonFields = memo(({ formik }: CommonFieldsProps) => {
  const { t } = useTranslation();

  console.log(formik.values);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="code"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("discount.code")}*`}
            error={formik.touched.code && !!formik.errors.code}
            helperText={formik.touched.code && t(formik.errors.code as string)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" shrink>
              {`${t("discount.type")}*`}
            </InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={formik.values.type}
              label={`${t("discount.type")}*`}
              onChange={(e) => {
                formik.setFieldValue("type", e.target.value);
              }}
            >
              {Object.keys(DiscountTypeEnum).map((type) => (
                <MenuItem key={type} value={type}>
                  {t(`enums.${type}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label={`${t("discount.value")}*`}
            id="value"
            name="value"
            type="number"
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
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SimpleDatePicker
            formik={formik}
            field="exp"
            tableName="discount"
            required={true}
            disablePast={true}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            name="enable"
            onChange={formik.handleChange}
            value={formik.values.amount}
            sx={{ mb: 2 }}
            control={<Switch />}
            label={t("common.enable")}
          />
        </Grid>
      </Grid>
    </>
  );
});

export default CommonFields;
