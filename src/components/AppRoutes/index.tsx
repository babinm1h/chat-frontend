import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import DialogPage from "../../pages/Dialog";
import DialogsPage from "../../pages/Dialogs";
import LoginPage from "../../pages/Login";
import RegisterPage from "../../pages/Register";

export enum AllRoutes {
  register = "/register",
  login = "/login",
  main = "/dialogs",
  settings = "/settings",
}

const AppRoutes = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <>
      <Routes>
        {isAuth ? (
          <>
            <Route path={AllRoutes.register} element={<LoginPage />} />
            <Route path={AllRoutes.login} element={<RegisterPage />} />
            <Route path={AllRoutes.main} element={<DialogsPage />}>
              <Route path={":id"} element={<DialogPage />} />
            </Route>
          </>
        ) : (
          <>
            <Route path={AllRoutes.register} element={<RegisterPage />} />
            <Route path={AllRoutes.login} element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;
