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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Filter, Member } from "types";
import { CommonDialogEnum } from "types/enums";
import AddMember from "./AddMember";

import { memberActions } from "./slice";
import { selectMember } from "./slice/selector";

interface ListMembersProps {
  setLoading?: Function;
}

const headers: HeaderProps[] = [
  { name: "serial", align: "center", isCommonLabel: true, width: 88 },
  { name: "username" },
  { name: "fullname" },
  { name: "phoneNumber" },
  { name: "email" },
  { name: "nothing", isCommonLabel: true, align: "right", width: 80 },
];

const ListMembers = React.memo(({ setLoading }: ListMembersProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { listMembers } = useAppSelector(selectMember);
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
  const [showDialog, setShowdialog] = useState<string | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleFetchData = (params: Filter) => {
    showLoading();
    dispatch(
      memberActions.getAllMembers(params, (error) => {
        if (error) {
          showErrorSnackbar(t(`member.${error}`));
        }
        hideLoading();
      })
    );
  };

  const { filter, onFilterToQueryString } = useFilter({
    onFetchData: handleFetchData,
  });

  const handleShowDialog = useCallback(
    (action: string | undefined, id?: string) => {
      if (id) {
        setSelectedItem(id);
      }
      setShowdialog(action);
    },
    []
  );

  const handleDeleteMember = () => {
    setShowdialog(undefined);
    showLoading();
    dispatch(
      memberActions.deleleMember(selectedItem, (error) => {
        if (error) {
          hideLoading();
          showErrorSnackbar(t(`member.${error}`));
        } else {
          hideLoading();
          showSuccessSnackbar(t("member.deleteSuccess"));
          handleFetchData({});
        }
      })
    );
  };

  const handleCloseDialog = useCallback(() => {
    setShowdialog(undefined);
  }, []);

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

  const renderItem = useCallback((item: Member, index: number) => {
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

  const DeleteDialogContent = useMemo(() => {
    return (
      <Box>
        <Typography>{t("member.acceptDeleteMember")}</Typography>
        <Grid container justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 2 }}
            onClick={handleDeleteMember}
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
      dispatch(memberActions.getAllMembersSuccess({}));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <PageTitle variant="h4">{t(`member.listMembers`)}</PageTitle>
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
          items={listMembers?.data}
          total={listMembers?.total}
          pageResponse={listMembers?.page}
          sizeResponse={listMembers?.size}
          tableName="member"
          filter={filter}
          onFetchDataForPage={handleFetchDataForPage}
          // onSelectRow={handleSelectRow}
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
            <AddMember
              onCloseDialog={handleCloseDialog}
              onFetchData={handleFetchData}
              showLoading={showLoading}
              hideLoading={hideLoading}
            />
          }
          onCancel={handleCloseDialog}
          maxWidth="md"
        />
      </Paper>
    </MainWrap>
  );
});

export default withLoading(ListMembers);
