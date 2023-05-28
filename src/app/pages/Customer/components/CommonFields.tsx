import { Grid, TextField } from "@mui/material";
import RoundMediaCard from "app/components/MediaCard/RoundMediaCard";
import { SimpleDatePicker } from "app/components/DatePicker/SimpleDatePicker";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { ImageFileType } from "types";
import RadioSingleItem from "app/components/RadioSelect/RadioSingleItem";
import { GenderEnum } from "types/enums";

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
          <RoundMediaCard url={image.url} setImage={setImage} mb={2} />
        </Grid>
        <Grid item flex={1}>
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
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            fullWidth
            autoComplete="off"
            sx={{ mb: 2 }}
            label={t("member.username")}
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
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
            inputProps={{
              autoComplete: "off",
            }}
            sx={{ mb: 2 }}
            label={t("member.password")}
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={t("member.email")}
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
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <RadioSingleItem
            allItems={Object.keys(GenderEnum)}
            field="gender"
            isRow={true}
            selected={formik.values.gender}
            setFieldValue={formik.setFieldValue}
          />
        </Grid>
      </Grid>
    </>
  );
});

export default CommonFields;
