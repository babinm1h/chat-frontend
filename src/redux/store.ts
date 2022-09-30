import { configureStore, combineReducers, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import dialogsSlice from "./slices/dialogs.slice";

const rootReducer = combineReducers({
  auth: authSlice,
  dialogs:dialogsSlice
});

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
