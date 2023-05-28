import { Autocomplete, Stack, TextField } from "@mui/material";
import * as React from "react";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { SelectItemType } from "types";

interface SelectSingleItemProps {
  label: string;
  field: string;
  allItems?: SelectItemType[];
  selected: string;
  setFieldValue: Function;
  required?: boolean;
}

const SelectSingleItem = React.memo(
  ({
    field,
    allItems = [],
    selected,
    setFieldValue,
    label,
    required = false,
  }: SelectSingleItemProps) => {
    const { t } = useTranslation();

    const handleChange = (
      event: SyntheticEvent<Element, Event>,
      value: SelectItemType | string | null
    ) => {
      if (!value) {
        setFieldValue(field, null);
      } else {
        setFieldValue(field, typeof value === "string" ? value : value?._id);
      }
    };

    return (
      <Stack spacing={2}>
        <Autocomplete
          options={allItems}
          freeSolo
          onChange={handleChange}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
          value={allItems.find((item) => item._id === selected) || null}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option._id}>
                {option.name}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`${label}${required ? "*" : ""}`}
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
