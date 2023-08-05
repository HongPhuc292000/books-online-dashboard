import {
  Box,
  debounce,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ActionDialog from "app/components/ActionDialog";
import DeleteDialogContent from "app/components/ActionDialog/DeleteDialogContent";
import { DeleteIconButton } from "app/components/Button";
import AddIconButton from "app/components/Button/AddIconButton";
import { DefaultEllipsisText } from "app/components/EllipsisText";
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
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Filter } from "types";
import { Book } from "types/Book";
import { CommonDialogEnum, RolesPermission } from "types/enums";

import { bookActions } from "./slice";
import { selectBook } from "./slice/selector";
import { selectAuth } from "../Auth/slice/selector";
import { checkPermission, formatVND } from "utils";

const headers: HeaderProps[] = [
  { name: "serial", align: "center", isCommonLabel: true, minWidth: 80 },
  { name: "name", minWidth: 240 },
  { name: "author", minWidth: 150 },
  { name: "defaultPriceTableTitle", align: "right" },
  { name: "reducedPriceTableTitle", align: "right" },
  { name: "view", align: "right" },
  { name: "amount", isCommonLabel: true, align: "right" },
  { name: "status", isCommonLabel: true, minWidth: 150, align: "center" },
  { name: "categories" },
  { name: "nothing", isCommonLabel: true, align: "right", minWidth: 80 },
];

interface ListBookProps {
  setLoading: Function;
}

const ListBooks = ({ setLoading }: ListBookProps) => {
  const dispatch = useAppDispatch();
  const { listBooks } = useAppSelector(selectBook);
  const { me } = useAppSelector(selectAuth);
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { t } = useTranslation();
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
  const navigate = useNavigate();
  const [showDialog, setShowdialog] = useState<string | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string>("");

  const handleFetchData = (params: Filter) => {
    showLoading();
    dispatch(
      bookActions.getAllBooks(params, (error) => {
        if (error) {
          showErrorSnackbar(t(`book.${error}`));
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

  const handleDeleteBook = () => {
    setShowdialog(undefined);
    showLoading();
    dispatch(
      bookActions.deleteBook(selectedItem, (error) => {
        if (error) {
          hideLoading();
          showErrorSnackbar(t(`book.${error}`));
        } else {
          hideLoading();
          showSuccessSnackbar(t("book.deleteSuccess"));
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

  const handleAddBook = useCallback(() => {
    navigate("add");
  }, [navigate]);

  const handleSelectRow = (id: string) => {
    navigate(`edit/${id}`);
  };

  const renderItem = useCallback(
    (item: Book, index: number) => {
      return [
        <TableContentLabel>{index}</TableContentLabel>,
        <TableContentLabel>{item.name}</TableContentLabel>,
        <TableContentLabel>{item?.authorId?.name}</TableContentLabel>,
        <TableContentLabel>{formatVND(item.defaultPrice)}</TableContentLabel>,
        <TableContentLabel>{formatVND(item?.reducedPrice)}</TableContentLabel>,
        <TableContentLabel>{item.view}</TableContentLabel>,
        <TableContentLabel>{item.amount}</TableContentLabel>,
        <StatusLabel status={item.status} />,
        <TableContentLabel>
          <DefaultEllipsisText
            width={150}
            title={item.categoryIds.map((item) => item.name).join(", ")}
          />
        </TableContentLabel>,
        <DeleteIconButton
          onDelete={handleShowDialog}
          id={item._id}
          permited={checkPermission(RolesPermission.DELETE_BOOK, me?.roles)}
        />,
      ];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [me]
  );

  const handleChangeCategories = (event: SelectChangeEvent) => {
    setSelectedCategories(event.target.value as string);
  };

  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" mb={1}>
          <Grid item>
            <PageTitleContent variant="h4">
              {t(`book.listBook`)}
            </PageTitleContent>
            <Box sx={{ width: "20%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Thể loại</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCategories}
                  label="Thể loại"
                  onChange={handleChangeCategories}
                >
                  {}
                </Select>
              </FormControl>
            </Box>
            {/* <SelectMultipleItems
                  label={t("book.categories")}
                  field="categoryIds"
                  options={listCategories}
                  selected={formik.values.categoryIds}
                  handleChangeFieldValue={handleChangeFieldValue}
                /> */}
          </Grid>
          <Grid item justifyContent="flex-end">
            <AddIconButton
              onAddItem={handleAddBook}
              permited={checkPermission(RolesPermission.ADD_BOOK, me?.roles)}
            />
          </Grid>
        </Grid>
        <SearchBar
          keyword={filter.searchKey}
          onSearch={onSearch}
          placeholder={t("book.searchPlaceholder")}
        />
        <StickyHeadTable
          headers={headers}
          renderItem={renderItem}
          permited={checkPermission(RolesPermission.EDIT_BOOK, me?.roles)}
          items={listBooks?.data}
          tableName="book"
          total={listBooks?.total}
          pageResponse={listBooks?.page}
          sizeResponse={listBooks?.size}
          filter={filter}
          onFetchDataForPage={handleFetchDataForPage}
          onSelectRow={handleSelectRow}
        />
        <ActionDialog
          title={t("common.acceptDelete")}
          isOpen={showDialog === CommonDialogEnum.DELETE}
          dialogContent={
            <DeleteDialogContent
              content={t("book.acceptDeleteBook")}
              onAcceptDelete={handleDeleteBook}
              onCancel={handleCloseDialog}
            />
          }
          onCancel={handleCloseDialog}
          maxWidth="xs"
        />
      </Paper>
    </MainWrap>
  );
};

export default withLoading(ListBooks);
