import Sidebar from "app/components/Sidebar";
import { useAppDispatch } from "app/hooks";
import { authActions } from "app/pages/Auth/slice";
import { useEffect } from "react";
import { CookiesEnum } from "types/enums";
import { decodeTokenGetId, getCookies } from "utils/cookies";

function DefaultLayout() {
  const dispatch = useAppDispatch();
  const authToken = getCookies(CookiesEnum.AUTHTOKEN);

  const handleFetchAdminInfo = () => {
    if (authToken) {
      const adminId = decodeTokenGetId(authToken);
      dispatch(authActions.getUserInfo(adminId));
    }
  };

  useEffect(() => {
    handleFetchAdminInfo();
    dispatch(authActions.getAllRoles(() => {}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);
  return <Sidebar />;
}

export default DefaultLayout;
