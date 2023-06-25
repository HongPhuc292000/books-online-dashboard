import { Grid, Paper } from "@mui/material";
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
import { memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Filter, ImportBook } from "types";
import { OrderStatusesEnum, RolesPermission } from "types/enums";

import AddIconButton from "app/components/Button/AddIconButton";
import { useNavigate } from "react-router-dom";
import { checkPermission, formatNomalDate } from "utils";
import { selectAuth } from "../Auth/slice/selector";
import { importBookActions } from "./slice";
import { selectImportBook } from "./slice/selector";
import StatusLabel from "app/components/Label/StatusLabel";

interface ListImportBooksProps {
  setLoading?: Function;
}

const headers: HeaderProps[] = [
  { name: "serial", align: "center", isCommonLabel: true, minWidth: 80 },
  { name: "orderCode" },
  { name: "createdBy" },
  { name: "importStatus", align: "center" },
  { name: "createdAt" },
];

const ListImportBooks = memo(({ setLoading }: ListImportBooksProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { listImportBooks } = useAppSelector(selectImportBook);
  const { me } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar } = useToastMessage();

  const handleFetchData = useCallback((params: Filter) => {
    showLoading();
    dispatch(
      importBookActions.getAllImportBooks(params, (error) => {
        if (error) {
          showErrorSnackbar(t(`importBook.${error}`));
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

  const handleAddImportBook = useCallback(() => {
    navigate("add");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = useCallback(
    (item: ImportBook, index: number) => {
      return [
        <TableContentLabel>{index}</TableContentLabel>,
        <TableContentLabel>{item.orderCode}</TableContentLabel>,
        <TableContentLabel>{item.createdBy.fullname}</TableContentLabel>,
        <StatusLabel
          status={item.isCancel ? OrderStatusesEnum.CANCEL : "IMPORTORDERED"}
        />,
        <TableContentLabel>
          {formatNomalDate(item.createdAt)}
        </TableContentLabel>,
      ];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [me]
  );

  const handleSelectRow = (id: string) => {
    navigate(`edit/${id}`);
  };

  useEffect(() => {
    return () => {
      dispatch(importBookActions.getAllImportBooksSuccess(undefined));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" mb={1}>
          <Grid item>
            <PageTitleContent variant="h4">
              {t(`importBook.listImportBook`)}
            </PageTitleContent>
          </Grid>
          <Grid item justifyContent="flex-end">
            <AddIconButton
              onAddItem={handleAddImportBook}
              permited={checkPermission(
                RolesPermission.ADD_IMPORT_BOOK,
                me?.roles
              )}
            />
          </Grid>
        </Grid>
        <SearchBar
          keyword={filter.searchKey}
          onSearch={onSearch}
          placeholder={t("importBook.searchPlaceholder")}
        />
        <StickyHeadTable
          headers={headers}
          renderItem={renderItem}
          items={listImportBooks?.data}
          total={listImportBooks?.total}
          tableName="importBook"
          pageResponse={listImportBooks?.page}
          sizeResponse={listImportBooks?.size}
          filter={filter}
          onFetchDataForPage={handleFetchDataForPage}
          permited={checkPermission(
            RolesPermission.EDIT_IMPORT_BOOK,
            me?.roles
          )}
          onSelectRow={handleSelectRow}
        />
      </Paper>
    </MainWrap>
  );
});

export default withLoading(ListImportBooks);
