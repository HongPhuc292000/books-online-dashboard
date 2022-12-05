import React from "react";

export const useLoading = (
  props: any & { setLoading: (loading: boolean) => void }
) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const showLoading = () => {
    if (props.setLoading) {
      props.setLoading(true);
      setIsLoading(true);
    }
  };

  const hideLoading = () => {
    if (props.setLoading) {
      props.setLoading(false);
      setIsLoading(false);
    }
  };

  return { showLoading, hideLoading, isLoading };
};
