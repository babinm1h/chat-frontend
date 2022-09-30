import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../API/auth.service";
import { TLoginArgs, TRegisterArgs } from "../../types/args";
import { AuthActions } from "../types/auth.slice.types";

export const registrate = createAsyncThunk(AuthActions.register, async (args: TRegisterArgs, thunk) => {
  try {
    const data = await AuthService.register(args);
    return data;
  } catch (err: any) {
    return thunk.rejectWithValue(err.response?.data.message);
  }
});

export const login = createAsyncThunk(AuthActions.login, async (args: TLoginArgs, thunk) => {
  try {
    const data = await AuthService.login(args);
    return data;
  } catch (err: any) {
    return thunk.rejectWithValue(err.response?.data.message);
  }
});

export const checkAuth = createAsyncThunk(AuthActions.checkAuth, async (_, thunk) => {
  try {
    const data = await AuthService.checkAuth();
    return data;
  } catch (err: any) {
    return thunk.rejectWithValue(err.response?.data.message);
  }
});
