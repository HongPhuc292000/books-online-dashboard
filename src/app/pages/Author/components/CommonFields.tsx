import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { SimpleDatePicker } from "app/components/DatePicker";
import { SimpleTextField } from "app/components/TextField";
import React, { memo, useEffect, useState } from "react";

interface CommonFieldsProps {
  formik: any;
  image: File | null;
  setImage: Function;
}

const CommonFields = memo(({ formik, image, setImage }: CommonFieldsProps) => {
  const [previewImage, setPreviewImage] = useState<string>();

  useEffect(() => {
    if (!image) {
      setPreviewImage(undefined);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(image);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setImage(e.target.files[0]);
          }
        }}
      />
      <img src={previewImage} />
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
