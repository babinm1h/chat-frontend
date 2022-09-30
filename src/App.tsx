import React, { useEffect } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import AppRoutes from "./components/AppRoutes";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import { checkAuth } from "./redux/thunks/auth.thunks";
import { ThemeTypes } from "./styles/styled";
import theme, { DarkTheme, LightTheme } from "./styles/theme";

const App = () => {
  const dispatch = useAppDispatch();
  const isCheckingAuth = useAppSelector((state) => state.auth.isCheckingAuth);
  const currentTheme: ThemeTypes = (localStorage.getItem("chatTheme") as "light" | "dark") || "dark";

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const themeSettings: DefaultTheme = {
    colors: theme.colors,
    fontSize: theme.fontSize,
    shadow: theme.shadow,
    currentTheme: currentTheme === "dark" ? DarkTheme : LightTheme,
  };

  if (isCheckingAuth) {
    return <>Loading</>;
  }

  return (
    <ThemeProvider theme={themeSettings as DefaultTheme}>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
