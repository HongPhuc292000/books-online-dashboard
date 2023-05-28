import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { SelectItemType } from "types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SelectMultipleItemProps {
  label: string;
  options?: SelectItemType[];
  selected: string[];
  handleChangeFieldValue: Function;
  field?: string;
  required?: boolean;
  showValueName?: string;
  handleFilter?: Function;
}

const SelectMultipleItems = ({
  label,
  options = [],
  handleChangeFieldValue,
  selected,
  field,
  required,
}: SelectMultipleItemProps) => {
  const viewLabel = required ? label + "*" : label;

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;
    const selectedValue = typeof value === "string" ? value.split(",") : value;
    field
      ? handleChangeFieldValue(field, selectedValue)
      : handleChangeFieldValue(selectedValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel shrink>{viewLabel}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput notched label={viewLabel} />}
        renderValue={(selected) => {
          const renderValue = options
            .filter((option) => selected.includes(option._id))
            .map((option) => option.name);

          return renderValue.join(", ");
        }}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            <Checkbox checked={selected.indexOf(option._id) > -1} />
            <ListItemText primary={option.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(SelectMultipleItems);
