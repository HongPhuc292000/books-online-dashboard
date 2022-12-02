import { Box, CircularProgress } from "@mui/material";
import * as React from "react";

export function withLoading(WrappedComponent: React.ElementType) {
  function HOC(props: any) {
    const [loading, setLoading] = React.useState<boolean>(false);
    return (
      <>
        {loading && (
          <Box position="fixed" bottom={20} right={20} zIndex={9999}>
            <CircularProgress size={48} thickness={4} color="primary" />
          </Box>
        )}
        <WrappedComponent {...props} setLoading={setLoading} />
      </>
    );
  }
  return HOC;
}
