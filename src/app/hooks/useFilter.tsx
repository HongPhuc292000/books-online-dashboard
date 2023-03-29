import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Filter } from "types";
import querystring from "query-string";
import { debounce } from "lodash";

interface Props {
  onFetchData: (filter: Filter) => void;
  defaultFilter?: Filter;
}

const initialFilter = {
  page: 0,
  size: 10,
};

export const useFilter = ({
  onFetchData,
  defaultFilter = initialFilter,
}: Props) => {
  const location = useLocation();
  const searchLocation = location.search;
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<Filter>(defaultFilter);

  const filterFromQuery = (query: any) => {
    const newFilter = {
      ...query,
      page: query.page ? +query.page : filter.page,
      size: query.size ? +query.size : filter.size,
    };
    return newFilter;
  };

  React.useEffect(() => {
    const params = querystring.parse(searchLocation, {
      arrayFormat: "bracket",
    });
    const newFilter: Filter = filterFromQuery(params);
    setFilter(newFilter);
    const handleFetchData = debounce(() => onFetchData(newFilter), 100);
    handleFetchData();
    // eslint-disable-next-line
  }, [searchLocation]);

  const onFilterToQueryString = React.useCallback(
    (values: any): void => {
      navigate(
        {
          pathname: location.pathname,
          search: `?${querystring.stringify(
            {
              ...values,
              page: values.page > 0 ? values.page : 0,
              size: values.size > 0 ? values.size : 10,
            },
            { arrayFormat: "bracket", skipNull: true, skipEmptyString: true }
          )}`,
        },
        { replace: true }
      );
    },
    [navigate, location]
  );

  return { filter, onFilterToQueryString, setFilter };
};
