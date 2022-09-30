import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthResponse } from "../../API/auth.service";
import { IUser } from "../../types/entities";
import { removeTokenCookie } from "../../utils/cookie.helpers";
import { checkAuth, login, registrate } from "../thunks/auth.thunks";
import { IAuthState } from "../types/auth.slice.types";

const initialState: IAuthState = {
  isProcessing: true,
  loginError: "",
  registerError: "",
  user: null,
  isCheckingAuth: true,
  isAuth: false,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout(state) {
      state.user = null;
      state.loginError = "";
      state.registerError = "";
      state.isAuth = false;
      removeTokenCookie();
    },
  },
  extraReducers: {
    [registrate.fulfilled.type]: (state, action: PayloadAction<IAuthResponse>) => {
      state.loginError = "";
      state.registerError = "";
      state.isProcessing = false;
      state.user = action.payload.user;
      state.isAuth = true;
    },

    [registrate.pending.type]: (state, action: PayloadAction<IAuthResponse>) => {
      state.isProcessing = true;
    },

    [registrate.rejected.type]: (state, action: PayloadAction<string>) => {
      state.registerError = action.payload;
    },

    [login.fulfilled.type]: (state, action: PayloadAction<IAuthResponse>) => {
      state.loginError = "";
      state.registerError = "";
      state.isProcessing = false;
      state.user = action.payload.user;
      state.isAuth = true;
    },

    [login.pending.type]: (state, action) => {
      state.isProcessing = true;
    },

    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loginError = action.payload;
    },

    [checkAuth.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isCheckingAuth = false;
      state.user = action.payload;
      state.isAuth = true;
    },

    [checkAuth.pending.type]: (state, action) => {
      state.isCheckingAuth = true;
    },

    [checkAuth.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isCheckingAuth = false;
      state.isAuth = false;
    },
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
