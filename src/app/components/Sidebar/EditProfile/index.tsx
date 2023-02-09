import { Box, Button, Grid, TextField } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddEditMemberRequest, ImageFileType } from "types";

import { useAppDispatch, useAppSelector } from "app/hooks";
import React from "react";
import {
  defaultValue,
  MemberSchema,
} from "app/pages/Member/components/memberSchema.data";
import { selectAuth } from "app/pages/Auth/slice/selector";
import { useLoading } from "app/hooks/useLoading";
import RoundMediaCard from "app/components/MediaCard/RoundMediaCard";
import { SimpleDatePicker } from "app/components/DatePicker/SimpleDatePicker";
import SelectRoles from "app/pages/Member/components/SelectRoles";
import RadioSingleItem from "app/components/RadioSelect/RadioSingleItem";
import { GenderEnum } from "types/enums";
import { memberActions } from "app/pages/Member/slice";
import { withLoading } from "app/components/HOC/withLinearLoading";
import { authActions } from "app/pages/Auth/slice";

interface EditMemberProps {
  onCloseDialog: () => void;
  setLoading: Function;
}

const EditMember = memo(({ onCloseDialog, setLoading }: EditMemberProps) => {
  const [image, setImage] = useState<ImageFileType>({
    file: null,
    url: "",
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { me, roles } = useAppSelector(selectAuth);
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();

  const handleGetDetailAdmin = () => {
    if (me?._id) {
      dispatch(authActions.getUserInfo(me._id));
    }
  };

  const handleSubmit = (values: AddEditMemberRequest) => {
    if (me?._id) {
      onCloseDialog();
      showLoading();
      dispatch(
        memberActions.editMember(
          {
            id: me._id,
            formData: values,
            file: image.file,
          },
          (error) => {
            if (error) {
              hideLoading();
              showErrorSnackbar(t(`auth.${error}`));
            } else {
              handleGetDetailAdmin();
              hideLoading();
              showSuccessSnackbar(t(`auth.editSuccess`));
            }
          }
        )
      );
    }
  };

  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: MemberSchema,
    onSubmit: (values) => {
      handleSubmit({ ...values, imageUrl: image.url });
    },
  });

  const handleResetForm = () => {
    if (me) {
      formik.resetForm({
        values: {
          imageUrl: me.imageUrl,
          username: me.username,
          password: me.password,
          fullname: me.fullname,
          phoneNumber: me.phoneNumber,
          email: me.email,
          birthday: me.birthday,
          roles: me.roles,
          gender: me.gender,
        },
      });
      setImage({ ...image, url: me.imageUrl });
    }
  };

  React.useEffect(() => {
    handleResetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
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
              type="password"
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
              required={true}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SelectRoles
              field="roles"
              tableName="member"
              allItems={roles}
              selected={formik.values.roles}
              setFieldValue={formik.setFieldValue}
            />
          </Grid>
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
      <Box sx={{ display: "flex", justifyContent: "right", mt: 4 }}>
        <Button variant="contained" color="success" type="submit">
          {t("common.edit")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mx: 1 }}
          onClick={handleResetForm}
        >
          {t("common.reset")}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            onCloseDialog();
          }}
        >
          {t("common.close")}
        </Button>
      </Box>
    </Box>
  );
});

export default withLoading(EditMember);
