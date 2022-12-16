import { Paper } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingDataTable";
import { PageTitle } from "app/components/Label";
import MainWrap from "app/components/Layouts/MainWrap";
import React from "react";
import { useTranslation } from "react-i18next";

const ListCustomers = React.memo(() => {
  const { t } = useTranslation();
  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <PageTitle variant="h4">{t(`customer.listCustomers`)}</PageTitle>
      </Paper>
    </MainWrap>
  );
});

export default withLoading(ListCustomers);
