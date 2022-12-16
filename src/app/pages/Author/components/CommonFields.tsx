import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { SimpleDatePicker } from "app/components/DatePicker";
import { SimpleTextField } from "app/components/TextField";
import { memo } from "react";

interface CommonFieldsProps {
  formik: any;
}

const CommonFields = memo(({ formik }: CommonFieldsProps) => {
  return (
    <>
      <SimpleTextField
        formik={formik}
        field="name"
        tableName="author"
        required={true}
      />
      {/* <Stack> */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SimpleDatePicker
            formik={formik}
            field="yearOfBirth"
            tableName="author"
          />
        </Grid>
        <Grid item xs={6}>
          <SimpleDatePicker
            formik={formik}
            field="yearPassed"
            tableName="author"
          />
        </Grid>
      </Grid>
      {/* </Stack> */}
      <SimpleTextField
        formik={formik}
        field="description"
        tableName="author"
        rows={5}
      />
    </>
  );
});

export default CommonFields;
