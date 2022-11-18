import { Backdrop, CircularProgress } from "@mui/material";
import * as React from "react";

export function withLoading(WrappedComponent: React.ElementType) {
  function HOC(props: any) {
    const [loading, setLoading] = React.useState<boolean>(false);
    return (
      <>
        {loading && (
          <Backdrop
            sx={{
              color: (theme) => theme.palette.common.white,
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loading}
          >
            <CircularProgress size={60} thickness={4} color="primary" />
          </Backdrop>
        )}
        <WrappedComponent {...props} setLoading={setLoading} />
      </>
    );
  }
  return HOC;
}
