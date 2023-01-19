import { Paper } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingDataTable";
import { PageTitleContent } from "app/components/Label";
import MainWrap from "app/components/Layouts/MainWrap";
import React from "react";
import { useTranslation } from "react-i18next";

const ListOrders = React.memo(() => {
  const { t } = useTranslation();
  return (
    <MainWrap>
      <Paper elevation={3} sx={{ p: 3 }}>
        <PageTitleContent variant="h4">
          {t(`order.listOrders`)}
        </PageTitleContent>
      </Paper>
    </MainWrap>
  );
});

export default withLoading(ListOrders);
