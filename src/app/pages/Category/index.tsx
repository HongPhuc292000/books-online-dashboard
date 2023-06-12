import { Grid, Paper } from "@mui/material";
import ActionDialog from "app/components/ActionDialog";
import { DeleteIconButton } from "app/components/Button";
import { withLoading } from "app/components/HOC/withLoadingDataTable";
import { PageTitleContent, TableContentLabel } from "app/components/Label";
import MainWrap from "app/components/Layouts/MainWrap";
import SearchBar from "app/components/SearchBar";
import StickyHeadTable from "app/components/Table";
import { HeaderProps } from "app/components/Table/TableHeader";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFilter } from "app/hooks/useFilter";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { debounce } from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Category, Filter } from "types";
import { CommonDialogEnum, RolesPermission } from "types/enums";

import DeleteDialogContent from "app/components/ActionDialog/DeleteDialogContent";
import AddIconButton from "app/components/Button/AddIconButton";
import AddCategory from "./AddCategory";
import { categoryActions } from "./slice";
import { selectCategory } from "./slice/selector";
import { selectAuth } from "../Auth/slice/selector";
import { checkPermission } from "utils";

interface ListCategoryProps {
  setLoading?: Function;
}

const headers: HeaderProps[] = [
  { name: "serial", align: "center", isCommonLabel: true, minWidth: 80 },
  { name: "type" },
  { name: "name" },
  { name: "nothing", isCommonLabel: true, align: "right", minWidth: 80 },
];

const ListCategories = memo(({ setLoading }: ListCategoryProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { listCategories } = useAppSelector(selectCategory);
  const { me } = useAppSelector(selectAuth);
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showSuccessSnackbar, showErrorSnackbar } = useToastMessage();
  const [showDialog, setShowdialog] = useState<string | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleFetchData = useCallback((params: Filter) => {
    showLoading();
    dispatch(
      categoryActions.getAllCategories(params, (error) => {
        if (error) {
          showErrorSnackbar(t(`category.${error}`));
        }
        hideLoading();
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleShowDialog = useCallback(
    (action: string | undefined, id?: string) => {
      if (id) {
        setSelectedItem(id);
      }
      setShowdialog(action);
    },
    []
  );

  const handleDeleteCategory = () => {
    setShowdialog(undefined);
    showLoading();
    dispatch(
      categoryActions.deleleCategory(selectedItem, (error) => {
        if (error) {
          hideLoading();
          showErrorSnackbar(t(`category.${error}`));
        } else {
          hideLoading();
          showSuccessSnackbar(t("category.deleteSuccess"));
          handleFetchData({});
        }
      })
    );
  };

  const renderItem = useCallback(
    (item: Category, index: number) => {
      return [
        <TableContentLabel>{index}</TableContentLabel>,
        <TableContentLabel>{item.type}</TableContentLabel>,
        <TableContentLabel>{item.name}</TableContentLabel>,
        <DeleteIconButton
          onDelete={handleShowDialog}
          id={item._id}
          permited={checkPermission(RolesPermission.DELETE_CATEGORY, me?.roles)}
        />,
      ];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [me]
  );

  useEffect(() => {
    return () => {
      dispatch(categoryActions.getAllCategoriesSuccess({}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" mb={1}>
          <Grid item>
            <PageTitleContent variant="h4">
              {t(`category.listAuthor`)}
            </PageTitleContent>
          </Grid>
          <Grid item justifyContent="flex-end">
            <AddIconButton
              onAddItem={handleShowDialog}
              permited={checkPermission(
                RolesPermission.ADD_CATEGORY,
                me?.roles
              )}
            />
          </Grid>
        </Grid>
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
          title={t("category.addNewCategory")}
          isOpen={showDialog === CommonDialogEnum.ADD}
          dialogContent={
            <AddCategory
              onCloseDialog={handleCloseDialog}
              onFetchData={handleFetchData}
              showLoading={showLoading}
              hideLoading={hideLoading}
            />
          }
          onCancel={handleCloseDialog}
        />
        <ActionDialog
          title={t("common.acceptDelete")}
          isOpen={showDialog === CommonDialogEnum.DELETE}
          dialogContent={
            <DeleteDialogContent
              content={t("category.acceptDeleteCategory")}
              onAcceptDelete={handleDeleteCategory}
              onCancel={handleCloseDialog}
            />
          }
          onCancel={handleCloseDialog}
          maxWidth="xs"
        />
      </Paper>
    </MainWrap>
  );
});

export default withLoading(ListCategories);
