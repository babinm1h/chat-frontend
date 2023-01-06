import { configureStore, combineReducers, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import apiSlice from './services';
import authSlice from './slices/auth.slice';
import dialogsSlice from './slices/dialogs.slice';
import friendsSlice from './slices/friends.slice';
import playerSlice from './slices/player.slice';

const rootReducer = combineReducers({
  auth: authSlice,
  dialogs: dialogsSlice,
  player: playerSlice,
  friends: friendsSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
