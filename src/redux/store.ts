import { configureStore, combineReducers, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { dialogsApi } from "./services/dialogsApi";
import { messagesApi } from "./services/messagesApi";
import authSlice from "./slices/auth.slice";
import dialogsSlice from "./slices/dialogs.slice";

const rootReducer = combineReducers({
  auth: authSlice,
  dialogs: dialogsSlice,
  [dialogsApi.reducerPath]: dialogsApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dialogsApi.middleware, messagesApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
