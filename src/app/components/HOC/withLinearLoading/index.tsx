import { Box, LinearProgress } from "@mui/material";
import * as React from "react";

export function withLoading(WrappedComponent: React.ElementType) {
  function HOC(props: any) {
    const [loading, setLoading] = React.useState<boolean>(false);
    return (
      <>
        {loading && (
          <Box position="fixed" top={0} left={0} right={0} zIndex={9999}>
            <LinearProgress
              color="secondary"
              sx={{
                height: 6,
              }}
            />
          </Box>
        )}
        <WrappedComponent {...props} setLoading={setLoading} />
      </>
    );
  }
  return HOC;
}
