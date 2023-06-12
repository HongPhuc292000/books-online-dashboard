import { Box, Step, StepButton, Stepper, styled } from "@mui/material";
import { useAppSelector } from "app/hooks";
import React, { memo, useEffect, useState } from "react";
import { OrderStatusesEnum } from "types/enums";
import { selectOrder } from "../slice/selector";
import { useTranslation } from "react-i18next";

const steps = [
  OrderStatusesEnum.INCART,
  OrderStatusesEnum.ORDERED,
  OrderStatusesEnum.CANCEL,
  OrderStatusesEnum.DELIVERING,
  OrderStatusesEnum.DONE,
  OrderStatusesEnum.REPAY,
];

const StepsContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2, 1, 5, 1),
}));

interface OrderStepsProps {
  formik: any;
}

const OrderSteps = memo(({ formik }: OrderStepsProps) => {
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(0);
  const { detailOrder } = useAppSelector(selectOrder);

  const handleStep = (stepIndex: number) => () => {
    setActiveStep(stepIndex);
    formik.setFieldValue("status", steps[stepIndex]);
  };

  useEffect(() => {
    if (detailOrder?.status) {
      const currentStepIndex = steps.findIndex(
        (step) => step === detailOrder.status
      );
      setActiveStep(currentStepIndex >= 0 ? currentStepIndex : 0);
    }
  }, [detailOrder]);

  return (
    <StepsContainer>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((value, index) => (
          <Step
            key={value}
            disabled={
              detailOrder?.status &&
              index < steps.findIndex((step) => detailOrder?.status === step)
            }
          >
            <StepButton
              sx={{ padding: 2 }}
              color="inherit"
              onClick={handleStep(index)}
            >
              {t(`enums.${value}`)}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </StepsContainer>
  );
});

export default OrderSteps;
