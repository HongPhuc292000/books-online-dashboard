import { Box, Button } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { omit } from "lodash";
import { AddEditMemberRequest, Filter, ImageFileType } from "types";

import { memberActions, initialState } from "../slice";
import { MemberSchema } from "../components/memberSchema.data";
import CommonFields from "../components/CommonFields";

interface AddMemberProps {
  onCloseDialog: () => void;
  onFetchData: (params: Filter) => void;
  showLoading: () => void;
  hideLoading: () => void;
}

const AddMember = memo(
  ({
    onCloseDialog,
    onFetchData,
    showLoading,
    hideLoading,
  }: AddMemberProps) => {
    const [image, setImage] = useState<ImageFileType>({
      file: null,
      url: "",
    });
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
    const handleSubmit = (values: AddEditMemberRequest) => {
      onCloseDialog();
      showLoading();
      // dispatch(
      //   authorActions.addNewAuthor(
      //     { formData: values, file: image.file },
      //     (error) => {
      //       if (error) {
      //         hideLoading();
      //         showErrorSnackbar(t(`author.${error}`));
      //       } else {
      //         hideLoading();
      //         showSuccessSnackbar(t(`author.addSuccess`));
      //         onFetchData({});
      //       }
      //     }
      //   )
      // );
    };

    const formik = useFormik({
      initialValues: omit(initialState.detailMember, ["_id"]),
      validationSchema: MemberSchema,
      onSubmit: (values) => {
        handleSubmit(values);
      },
    });

    return (
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} image={image} setImage={setImage} />
        <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ mr: 1 }}
          >
            {t("common.addNew")}
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

export default AddMember;
