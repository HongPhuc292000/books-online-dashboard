import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ActionDialog from "app/components/ActionDialog";
import { DeleteIconButton } from "app/components/Button";
import AddIconButton from "app/components/Button/AddIconButton";
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
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Author, Filter } from "types";
import { CommonDialogEnum } from "types/enums";
import { formatNomalDate } from "utils/formatDate";

import AddAuthor from "./AddAuthor";
import EditAuthor from "./EditAuthor";
import { authorActions } from "./slice";
import { selectAuthor } from "./slice/selector";

interface ListAuthorProps {
  setLoading?: Function;
}

const headers: HeaderProps[] = [
  { name: "serial", align: "center", isCommonLabel: true, width: 88 },
  { name: "name" },
  { name: "yearOfBirth", align: "right" },
  { name: "yearPassed", align: "right" },
  { name: "nothing", isCommonLabel: true, align: "right", width: 80 },
];

const ListAuthors = memo(({ setLoading }: ListAuthorProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { listAuthor } = useAppSelector(selectAuthor);
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();

  const [showDialog, setShowdialog] = useState<string | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleFetchData = (params: Filter) => {
    showLoading();
    dispatch(
      authorActions.getAllAuthors(params, (error) => {
        if (error) {
          showErrorSnackbar(t(`author.${error}`));
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

  const handleShowDialog = useCallback(
    (action: string | undefined, id?: string) => {
      if (id) {
        setSelectedItem(id);
      }
      setShowdialog(action);
    },
    []
  );

  const handleCloseDialog = useCallback(() => {
    setShowdialog(undefined);
  }, []);

  const handleDeleteCategory = () => {
    setShowdialog(undefined);
    showLoading();
    dispatch(
      authorActions.deleleAuthor(selectedItem, (error) => {
        if (error) {
          hideLoading();
          showErrorSnackbar(t(`author.${error}`));
        } else {
          hideLoading();
          showSuccessSnackbar(t("author.deleteSuccess"));
          handleFetchData({});
        }
      })
    );
  };

  const handleSelectRow = (id: string) => {
    setSelectedItem(id);
    setShowdialog(CommonDialogEnum.EDIT);
  };

  const renderItem = useCallback((item: Author, index: number) => {
    return [
      <TableContentLabel>{index}</TableContentLabel>,
      <TableContentLabel>{item.name}</TableContentLabel>,
      <TableContentLabel>
        {formatNomalDate(item.yearOfBirth)}
      </TableContentLabel>,
      <TableContentLabel>{formatNomalDate(item.yearPassed)}</TableContentLabel>,
      <DeleteIconButton onDelete={handleShowDialog} id={item._id} />,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DeleteDialogContent = useMemo(() => {
    return (
      <Box>
        <Typography>{t("author.acceptDeletAuthor")}</Typography>
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
      dispatch(authorActions.getAllAuthorsSuccess({}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <PageTitle variant="h4">{t(`author.listAuthor`)}</PageTitle>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm="auto">
            <SearchBar
              keyword={filter.searchKey}
              onSearch={onSearch}
              placeholder={t("author.searchPlaceholder")}
            />
          </Grid>
          <Grid item sm="auto" container justifyContent="flex-end">
            <AddIconButton onAddItem={handleShowDialog} />
          </Grid>
        </Grid>
        <StickyHeadTable
          headers={headers}
          renderItem={renderItem}
          items={listAuthor?.data}
          total={listAuthor?.total}
          pageResponse={listAuthor?.page}
          sizeResponse={listAuthor?.size}
          tableName="author"
          filter={filter}
          onFetchDataForPage={handleFetchDataForPage}
          onSelectRow={handleSelectRow}
        />
        <ActionDialog
          title={t("common.acceptDelete")}
          isOpen={showDialog === CommonDialogEnum.DELETE}
          dialogContent={DeleteDialogContent}
          onCancel={handleCloseDialog}
          maxWidth="xs"
        />
        <ActionDialog
          title={t("author.addNewAuthor")}
          isOpen={showDialog === CommonDialogEnum.ADD}
          dialogContent={
            <AddAuthor
              onCloseDialog={handleCloseDialog}
              onFetchData={handleFetchData}
              showLoading={showLoading}
              hideLoading={hideLoading}
            />
          }
          onCancel={handleCloseDialog}
          maxWidth="md"
        />
        <ActionDialog
          title={t("author.editAuthor")}
          isOpen={showDialog === CommonDialogEnum.EDIT}
          dialogContent={
            <EditAuthor
              onCloseDialog={handleCloseDialog}
              onFetchData={handleFetchData}
              showLoading={showLoading}
              hideLoading={hideLoading}
              id={selectedItem}
            />
          }
          onCancel={handleCloseDialog}
          maxWidth="md"
        />
      </Paper>
    </MainWrap>
  );
});

export default withLoading(ListAuthors);
