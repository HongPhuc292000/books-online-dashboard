import { Box, Button } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { omit } from "lodash";
import { AddEditMemberRequest, Filter, ImageFileType } from "types";

import { memberActions, initialState } from "../slice";
import { MemberSchema } from "../components/memberSchema.data";
import CommonFields from "../components/CommonFields";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectMember } from "../slice/selector";
import React from "react";

interface EditMemberProps {
  onCloseDialog: () => void;
  onFetchData: (params: Filter) => void;
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
      onCloseDialog();
      showLoading();
      dispatch(
        memberActions.editMember(
          {
            id: detailMember._id,
            formData: values,
            file: image.file,
            beforeImage: detailMember.imageUrl,
          },
          (error) => {
            if (error) {
              hideLoading();
              showErrorSnackbar(t(`member.${error}`));
            } else {
              hideLoading();
              showSuccessSnackbar(t(`member.editSuccess`));
              onFetchData({});
            }
          }
        )
      );
    };

    const formik = useFormik({
      initialValues: omit(initialState.detailMember, ["_id"]),
      validationSchema: MemberSchema,
      onSubmit: (values) => {
        handleSubmit({ ...values, imageUrl: image.url });
      },
    });

    const handleResetForm = () => {
      formik.resetForm({
        values: detailMember,
      });
      setImage({ ...image, url: detailMember.imageUrl });
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
        dispatch(
          memberActions.getDetailMemberSuccess(initialState.detailMember)
        );
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      handleResetForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailMember]);

    console.log(formik.values);

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
