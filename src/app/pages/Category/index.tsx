import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ActionDialog from "app/components/ActionDialog";
import { DeleteIconButton } from "app/components/Button";
import { withLoading } from "app/components/HOC/withLoadingDataTable";
import { PageTitle, TableContentLabel } from "app/components/Label";
import MainWrap from "app/components/Layouts/MainWrap";
import SearchBar from "app/components/SearchBar";
import StickyHeadTable from "app/components/Table";
import { HeaderProps } from "app/components/Table/TableHeader";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFilter } from "app/hooks/useFilter";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { debounce } from "lodash";
import { memo, useCallback, useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Category, Filter } from "types";
import { CategoryDialogEnum } from "types/enums";

import { categoryActions } from "./slice";
import { selectCategory } from "./slice/selector";

interface ListCategoryProps {
  setLoading?: Function;
}

const headers: HeaderProps[] = [
  { name: "serial", align: "center", isCommonLabel: true, width: 88 },
  { name: "categoryCode" },
  { name: "categoryName" },
  { name: "nothing", isCommonLabel: true, align: "right", width: 80 },
];

const ListCategories = memo(({ setLoading }: ListCategoryProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { listCategories } = useAppSelector(selectCategory);
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showSuccessSnackbar, showErrorSnackbar } = useToastMessage();
  const [showDialog, setShowdialog] = useState<CategoryDialogEnum | undefined>(
    undefined
  );
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleFetchData = (params: Filter) => {
    showLoading();
    dispatch(
      categoryActions.getAllCategories(params, (error) => {
        if (error) {
          showErrorSnackbar(t(`category.${error}`));
        }
        hideLoading();
      })
    );
  };

  const { filter, onFilterToQueryString } = useFilter({
    onFetchData: handleFetchData,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(
    debounce((value: string) => {
      const newParams = {
        ...filter,
        page: 0,
        searchKey: value,
      };
      onFilterToQueryString(newParams);
    }, 800),
    [filter]
  );

  const handleFetchDataForPage = useCallback(
    ({ page, size }: Filter) => {
      onFilterToQueryString({
        ...filter,
        page,
        size,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );

  const handleCloseDialog = useCallback(() => {
    setShowdialog(undefined);
  }, []);

  const handleShowDialog = useCallback((id: string) => {
    setShowdialog(CategoryDialogEnum.DELETE);
    setSelectedItem(id);
  }, []);

  const handleDeleteCategory = () => {
    setShowdialog(undefined);
    showLoading();
    dispatch(
      categoryActions.deleleCategory(selectedItem, (error) => {
        if (error) {
          hideLoading();
          showErrorSnackbar(t(`category.${error}`));
        } else {
          handleFetchData({});
          hideLoading();
          showSuccessSnackbar(t("category.deleted"));
        }
      })
    );
  };

  const renderItem = useCallback((item: Category, index: number) => {
    return [
      <TableContentLabel>{index}</TableContentLabel>,
      <TableContentLabel>{item.type}</TableContentLabel>,
      <TableContentLabel>{item.name}</TableContentLabel>,
      <DeleteIconButton onDelete={handleShowDialog} id={item._id} />,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DeleteDialogContent = useMemo(() => {
    return (
      <Box>
        <Typography>{t("category.acceptDeletCategory")}</Typography>
        <Grid container justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 2 }}
            onClick={handleDeleteCategory}
          >
            {t("common.accept")}
          </Button>
          <Button variant="contained" color="error" onClick={handleCloseDialog}>
            {t("common.cancel")}
          </Button>
        </Grid>
      </Box>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    return () => {
      dispatch(categoryActions.getAllCategoriesSuccess({}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <PageTitle variant="h4">{t(`category.listAuthor`)}</PageTitle>
        <SearchBar
          keyword={filter.searchKey}
          onSearch={onSearch}
          placeholder={t("category.searchPlaceholder")}
        />
        <StickyHeadTable
          headers={headers}
          renderItem={renderItem}
          items={listCategories?.data}
          total={listCategories?.total}
          tableName="category"
          pageResponse={listCategories?.page}
          sizeResponse={listCategories?.size}
          filter={filter}
          onFetchDataForPage={handleFetchDataForPage}
        />
        <ActionDialog
          title={t("common.acceptDelete")}
          isOpen={showDialog === CategoryDialogEnum.DELETE}
          dialogContent={DeleteDialogContent}
          onCancel={handleCloseDialog}
        />
      </Paper>
    </MainWrap>
  );
});

export default withLoading(ListCategories);
