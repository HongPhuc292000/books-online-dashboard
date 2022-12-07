import {
  Button,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  minWidth?: number;
  placeholder?: string | null;
  keyword?: string;
  onSearch: (values: string) => void;
}

const SearchBar = memo(
  ({ minWidth = 330, placeholder, keyword, onSearch }: SearchBarProps) => {
    const { t } = useTranslation();
    const [searchKey, setSearchKey] = useState("");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleChangeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKey(e.target.value);
    };

    const handleAcceptSearch = () => {
      onSearch(searchKey);
    };

    useEffect(() => {
      if (keyword) {
        setSearchKey(keyword);
      }
    }, [keyword]);

    return (
      <Grid container>
        <TextField
          size="small"
          sx={{
            minWidth: fullScreen ? 0 : minWidth,
            flex: fullScreen ? 1 : "none",
          }}
          placeholder={`${placeholder ? placeholder : t("common.search")}`}
          value={searchKey}
          onChange={handleChangeSearchKey}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAcceptSearch();
            }
          }}
        />
        <Button
          variant="contained"
          color="success"
          sx={{ ml: 1 }}
          onClick={handleAcceptSearch}
        >
          {t("common.search")}
        </Button>
      </Grid>
    );
  }
);

export default SearchBar;
