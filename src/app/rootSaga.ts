import { all } from "redux-saga/effects";
import { authSaga } from "./pages/Auth/slice/saga";
import { bookSaga } from "./pages/Book/slice/saga";

export default function* rootSaga() {
  yield all([authSaga(), bookSaga()]);
}
