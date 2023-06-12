import {
  FormControlLabel,
  Grid,
  InputAdornment,
  Paper,
  Switch,
  TextField,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import RoundMediaCard from "app/components/MediaCard/RoundMediaCard";
import SelectMultipleItems from "app/components/SelectBox/FilterMultipleSelectBox";
import SelectSingleItem from "app/components/SelectBox/SelectSingleItem";
import { useAppSelector } from "app/hooks";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ImageFileType } from "types";
import { initTinyConfig } from "utils";
import { selectBook } from "../slice/selector";

interface CommonFieldsProps {
  image: ImageFileType;
  setImage: Function;
  formik: any;
}

const CommonFields = memo(({ image, setImage, formik }: CommonFieldsProps) => {
  const { t } = useTranslation();
  const { listAuthors, listCategories } = useAppSelector(selectBook);
  const handleChangeFieldValue = useCallback((field: string, value: any) => {
    formik.setFieldValue(field, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item>
            <RoundMediaCard url={image.url} setImage={setImage} />
          </Grid>
          <Grid item flex={1} container>
            <Grid item xs={4} container>
              <FormControlLabel
                name="status"
                onChange={formik.handleChange}
                sx={{ mb: 2 }}
                control={<Switch checked={formik.values.status} />}
                label={t("common.enable")}
              />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="bookCode"
                  name="bookCode"
                  value={formik.values.bookCode}
                  onChange={formik.handleChange}
                  fullWidth
                  disabled
                  sx={{ mb: 2 }}
                  label={`${t("book.bookCode")}*`}
                  error={formik.touched.bookCode && !!formik.errors.bookCode}
                  helperText={
                    formik.touched.bookCode &&
                    t(formik.errors.bookCode as string)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  label={`${t("book.name")}*`}
                  error={formik.touched.name && !!formik.errors.name}
                  helperText={
                    formik.touched.name && t(formik.errors.name as string)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectSingleItem
                  field="authorId"
                  label={t("book.author")}
                  allItems={listAuthors}
                  selected={formik.values.authorId}
                  setFieldValue={handleChangeFieldValue}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectMultipleItems
                  label={t("book.categories")}
                  field="categoryIds"
                  options={listCategories}
                  selected={formik.values.categoryIds}
                  handleChangeFieldValue={handleChangeFieldValue}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="defaultPrice"
                  name="defaultPrice"
                  type="number"
                  value={formik.values.defaultPrice}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  label={`${t("book.defaultPrice")}*`}
                  error={
                    formik.touched.defaultPrice && !!formik.errors.defaultPrice
                  }
                  helperText={
                    formik.touched.defaultPrice &&
                    t(formik.errors.defaultPrice as string)
                  }
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">VND</InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="reducedPrice"
                  name="reducedPrice"
                  type="number"
                  value={formik.values.reducedPrice || ""}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  label={t("book.reducedPrice")}
                  error={
                    formik.touched.reducedPrice && !!formik.errors.reducedPrice
                  }
                  helperText={
                    formik.touched.reducedPrice &&
                    t(formik.errors.reducedPrice as string)
                  }
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">VND</InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="amount"
                  name="amount"
                  type="number"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  fullWidth
                  label={t("commonTableHeader.amount")}
                  error={formik.touched.amount && !!formik.errors.amount}
                  helperText={
                    formik.touched.amount && t(formik.errors.amount as string)
                  }
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">VND</InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Editor
              apiKey={process.env.REACT_APP_TINY_API_KEY}
              init={initTinyConfig}
              onEditorChange={(stringifiedHtmlValue) => {
                formik.setFieldValue("description", stringifiedHtmlValue);
              }}
              value={formik.values?.description}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
});

export default CommonFields;
