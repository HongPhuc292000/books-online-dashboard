import { Box, Button } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddEditMemberRequest, Filter, ImageFileType } from "types";

import { useAppDispatch, useAppSelector } from "app/hooks";
import React from "react";
import CommonFields from "../components/CommonFields";
import { defaultValue, MemberSchema } from "../components/memberSchema.data";
import { memberActions } from "../slice";
import { selectMember } from "../slice/selector";

interface EditMemberProps {
  onCloseDialog: () => void;
  onFetchData?: (params: Filter) => void;
  showLoading: () => void;
  hideLoading: () => void;
  id?: string;
}

const EditMember = memo(
  ({
    onCloseDialog,
    onFetchData,
    showLoading,
    hideLoading,
    id,
  }: EditMemberProps) => {
    const [image, setImage] = useState<ImageFileType>({
      file: null,
      url: "",
    });
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { detailMember } = useAppSelector(selectMember);
    const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
    const handleSubmit = (values: AddEditMemberRequest) => {
      if (id) {
        onCloseDialog();
        showLoading();
        dispatch(
          memberActions.editMember(
            {
              id,
              formData: values,
              file: image.file,
            },
            (error) => {
              if (error) {
                hideLoading();
                showErrorSnackbar(t(`member.${error}`));
              } else {
                hideLoading();
                showSuccessSnackbar(t(`member.editSuccess`));
                if (onFetchData) {
                  onFetchData({});
                }
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
      if (detailMember) {
        formik.resetForm({
          values: {
            imageUrl: detailMember.imageUrl,
            username: detailMember.username,
            password: detailMember.password,
            fullname: detailMember.fullname,
            phoneNumber: detailMember.phoneNumber,
            email: detailMember.email,
            birthday: detailMember.birthday,
            roles: detailMember.roles,
            gender: detailMember.gender,
          },
        });
        setImage({ ...image, url: detailMember.imageUrl });
      }
    };

    React.useEffect(() => {
      showLoading();
      if (!!id) {
        dispatch(
          memberActions.getDetailMember(id, (error) => {
            if (error) {
              showErrorSnackbar(t(`member.${error}`));
            }
            hideLoading();
          })
        );
      }

      return () => {
        dispatch(memberActions.getDetailMemberSuccess(undefined));
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      handleResetForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailMember]);

    return (
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} image={image} setImage={setImage} />
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
  }
);

export default EditMember;
