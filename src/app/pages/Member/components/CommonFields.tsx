import { Grid, TextField } from "@mui/material";
import MediaCard from "app/components/MediaCard";
import { SimpleDatePicker } from "app/components/DatePicker";
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
          <MediaCard url={image.url} setImage={setImage} />
        </Grid>
        <Grid item flex={1}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            fullWidth
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
          <TextField
            id="fullname"
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("member.fullname")}*`}
            error={formik.touched.fullname && !!formik.errors.fullname}
            helperText={
              formik.touched.fullname && t(formik.errors.fullname as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("member.username")}*`}
            error={formik.touched.username && !!formik.errors.username}
            helperText={
              formik.touched.username && t(formik.errors.username as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("member.password")}*`}
            error={formik.touched.password && !!formik.errors.password}
            helperText={
              formik.touched.password && t(formik.errors.password as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
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
      </Grid> */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("member.email")}*`}
            error={formik.touched.email && !!formik.errors.email}
            helperText={
              formik.touched.email && t(formik.errors.email as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <SimpleDatePicker
            formik={formik}
            field="birthday"
            tableName="member"
            required={true}
          />
        </Grid>
      </Grid>
    </>
  );
});

export default CommonFields;
