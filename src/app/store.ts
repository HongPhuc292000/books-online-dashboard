import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "app/pages/Auth/slice/index";
import bookReducer from "app/pages/Book/slice/index";
import authorReducer from "app/pages/Author/slice/index";
import categoryReducer from "app/pages/Category/slice/index";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authState: authReducer,
    bookState: bookReducer,
    authorState: authorReducer,
    categoryState: categoryReducer,
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
