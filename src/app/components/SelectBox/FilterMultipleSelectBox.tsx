import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

interface SelectMultipleItemProps {
  tableName?: string;
  field: string;
  allItems?: any[];
  selected: string[];
  setFieldValue?: Function;
  labelValue: string;
  required?: boolean;
  showValueName?: string;
  handleFilter?: Function;
}

const FilterMultipleSelectBox = React.memo(
  ({
    tableName,
    field,
    allItems = [],
    selected,
    setFieldValue,
    labelValue,
    required,
    showValueName,
    handleFilter,
  }: SelectMultipleItemProps) => {
    const { t } = useTranslation();

    const handleChange = (
      event: React.SyntheticEvent<Element, Event>,
      value: string[] | null
    ) => {
      if (setFieldValue) {
        setFieldValue(field, value);
      }
      if (handleFilter) {
        handleFilter(value);
      }
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
          return showValueName
            ? allOptionLabel?.[showValueName]
            : allOptionLabel?.name || "";
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

export default FilterMultipleSelectBox;
