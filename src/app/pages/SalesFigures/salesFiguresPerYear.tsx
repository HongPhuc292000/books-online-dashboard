import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { memo, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { graphOptions } from "utils";
import BigSalesFigures from "./components/BigSalesFigures";
import SmallSalesFigures from "./components/SmallSalesFigures";
import { salesFiguresActions } from "./slice";
import { selectSalesFigures } from "./slice/selector";
import { ProfitEachYearQueries, ProfitPerYearQueries } from "types/Profit";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesFiguresPerYearProps {
  setLoading: Function;
}

const SalesFiguresPerYear = memo(({ setLoading }: SalesFiguresPerYearProps) => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar } = useToastMessage();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { profitPerYear, profitEachYear } = useAppSelector(selectSalesFigures);
  const [perYearQueries, setPerYearQueries] = useState<ProfitPerYearQueries>(
    {}
  );
  const [eachYearQueries, setEachYearQueries] = useState<ProfitEachYearQueries>(
    {}
  );

  const handleFetchSalesFiguresPerYear = () => {
    showLoading();
    dispatch(
      salesFiguresActions.getSalesFiguresPerYear(perYearQueries, (err) => {
        if (err) {
          hideLoading();
          showErrorSnackbar(t(`profit.${err}`));
        } else {
          hideLoading();
        }
      })
    );
  };

  const handleFetchSalesFiguresEachYear = () => {
    showLoading();
    dispatch(
      salesFiguresActions.getSalesFiguresEachYear(eachYearQueries, (err) => {
        if (err) {
          hideLoading();
          showErrorSnackbar(t(`profit.${err}`));
        } else {
          hideLoading();
        }
      })
    );
  };

  const handleChangeProfitPerMonthQueries = (event: SelectChangeEvent) => {
    setPerYearQueries({ year: event.target.value });
  };

  const handleChangeProfitEachYearQueries = (
    event: SelectChangeEvent,
    type: "startYear" | "endYear"
  ) => {
    setEachYearQueries((prev) => ({
      ...prev,
      [type]: event.target.value as string,
    }));
  };

  useEffect(() => {
    handleFetchSalesFiguresPerYear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perYearQueries]);

  useEffect(() => {
    handleFetchSalesFiguresEachYear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eachYearQueries]);

  useEffect(() => {
    return () => {
      dispatch(salesFiguresActions.getSalesFiguresPerYearSuccess(undefined));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Grid container justifyContent="right" spacing={2} mb={3}>
          <Grid item xs={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-year-per-month">
                {t("salesFigures.year")}
              </InputLabel>
              <Select
                labelId="select-year-per-month"
                id="select-year-per-month"
                value={perYearQueries?.year?.toString()}
                label={t("salesFigures.year")}
                onChange={(event: SelectChangeEvent) => {
                  handleChangeProfitPerMonthQueries(event);
                }}
              >
                {[2017, 2018, 2019, 2020, 2021, 2022, 2023].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={3}>
            <BigSalesFigures
              label={t("salesFigures.totalSalesFigures")}
              value={profitPerYear?.totalSalesFigures}
              backgroundColor={theme.palette.primary.main}
              isCurrency={true}
            />
          </Grid>
          <Grid item xs={3}>
            <BigSalesFigures
              label={t("salesFigures.totalOrderCreated")}
              value={profitPerYear?.orderCreated}
              backgroundColor={theme.palette.secondary.main}
            />
          </Grid>
          <Grid item xs={3}>
            <BigSalesFigures
              label={t("salesFigures.totalSuccessOrder")}
              value={profitPerYear?.successOrder}
              backgroundColor={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={3}>
            <SmallSalesFigures
              mb={3}
              backgroundColor={theme.palette.secondary.main}
              label={t("salesFigures.totalProcessOrder")}
              value={profitPerYear?.processingOrder}
            />
            <SmallSalesFigures
              color={theme.palette.common.black}
              backgroundColor={theme.palette.common.white}
              label={t("salesFigures.totalCancelOrder")}
              value={profitPerYear?.cancelOrder}
            />
          </Grid>
        </Grid>
      </Paper>

      {profitEachYear ? (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Grid container justifyContent="right" spacing={2} mb={3}>
            <Grid item xs={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="select-yearStart-each-month">
                  {t("salesFigures.yearStart")}
                </InputLabel>
                <Select
                  labelId="select-yearStart-each-month"
                  id="select-yearStart-each-month"
                  value={eachYearQueries?.startYear?.toString()}
                  label={t("salesFigures.yearStart")}
                  onChange={(event: SelectChangeEvent) => {
                    handleChangeProfitEachYearQueries(event, "startYear");
                  }}
                >
                  {[2017, 2018, 2019, 2020, 2021, 2022, 2023].map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="select-yearEnd-each-month">
                  {t("salesFigures.yearEnd")}
                </InputLabel>
                <Select
                  labelId="select-yearEnd-each-month"
                  id="select-yearEnd-each-month"
                  value={eachYearQueries?.startYear?.toString()}
                  label={t("salesFigures.yearEnd")}
                  onChange={(event: SelectChangeEvent) => {
                    handleChangeProfitEachYearQueries(event, "endYear");
                  }}
                >
                  {[2017, 2018, 2019, 2020, 2021, 2022, 2023].map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Bar options={graphOptions} data={profitEachYear} />
        </Paper>
      ) : null}
    </Box>
  );
});

export default withLoading(SalesFiguresPerYear);
