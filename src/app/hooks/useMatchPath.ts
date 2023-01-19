import { useLocation, useResolvedPath } from "react-router-dom";

export const useMatchPath = (link: string) => {
  const resolved = useResolvedPath(link);
  const location = useLocation();
  const match = location.pathname.includes(resolved.pathname);

  return { match };
};
