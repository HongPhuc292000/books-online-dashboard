import { Paper, Typography } from "@mui/material";
import { PageTitle } from "app/components/Label";
import MainWrap from "app/components/Layouts/MainWrap";
import StickyHeadTable from "app/components/Table";
import { HeaderProps } from "app/components/Table/TableHeader";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Book } from "types/Book";

import { bookActions } from "./slice";
import { selectBook } from "./slice/selector";

const ListBooks = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { listBook } = useAppSelector(selectBook);

  const headers: HeaderProps[] = [
    { name: "name", label: "Name" },
    { name: "caregories", label: "Caregories" },

    {
      name: "author",
      label: "Author",
    },
    {
      name: "publishedDate",
      label: "Published Date",
    },
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
    dispatch(
      bookActions.getAllBooks(() => {
        console.log("ok");
      })
    );
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
        />
      </Paper>
    </MainWrap>
  );
};

export default ListBooks;
