import * as React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface RadioSingleItemProps {
  allItems: string[];
  field: string;
  labelValue?: string;
  tableName?: string;
  isRow?: boolean;
  selected: string;
  setFieldValue: Function;
}

const RadioSingleItem = React.memo(
  ({
    allItems,
    field,
    labelValue = "enums",
    tableName = "common",
    isRow = false,
    selected,
    setFieldValue,
  }: RadioSingleItemProps) => {
    const { t } = useTranslation();

    return (
      <FormControl fullWidth>
        <FormLabel id="radio-buttons-group-label" sx={{ fontSize: "0.75rem" }}>
          {t(`${tableName}.${field}`)}
        </FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          name={field}
          row={isRow}
          sx={{ justifyContent: "space-between" }}
          onChange={(e) => {
            setFieldValue(field, e.target.value);
          }}
          value={selected}
        >
          {allItems.map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={<Radio />}
              label={t(`${labelValue}.${item}`)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
);

export default RadioSingleItem;
