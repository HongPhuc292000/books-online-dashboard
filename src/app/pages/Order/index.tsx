import { Grid, Paper } from "@mui/material";
import { DeleteIconButton } from "app/components/Button";
import AddIconButton from "app/components/Button/AddIconButton";
import { withLoading } from "app/components/HOC/withLoadingDataTable";
import { PageTitleContent, TableContentLabel } from "app/components/Label";
import StatusLabel from "app/components/Label/StatusLabel";
import MainWrap from "app/components/Layouts/MainWrap";
import SearchBar from "app/components/SearchBar";
import StickyHeadTable from "app/components/Table";
import { HeaderProps } from "app/components/Table/TableHeader";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFilter } from "app/hooks/useFilter";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { debounce } from "lodash";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Filter, Order } from "types";
import { formatNomalDate } from "utils";
import { orderActions } from "./slice";
import { selectOrder } from "./slice/selector";

interface ListOrderProps {
  setLoading?: Function;
}

const headers: HeaderProps[] = [
  { name: "serial", align: "center", isCommonLabel: true, minWidth: 80 },
  { name: "customerName" },
  { name: "totalPay", align: "right" },
  { name: "orderStatus", align: "center" },
  { name: "createAt", isCommonLabel: true },
  { name: "nothing", isCommonLabel: true, align: "right", minWidth: 80 },
];

const ListOrders = React.memo(({ setLoading }: ListOrderProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { listOrders } = useAppSelector(selectOrder);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();

  const handleFetchData = (params: Filter) => {
    showLoading();
    dispatch(
      orderActions.getAllOrders(params, (error) => {
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
    (filter: Filter) => {
      onFilterToQueryString(filter);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const renderItem = useCallback((item: Order, index: number) => {
    return [
      <TableContentLabel>{index}</TableContentLabel>,
      <TableContentLabel>
        {item?.customerName || item?.customerId?.name}
      </TableContentLabel>,
      <TableContentLabel>{item?.totalPrices}</TableContentLabel>,
      <StatusLabel status={item.status} />,
      <TableContentLabel>{formatNomalDate(item.createdAt)}</TableContentLabel>,
      <DeleteIconButton onDelete={() => {}} id={item._id} />,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddBook = useCallback(() => {
    navigate("add");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" mb={1}>
          <Grid item>
            <PageTitleContent variant="h4">
              {t(`order.listOrders`)}
            </PageTitleContent>
          </Grid>
          <Grid item justifyContent="flex-end">
            <AddIconButton onAddItem={handleAddBook} />
          </Grid>
        </Grid>
        <SearchBar
          keyword={filter.searchKey}
          onSearch={onSearch}
          placeholder={t("author.searchPlaceholder")}
        />
        <StickyHeadTable
          headers={headers}
          renderItem={renderItem}
          items={listOrders?.data}
          total={listOrders?.total}
          pageResponse={listOrders?.page}
          sizeResponse={listOrders?.size}
          tableName="order"
          filter={filter}
          onFetchDataForPage={handleFetchDataForPage}
          // onSelectRow={handleSelectRow}
        />
      </Paper>
    </MainWrap>
  );
});

export default withLoading(ListOrders);
