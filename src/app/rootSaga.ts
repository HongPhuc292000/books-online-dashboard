import { all } from "redux-saga/effects";
import { authSaga } from "./pages/Auth/slice/saga";
import { bookSaga } from "./pages/Book/slice/saga";
import { authorSaga } from "./pages/Author/slice/saga";
import { categorySaga } from "./pages/Category/slice/saga";

export default function* rootSaga() {
  yield all([authSaga(), bookSaga(), authorSaga(), categorySaga()]);
}
