import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AddEditAuthorRequest, Author, Filter, ImageFileType } from "types";
import { useAppSelector } from "app/hooks";

import { authorActions, initialState } from "../slice";
import { selectAuthor } from "../slice/selector";
import { AuthorSchema } from "../components/authorSchema.data";
import CommonFields from "../components/CommonFields";

interface EditAuthorProps {
  onCloseDialog: () => void;
  onFetchData: (params: Filter) => void;
  showLoading: () => void;
  hideLoading: () => void;
  id?: string;
}

const EditAuthor = memo(
  ({
    onCloseDialog,
    onFetchData,
    showLoading,
    hideLoading,
    id,
  }: EditAuthorProps) => {
    const [image, setImage] = useState<ImageFileType>({
      file: null,
      url: "",
    });
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { detailAuthor } = useAppSelector(selectAuthor);
    const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
    const handleSubmit = (values: AddEditAuthorRequest) => {
      onCloseDialog();
      showLoading();
      dispatch(
        authorActions.editAuthor(
          {
            id: detailAuthor._id,
            formData: values,
            file: image.file,
            beforeImage: detailAuthor.imageUrl,
          },
          (error) => {
            if (error) {
              hideLoading();
              showErrorSnackbar(t(`author.${error}`));
            } else {
              hideLoading();
              showSuccessSnackbar(t("author.editSuccess"));
              onFetchData({});
            }
          }
        )
      );
    };

    const formik = useFormik({
      initialValues: detailAuthor,
      validationSchema: AuthorSchema,
      onSubmit: (values: Author) => {
        const { _id, ...others } = values;
        handleSubmit({ ...others, imageUrl: image.url });
      },
    });

    const handleResetForm = () => {
      formik.resetForm({
        values: {
          _id: "",
          imageUrl: detailAuthor.imageUrl,
          name: detailAuthor.name,
          yearOfBirth: detailAuthor.yearOfBirth,
          yearPassed: detailAuthor.yearPassed,
          description: detailAuthor.description,
        },
      });
      setImage({ ...image, url: detailAuthor.imageUrl });
    };

    React.useEffect(() => {
      handleResetForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailAuthor]);

    React.useEffect(() => {
      showLoading();
      if (!!id) {
        dispatch(
          authorActions.getDetailAuthor(id, (error) => {
            if (error) {
              showErrorSnackbar(t(`author.${error}`));
            }
            hideLoading();
          })
        );
      }

      return () => {
        dispatch(
          authorActions.getDetailAuthorSuccess(initialState.detailAuthor)
        );
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Box component="form" onSubmit={formik.handleSubmit}>
        <CommonFields formik={formik} image={image} setImage={setImage} />
        <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
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

export default EditAuthor;
