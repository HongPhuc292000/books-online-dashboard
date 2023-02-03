import { Grid, Paper } from "@mui/material";
import ActionDialog from "app/components/ActionDialog";
import DeleteDialogContent from "app/components/ActionDialog/DeleteDialogContent";
import { DeleteIconButton } from "app/components/Button";
import AddIconButton from "app/components/Button/AddIconButton";
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
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Customer, Filter } from "types";
import { CommonDialogEnum } from "types/enums";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { customerActions } from "./slice";
import { selectCustomer } from "./slice/selector";

interface ListCustomersProps {
  setLoading?: Function;
}

const headers: HeaderProps[] = [
  { name: "serial", align: "center", isCommonLabel: true, minWidth: 88 },
  { name: "username" },
  { name: "fullname" },
  { name: "phoneNumber" },
  { name: "email" },
  { name: "nothing", isCommonLabel: true, align: "right", minWidth: 80 },
];

const ListCustomers = React.memo(({ setLoading }: ListCustomersProps) => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const dispatch = useAppDispatch();
  const { listCustomers } = useAppSelector(selectCustomer);
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();

  const [showDialog, setShowdialog] = useState<string | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleFetchData = (params: Filter) => {
    showLoading();
    dispatch(
      customerActions.getAllCustomers(params, (error) => {
        if (error) {
          showErrorSnackbar(t(`customer.${error}`));
        }
        hideLoading();
      })
    );
  };

  const handleShowDialog = useCallback(
    (action: string | undefined, id?: string) => {
      if (id) {
        setSelectedItem(id);
      }
      setShowdialog(action);
    },
    []
  );

  const handleSelectRow = (id: string) => {
    if (id) {
      setSelectedItem(id);
      setShowdialog(CommonDialogEnum.EDIT);
    }
  };

  const handleCloseDialog = useCallback(() => {
    setShowdialog(undefined);
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

  const handleDeleteCustomer = () => {
    setShowdialog(undefined);
    showLoading();
    dispatch(
      customerActions.deleleCustomer(selectedItem, (error) => {
        if (error) {
          hideLoading();
          showErrorSnackbar(t(`customer.${error}`));
        } else {
          hideLoading();
          showSuccessSnackbar(t("customer.deleteSuccess"));
          handleFetchData({});
        }
      })
    );
  };

  const renderItem = useCallback((item: Customer, index: number) => {
    return [
      <TableContentLabel>{index}</TableContentLabel>,
      <TableContentLabel>{item.username}</TableContentLabel>,
      <TableContentLabel>{item.fullname}</TableContentLabel>,
      <TableContentLabel>{item.phoneNumber}</TableContentLabel>,
      <TableContentLabel>{item.email}</TableContentLabel>,
      <DeleteIconButton onDelete={handleShowDialog} id={item._id} />,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <PageTitleContent variant="h4">
          {t(`customer.listCustomers`)}
        </PageTitleContent>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm="auto">
            <SearchBar
              keyword={filter.searchKey}
              onSearch={onSearch}
              placeholder={t("member.searchPlaceholder")}
            />
          </Grid>
          <Grid item sm="auto" container justifyContent="flex-end">
            <AddIconButton onAddItem={handleShowDialog} />
          </Grid>
        </Grid>
        <StickyHeadTable
          headers={headers}
          renderItem={renderItem}
          items={listCustomers?.data}
          total={listCustomers?.total}
          pageResponse={listCustomers?.page}
          sizeResponse={listCustomers?.size}
          tableName="customer"
          filter={filter}
          onFetchDataForPage={handleFetchDataForPage}
          onSelectRow={handleSelectRow}
        />
        <ActionDialog
          title={t("common.acceptDelete")}
          isOpen={showDialog === CommonDialogEnum.DELETE}
          dialogContent={
            <DeleteDialogContent
              content={t("customer.acceptDeleteCustomer")}
              onAcceptDelete={handleDeleteCustomer}
              onCancel={handleCloseDialog}
            />
          }
          onCancel={handleCloseDialog}
          maxWidth="xs"
        />
        <ActionDialog
          title={t("customer.addNewCustomer")}
          isOpen={showDialog === CommonDialogEnum.ADD}
          dialogContent={
            <AddCustomer
              onCloseDialog={handleCloseDialog}
              onFetchData={onFilterToQueryString}
              showLoading={showLoading}
              hideLoading={hideLoading}
            />
          }
          onCancel={handleCloseDialog}
          maxWidth="md"
        />
        <ActionDialog
          title={t("customer.editCustomer")}
          isOpen={showDialog === CommonDialogEnum.EDIT}
          dialogContent={
            <EditCustomer
              onCloseDialog={handleCloseDialog}
              onFetchData={onFilterToQueryString}
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

export default withLoading(ListCustomers);
