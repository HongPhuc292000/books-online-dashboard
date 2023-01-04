import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";

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
const SUPER_ADMIN = "SUPER_ADMIN";

interface SelectRolesProps {
  field: string;
  tableName?: string;
  required?: boolean;
  allItems: string[];
  itemLabel?: string;
  selected: string[];
  setFieldValue: Function;
}

const SelectRoles = React.memo(
  ({
    field,
    tableName = "common",
    required = false,
    allItems,
    itemLabel = "enums",
    selected,
    setFieldValue,
  }: SelectRolesProps) => {
    const { t } = useTranslation();

    const handleChangeValue = (event: SelectChangeEvent<typeof selected>) => {
      const {
        target: { value },
      } = event;
      setFieldValue(
        field,
        typeof value === "string" ? value.split(",") : value
      );
    };

    return (
      <FormControl fullWidth>
        <InputLabel id="multiple-checkbox-label" shrink>{`${t(
          `${tableName}.${field}`
        )}${required ? "*" : ""}`}</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          name={field}
          multiple
          value={selected}
          onChange={handleChangeValue}
          input={
            <OutlinedInput
              notched
              label={`${t(`${tableName}.${field}`)}${required ? "*" : ""}`}
            />
          }
          renderValue={() => {
            const renderValue = selected.map((item) =>
              t(`${itemLabel}.${item}`)
            );
            return renderValue.join(", ");
          }}
          MenuProps={MenuProps}
        >
          <MenuItem
            value={SUPER_ADMIN}
            onChange={() => {
              selected.indexOf(SUPER_ADMIN) > -1
                ? setFieldValue(field, [])
                : setFieldValue(field, [SUPER_ADMIN]);
            }}
          >
            <Checkbox checked={selected.indexOf(SUPER_ADMIN) > -1} />
            <ListItemText primary={t(`${itemLabel}.${SUPER_ADMIN}`)} />
          </MenuItem>
          {allItems.map((item) => (
            <MenuItem
              key={item}
              value={item}
              disabled={selected.indexOf(SUPER_ADMIN) > -1}
            >
              <Checkbox
                checked={
                  selected.indexOf(item) > -1 ||
                  selected.indexOf(SUPER_ADMIN) > -1
                }
              />
              <ListItemText primary={t(`${itemLabel}.${item}`)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);

export default SelectRoles;
