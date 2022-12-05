import { Paper, Typography } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingDataTable";
import { PageTitle } from "app/components/Label";
import MainWrap from "app/components/Layouts/MainWrap";
import StickyHeadTable from "app/components/Table";
import { HeaderProps } from "app/components/Table/TableHeader";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import { useEffect } from "react";
import { Book } from "types/Book";

import { bookActions } from "./slice";
import { selectBook } from "./slice/selector";

interface ListBookProps {
  setLoading: Function;
}

const ListBooks = ({ setLoading }: ListBookProps) => {
  const dispatch = useAppDispatch();
  const { listBook } = useAppSelector(selectBook);
  const { showLoading, hideLoading } = useLoading({ setLoading });

  const headers: HeaderProps[] = [
    { name: "name" },
    { name: "caregories" },
    { name: "author" },
    { name: "publishedDate" },
  ];

  const renderItem = (item: Book) => {
    return [
      <Typography>{item.name}</Typography>,
      <Typography>{item.categories}</Typography>,
      <Typography>{item.author}</Typography>,
      <Typography>{item.publishedDate}</Typography>,
    ];
  };

  useEffect(() => {
    showLoading();
    dispatch(
      bookActions.getAllBooks(() => {
        hideLoading();
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(listBook);

  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <PageTitle variant="h4">Danh sách sách</PageTitle>
        <StickyHeadTable
          headers={headers}
          renderItem={renderItem}
          items={listBook}
          tableName="book"
        />
      </Paper>
    </MainWrap>
  );
};

export default withLoading(ListBooks);
