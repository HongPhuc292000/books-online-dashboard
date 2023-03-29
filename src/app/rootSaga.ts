import { all } from "redux-saga/effects";
import { authSaga } from "./pages/Auth/slice/saga";
import { bookSaga } from "./pages/Book/slice/saga";
import { authorSaga } from "./pages/Author/slice/saga";
import { categorySaga } from "./pages/Category/slice/saga";
import { memberSaga } from "./pages/Member/slice/saga";
import { discountSaga } from "./pages/Discount/slice/saga";
import { customerSaga } from "./pages/Customer/slice/saga";
import { orderSaga } from "./pages/Order/slice/saga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    bookSaga(),
    authorSaga(),
    categorySaga(),
    memberSaga(),
    discountSaga(),
    customerSaga(),
    orderSaga(),
  ]);
}
