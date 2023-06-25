import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "app/pages/Auth/slice";
import bookReducer from "app/pages/Book/slice";
import authorReducer from "app/pages/Author/slice";
import categoryReducer from "app/pages/Category/slice";
import memberReducer from "app/pages/Member/slice";
import discountReducer from "app/pages/Discount/slice";
import customerReducer from "app/pages/Customer/slice";
import orderReducer from "app/pages/Order/slice";
import salesFiguresReducer from "app/pages/SalesFigures/slice";
import importBookReducer from "app/pages/ImportBook/slice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authState: authReducer,
    bookState: bookReducer,
    authorState: authorReducer,
    categoryState: categoryReducer,
    memberState: memberReducer,
    discountState: discountReducer,
    customerState: customerReducer,
    orderState: orderReducer,
    salesFiguresState: salesFiguresReducer,
    importBookState: importBookReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
