import React, { useEffect, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import AppRoutes from './components/AppRoutes';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { checkAuth } from './redux/thunks/auth.thunks';
import { ToastContainer } from 'react-toastify';
import theme, { DarkTheme, LightTheme, ThemesEnum } from './styles/theme';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useAppDispatch();
  const isCheckingAuth = useAppSelector((state) => state.auth.isCheckingAuth);
  const [currTheme, setCurrTheme] = useState<ThemesEnum>(getTheme());

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const themeSettings: DefaultTheme = {
    colors: theme.colors,
    fontSize: theme.fontSize,
    shadow: theme.shadow,
    currentTheme: currTheme === ThemesEnum.dark ? DarkTheme : LightTheme,
  };

  function getTheme() {
    const theme = localStorage?.getItem('chatTheme');
    if (theme && (Object.values(ThemesEnum) as string[]).includes(theme)) {
      return theme as ThemesEnum;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    if (userMedia.matches) return ThemesEnum.dark;

    return ThemesEnum.dark;
  }

  useEffect(() => {
    document.documentElement.dataset.theme = currTheme;
    localStorage.setItem('chatTheme', currTheme);
  }, [currTheme]);

  if (isCheckingAuth) {
    return <>Loading</>;
  }

  return (
    <ThemeProvider theme={themeSettings as DefaultTheme}>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  );
};

export default App;
