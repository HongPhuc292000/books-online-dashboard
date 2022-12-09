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
      <Stack>
        <SimpleDatePicker
          formik={formik}
          field="yearOfBirth"
          tableName="author"
        />
        <SimpleDatePicker
          formik={formik}
          field="yearPassed"
          tableName="author"
        />
      </Stack>
      <SimpleTextField formik={formik} field="description" tableName="author" />
    </>
  );
});

export default CommonFields;
