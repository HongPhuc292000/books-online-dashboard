import { styled } from "@mui/material";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { EnableEnum, OrderStatusesEnum } from "types/enums";

interface StatusLabelProps {
  status: string;
}

const CommonStatusLabel = styled("span")(({ theme }) => ({
  fontSize: 12,
  padding: theme.spacing(0.5, 1),
  fontWeight: 700,
  borderRadius: 10,
}));

const SuccessLabel = styled(CommonStatusLabel)(({ theme }) => ({
  color: theme.palette.success.main,
  border: `1px solid ${theme.palette.success.main}`,
}));

const ErrorLabel = styled(CommonStatusLabel)(({ theme }) => ({
  color: theme.palette.error.main,
  border: `1px solid ${theme.palette.error.main}`,
}));

const InfoLabel = styled(CommonStatusLabel)(({ theme }) => ({
  color: theme.palette.info.main,
  border: `1px solid ${theme.palette.info.main}`,
}));

const PrimaryLabel = styled(CommonStatusLabel)(({ theme }) => ({
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
}));

const LightGreenLabel = styled(CommonStatusLabel)(() => ({
  color: "#a5b802",
  border: "1px solid #a5b802",
}));

const PurpleLabel = styled(CommonStatusLabel)(() => ({
  color: "#4527a0",
  border: "1px solid #4527a0",
}));

const GreyLabel = styled(CommonStatusLabel)(() => ({
  color: "#616161",
  border: "1px solid #616161",
}));
const PrimaryTypes: string[] = [OrderStatusesEnum.INCART];

const SuccessTypes: string[] = [EnableEnum.ENABLE, OrderStatusesEnum.DONE];

const InfoTypes: string[] = [OrderStatusesEnum.DELIVERING];

const ErrorTypes: string[] = [EnableEnum.DISABLE];

const LightGreenTypes: string[] = [OrderStatusesEnum.ORDERED];

const PurpleTypes: string[] = [];

const StatusLabel = ({ status }: StatusLabelProps) => {
  const { t } = useTranslation();
  if (!status || isEmpty(status)) return <></>;
  const isMatchedStatus = (listStatus: string[]) =>
    listStatus.find((color) => color === status);
  switch (status) {
    case isMatchedStatus(PrimaryTypes):
      return <PrimaryLabel>{t(`enums.${status}`)}</PrimaryLabel>;
    case isMatchedStatus(SuccessTypes):
      return <SuccessLabel>{t(`enums.${status}`)}</SuccessLabel>;
    case isMatchedStatus(InfoTypes):
      return <InfoLabel>{t(`enums.${status}`)}</InfoLabel>;
    case isMatchedStatus(ErrorTypes):
      return <ErrorLabel>{t(`enums.${status}`)}</ErrorLabel>;
    case isMatchedStatus(LightGreenTypes):
      return <LightGreenLabel>{t(`enums.${status}`)}</LightGreenLabel>;
    case isMatchedStatus(PurpleTypes):
      return <PurpleLabel>{t(`enums.${status}`)}</PurpleLabel>;
    default:
      return <GreyLabel>{t(`enums.${status}`)}</GreyLabel>;
  }
};

export default StatusLabel;
