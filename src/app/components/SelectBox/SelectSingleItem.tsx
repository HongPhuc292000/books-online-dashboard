import { Autocomplete, Stack, TextField } from "@mui/material";
import * as React from "react";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { SelectItemType } from "types";

interface SelectSingleItemProps {
  tableName: string;
  field: string;
  allItems?: SelectItemType[];
  selected: string;
  setFieldValue: Function;
  labelValue: string;
  required?: boolean;
}

const SelectSingleItem = React.memo(
  ({
    tableName,
    labelValue,
    field,
    allItems = [],
    selected,
    setFieldValue,
    required = false,
  }: SelectSingleItemProps) => {
    const { t } = useTranslation();

    const handleChange = (
      event: SyntheticEvent<Element, Event>,
      value: string | null
    ) => {
      setFieldValue(field, value);
    };

    return (
      <Stack spacing={2}>
        <Autocomplete
          options={allItems.map((item) => item._id)}
          freeSolo
          onChange={handleChange}
          getOptionLabel={(option) => {
            const allOptionLabel = allItems.find((item) => item._id === option);
            return allOptionLabel?.name || "";
          }}
          value={selected || null}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`${t(`${tableName}.${labelValue}`)}${required ? "*" : ""}`}
              inputProps={{
                ...params.inputProps,
                placeholder: "",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      </Stack>
    );
  }
);

export default SelectSingleItem;
