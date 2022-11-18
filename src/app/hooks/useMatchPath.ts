import { useMatch, useResolvedPath } from "react-router-dom";

export const useMatchPath = (link: string, children?: any) => {
  const resolved = useResolvedPath(link);
  const match = Boolean(
    useMatch({
      path: children ? `${resolved.pathname}:category` : resolved.pathname,
    })
  );

  return { match };
};
