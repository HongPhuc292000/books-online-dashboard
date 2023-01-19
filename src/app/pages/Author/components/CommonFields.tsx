import { Grid, TextField } from "@mui/material";
import RoundMediaCard from "app/components/MediaCard/RoundMediaCard";
import { SimpleDatePicker } from "app/components/DatePicker/SimpleDatePicker";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ImageFileType } from "types";

interface CommonFieldsProps {
  formik: any;
  image: ImageFileType;
  setImage: Function;
}

const CommonFields = memo(({ formik, image, setImage }: CommonFieldsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container spacing={2} alignItems="end">
        <Grid item>
          <RoundMediaCard url={image.url} setImage={setImage} />
        </Grid>
        <Grid item flex={1}>
          <TextField
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("author.name")}*`}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && t(formik.errors.name as string)}
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
      <TextField
        id="description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        fullWidth
        sx={{ mb: 2 }}
        label={`${t("author.description")}`}
        error={formik.touched.description && !!formik.errors.description}
        helperText={
          formik.touched.description && t(formik.errors.description as string)
        }
        multiline
        rows={5}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
});

export default CommonFields;
