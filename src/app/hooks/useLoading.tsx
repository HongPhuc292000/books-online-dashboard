import React, { useCallback } from "react";

export const useLoading = (
  props: any & { setLoading: (loading: boolean) => void }
) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const showLoading = useCallback(() => {
    if (props.setLoading) {
      props.setLoading(true);
      setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.setLoading]);

  const hideLoading = useCallback(() => {
    if (props.setLoading) {
      props.setLoading(false);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.setLoading]);

  return { showLoading, hideLoading, isLoading };
};
