import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SelectItemType } from "types";
import { useTranslation } from "react-i18next";

interface SelectMultipleItemProps {
  tableName?: string;
  field: string;
  allItems?: SelectItemType[];
  selected: string[];
  setFieldValue: Function;
  labelValue: string;
  required?: boolean;
}

const SelectMultipleItems = React.memo(
  ({
    tableName,
    field,
    allItems = [],
    selected,
    setFieldValue,
    labelValue,
    required,
  }: SelectMultipleItemProps) => {
    const { t } = useTranslation();

    const handleChange = (
      event: React.SyntheticEvent<Element, Event>,
      value: string[] | null
    ) => {
      setFieldValue(field, value);
    };

    return (
      <Autocomplete
        fullWidth
        multiple
        freeSolo
        limitTags={1}
        options={allItems.map((item) => item._id)}
        getOptionLabel={(option) => {
          const allOptionLabel = allItems.find((item) => item._id === option);
          return allOptionLabel?.name || "";
        }}
        onChange={handleChange}
        value={selected || undefined}
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
    );
  }
);

export default SelectMultipleItems;
