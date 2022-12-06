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
import { Category, Filter } from "types";

import { categoryActions } from "./slice";
import { selectCategory } from "./slice/selector";

interface ListCategoryProps {
  setLoading?: Function;
}

const headers: HeaderProps[] = [
  { name: "serial", align: "center", isCommonLabel: true },
  { name: "categoryCode" },
  { name: "categoryName" },
];

const ListCategories = memo(({ setLoading }: ListCategoryProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { listCategories } = useAppSelector(selectCategory);
  const { showLoading, hideLoading } = useLoading({ setLoading });

  const handleFetchData = (params: Filter) => {
    showLoading();
    dispatch(
      categoryActions.getAllCategories(params, () => {
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

  const renderItem = useCallback((item: Category, index: number) => {
    return [
      <TableContentLabel>{index}</TableContentLabel>,
      <TableContentLabel>{item.type}</TableContentLabel>,
      <TableContentLabel>{item.name}</TableContentLabel>,
    ];
  }, []);

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
          filter={filter}
          onFetchDataForPage={handleFetchDataForPage}
        />
      </Paper>
    </MainWrap>
  );
});

export default withLoading(ListCategories);
