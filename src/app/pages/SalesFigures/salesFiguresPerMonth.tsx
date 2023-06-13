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
import { ProfitEachMonthQueries, ProfitPerMonthQueries } from "types/Profit";
import { graphOptions, monthsKeyValue } from "utils";
import BigSalesFigures from "./components/BigSalesFigures";
import SmallSalesFigures from "./components/SmallSalesFigures";
import { salesFiguresActions } from "./slice";
import { selectSalesFigures } from "./slice/selector";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesFiguresPerMonthProps {
  setLoading: Function;
}

const SalesFiguresPerMonth = memo(
  ({ setLoading }: SalesFiguresPerMonthProps) => {
    const { t } = useTranslation();
    const { showLoading, hideLoading } = useLoading({ setLoading });
    const { showErrorSnackbar } = useToastMessage();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { profitPerMonth, profitEachMonth } =
      useAppSelector(selectSalesFigures);

    const [perMonthQueries, setPerMonthQueries] =
      useState<ProfitPerMonthQueries>({});
    const [eachMonthQueries, setEachMonthQueries] =
      useState<ProfitEachMonthQueries>({});

    const handleFetchSalesFiguresPerMonth = () => {
      showLoading();
      dispatch(
        salesFiguresActions.getSalesFiguresPerMonth(perMonthQueries, (err) => {
          if (err) {
            hideLoading();
            showErrorSnackbar(t(`profit.${err}`));
          } else {
            hideLoading();
          }
        })
      );
    };

    const handleFetchSalesFiguresEachMonth = () => {
      showLoading();
      dispatch(
        salesFiguresActions.getSalesFiguresEachMonth(
          eachMonthQueries,
          (err) => {
            if (err) {
              hideLoading();
              showErrorSnackbar(t(`profit.${err}`));
            } else {
              hideLoading();
            }
          }
        )
      );
    };

    const handleChangeProfitPerMonthQueries = (
      event: SelectChangeEvent,
      type: "month" | "year"
    ) => {
      setPerMonthQueries((prev) => ({
        ...prev,
        [type]: event.target.value as string,
      }));
    };

    const handleChangeProfitEachMonthQueries = (
      event: SelectChangeEvent,
      type: "startMonth" | "endMonth" | "year"
    ) => {
      setEachMonthQueries((prev) => ({
        ...prev,
        [type]: event.target.value as string,
      }));
    };

    useEffect(() => {
      handleFetchSalesFiguresPerMonth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [perMonthQueries]);

    useEffect(() => {
      handleFetchSalesFiguresEachMonth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eachMonthQueries]);

    useEffect(() => {
      return () => {
        dispatch(salesFiguresActions.getSalesFiguresPerMonthSuccess(undefined));
        dispatch(
          salesFiguresActions.getSalesFiguresEachMonthSuccess(undefined)
        );
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
                <InputLabel id="select-month-per-month">
                  {t("salesFigures.month")}
                </InputLabel>
                <Select
                  labelId="select-month-per-month"
                  id="select-month-per-month"
                  value={perMonthQueries?.month?.toString()}
                  label={t("salesFigures.month")}
                  onChange={(event: SelectChangeEvent) => {
                    handleChangeProfitPerMonthQueries(event, "month");
                  }}
                >
                  {monthsKeyValue.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {t(`monthEnums.${month.key}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="select-year-per-month">
                  {t("salesFigures.year")}
                </InputLabel>
                <Select
                  labelId="select-year-per-month"
                  id="select-year-per-month"
                  value={perMonthQueries?.year?.toString()}
                  label={t("salesFigures.year")}
                  onChange={(event: SelectChangeEvent) => {
                    handleChangeProfitPerMonthQueries(event, "year");
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
                value={profitPerMonth?.totalSalesFigures}
                backgroundColor={theme.palette.primary.main}
                isCurrency={true}
              />
            </Grid>
            <Grid item xs={3}>
              <BigSalesFigures
                label={t("salesFigures.totalOrderCreated")}
                value={profitPerMonth?.orderCreated}
                backgroundColor={theme.palette.secondary.main}
              />
            </Grid>
            <Grid item xs={3}>
              <BigSalesFigures
                label={t("salesFigures.totalSuccessOrder")}
                value={profitPerMonth?.successOrder}
                backgroundColor={theme.palette.primary.main}
              />
            </Grid>
            <Grid item xs={3}>
              <SmallSalesFigures
                mb={3}
                backgroundColor={theme.palette.secondary.main}
                label={t("salesFigures.totalProcessOrder")}
                value={profitPerMonth?.processingOrder}
              />
              <SmallSalesFigures
                color={theme.palette.common.black}
                backgroundColor={theme.palette.common.white}
                label={t("salesFigures.totalCancelOrder")}
                value={profitPerMonth?.cancelOrder}
              />
            </Grid>
          </Grid>
        </Paper>

        {profitEachMonth ? (
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Grid container justifyContent="right" spacing={2} mb={3}>
              <Grid item xs={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id="select-startmonth-each-month">
                    {t("salesFigures.monthStart")}
                  </InputLabel>
                  <Select
                    labelId="select-startmonth-each-month"
                    id="select-startmonth-each-month"
                    value={eachMonthQueries?.startMonth?.toString()}
                    label={t("salesFigures.monthStart")}
                    onChange={(event: SelectChangeEvent) => {
                      handleChangeProfitEachMonthQueries(event, "startMonth");
                    }}
                  >
                    {monthsKeyValue.map((month) => (
                      <MenuItem key={month.value} value={month.value}>
                        {t(`monthEnums.${month.key}`)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id="select-endmonth-each-month">
                    {t("salesFigures.monthEnd")}
                  </InputLabel>
                  <Select
                    labelId="select-endmonth-each-month"
                    id="select-endmonth-each-month"
                    value={eachMonthQueries?.endMonth?.toString()}
                    label={t("salesFigures.monthEnd")}
                    onChange={(event: SelectChangeEvent) => {
                      handleChangeProfitEachMonthQueries(event, "endMonth");
                    }}
                  >
                    {monthsKeyValue.map((month) => (
                      <MenuItem key={month.value} value={month.value}>
                        {t(`monthEnums.${month.key}`)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id="select-year-each-month">
                    {t("salesFigures.year")}
                  </InputLabel>
                  <Select
                    labelId="select-year-each-month"
                    id="select-year-each-month"
                    value={eachMonthQueries?.year?.toString()}
                    label={t("salesFigures.year")}
                    onChange={(event: SelectChangeEvent) => {
                      handleChangeProfitEachMonthQueries(event, "year");
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
            <Bar options={graphOptions} data={profitEachMonth} />
          </Paper>
        ) : null}
      </Box>
    );
  }
);

export default withLoading(SalesFiguresPerMonth);
