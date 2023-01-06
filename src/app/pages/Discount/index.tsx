import { Grid, Paper } from "@mui/material";
import ActionDialog from "app/components/ActionDialog";
import DeleteDialogContent from "app/components/ActionDialog/DeleteDialogContent";
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
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Discount, Filter } from "types";
import { CommonDialogEnum, DiscountTypeEnum } from "types/enums";
import AddDiscount from "./AddDiscount";

import { discountActions } from "./slice";
import { selectDiscount } from "./slice/selector";

interface ListMembersProps {
  setLoading?: Function;
}

const headers: HeaderProps[] = [
  { name: "serial", align: "center", isCommonLabel: true, width: 88 },
  { name: "code" },
  { name: "value" },
  { name: "amount", isCommonLabel: true, align: "right" },
  { name: "used", align: "right" },
  { name: "nothing", isCommonLabel: true, align: "right", width: 80 },
];

const ListDiscounts = React.memo(({ setLoading }: ListMembersProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { listDiscounts } = useAppSelector(selectDiscount);
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
  const [showDialog, setShowdialog] = useState<string | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleFetchData = (params: Filter) => {
    showLoading();
    dispatch(
      discountActions.getAllDiscounts(params, (error) => {
        if (error) {
          showErrorSnackbar(t(`discount.${error}`));
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

  const handleConvertDiscountValue = (value: number, type: string) => {
    if (type && type === DiscountTypeEnum.CASH) {
      return `${value}(VND)`;
    } else {
      return `${value}(%)`;
    }
  };

  const handleDeleteDiscount = () => {
    setShowdialog(undefined);
    showLoading();
    dispatch(
      discountActions.deleleDiscount(selectedItem, (error) => {
        if (error) {
          hideLoading();
          showErrorSnackbar(t(`discount.${error}`));
        } else {
          hideLoading();
          showSuccessSnackbar(t("discount.deleteSuccess"));
          handleFetchData({});
        }
      })
    );
  };

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

  const renderItem = useCallback((item: Discount, index: number) => {
    return [
      <TableContentLabel>{index}</TableContentLabel>,
      <TableContentLabel>{item.code}</TableContentLabel>,
      <TableContentLabel>
        {handleConvertDiscountValue(item.value, item.type)}
      </TableContentLabel>,
      <TableContentLabel>{item.amount}</TableContentLabel>,
      <TableContentLabel>{item.used}</TableContentLabel>,
      <DeleteIconButton onDelete={handleShowDialog} id={item._id} />,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <PageTitle variant="h4">{t(`discount.listDiscounts`)}</PageTitle>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm="auto">
            <SearchBar
              keyword={filter.searchKey}
              onSearch={onSearch}
              placeholder={t("discount.searchPlaceholder")}
            />
          </Grid>
          <Grid item sm="auto" container justifyContent="flex-end">
            <AddIconButton onAddItem={handleShowDialog} />
          </Grid>
        </Grid>
        <StickyHeadTable
          headers={headers}
          renderItem={renderItem}
          items={listDiscounts?.data}
          total={listDiscounts?.total}
          pageResponse={listDiscounts?.page}
          sizeResponse={listDiscounts?.size}
          tableName="discount"
          filter={filter}
          onFetchDataForPage={handleFetchDataForPage}
          // onSelectRow={handleSelectRow}
        />
      </Paper>
      <ActionDialog
        title={t("common.acceptDelete")}
        isOpen={showDialog === CommonDialogEnum.DELETE}
        dialogContent={
          <DeleteDialogContent
            content={t("discount.acceptDeleteDiscount")}
            onAcceptDelete={handleDeleteDiscount}
            onCancel={handleCloseDialog}
          />
        }
        onCancel={handleCloseDialog}
        maxWidth="xs"
      />
      <ActionDialog
        title={t("category.addNewCategory")}
        isOpen={showDialog === CommonDialogEnum.ADD}
        dialogContent={
          <AddDiscount
            onCloseDialog={handleCloseDialog}
            onFetchData={handleFetchData}
            showLoading={showLoading}
            hideLoading={hideLoading}
          />
        }
        onCancel={handleCloseDialog}
      />
    </MainWrap>
  );
});

export default withLoading(ListDiscounts);
