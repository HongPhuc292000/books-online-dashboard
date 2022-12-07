import { Paper } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingDataTable";
import { PageTitle, TableContentLabel } from "app/components/Label";
import MainWrap from "app/components/Layouts/MainWrap";
import SearchBar from "app/components/SearchBar";
import StickyHeadTable from "app/components/Table";
import { HeaderProps } from "app/components/Table/TableHeader";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFilter } from "app/hooks/useFilter";
import { useLoading } from "app/hooks/useLoading";
import { debounce } from "lodash";
import { memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Author, Filter } from "types";

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
];

const ListAuthors = memo(({ setLoading }: ListAuthorProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { listAuthor } = useAppSelector(selectAuthor);
  const { showLoading, hideLoading } = useLoading({ setLoading });

  const handleFetchData = (params: Filter) => {
    showLoading();
    dispatch(
      authorActions.getAllAuthors(params, () => {
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

  const renderItem = useCallback((item: Author, index: number) => {
    return [
      <TableContentLabel>{index}</TableContentLabel>,
      <TableContentLabel>{item.name}</TableContentLabel>,
      <TableContentLabel>{item.yearOfBirth}</TableContentLabel>,
      <TableContentLabel>{item.yearPassed}</TableContentLabel>,
    ];
  }, []);

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
        <SearchBar
          keyword={filter.searchKey}
          onSearch={onSearch}
          placeholder={t("author.searchPlaceholder")}
        />
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
        />
      </Paper>
    </MainWrap>
  );
});

export default withLoading(ListAuthors);
