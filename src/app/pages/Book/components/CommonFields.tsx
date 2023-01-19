import {
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
} from "@mui/material";
import SquareMediaCard from "app/components/MediaCard/SquareMediaCard";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ImageFileType } from "types";

interface CommonFieldsProps {
  image: ImageFileType;
  setImage: Function;
  formik: any;
}

const CommonFields = memo(({ image, setImage, formik }: CommonFieldsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item>
            <SquareMediaCard url={image.url} setImage={setImage} />
          </Grid>
          <Grid item flex={1} container>
            <Grid item xs={4} container>
              <FormControlLabel
                name="isFull"
                onChange={formik.handleChange}
                sx={{ mb: 2 }}
                control={<Switch checked={formik.values.isFull} />}
                label={t("book.isFull")}
              />
              <FormControlLabel
                name="status"
                onChange={formik.handleChange}
                sx={{ mb: 2 }}
                control={<Switch checked={formik.values.status} />}
                label={t("commonTableHeader.status")}
              />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="bookCode"
                  name="bookCode"
                  value={formik.values.bookCode}
                  onChange={formik.handleChange}
                  fullWidth
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
                <TextField
                  id="authorId"
                  name="authorId"
                  value={formik.values.authorId}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  label={t("book.author")}
                  error={formik.touched.authorId && !!formik.errors.authorId}
                  helperText={
                    formik.touched.authorId &&
                    t(formik.errors.authorId as string)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="categoryIds"
                  name="categoryIds"
                  value={formik.values.categoryIds}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  label={t("book.categories")}
                  error={
                    formik.touched.categoryIds && !!formik.errors.categoryIds
                  }
                  helperText={
                    formik.touched.categoryIds &&
                    t(formik.errors.categoryIds as string)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="defaultPrice"
                  name="defaultPrice"
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="reducedPrice"
                  name="reducedPrice"
                  value={formik.values.reducedPrice}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="amount"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  label={t("commonTableHeader.amount")}
                  error={formik.touched.amount && !!formik.errors.amount}
                  helperText={
                    formik.touched.amount && t(formik.errors.amount as string)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  id="content"
                  name="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  label={t("book.content")}
                  error={formik.touched.content && !!formik.errors.content}
                  helperText={
                    formik.touched.content && t(formik.errors.content as string)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
});

export default CommonFields;
