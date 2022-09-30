import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import AuthPage from "../../pages/Auth";
import DialogPage from "../../pages/Dialog";
import DialogsPage from "../../pages/Dialogs";

export enum AllRoutes {
  register = "/register",
  login = "/login",
  main = "/dialogs",
}

const AppRoutes = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <>
      <Routes>
        {isAuth ? (
          <>
            <Route path={AllRoutes.register} element={<AuthPage />} />
            <Route path={AllRoutes.login} element={<AuthPage />} />
            <Route path={AllRoutes.main} element={<DialogsPage />}>
              <Route path={":id"} element={<DialogPage />} />
            </Route>
          </>
        ) : (
          <>
            <Route path={AllRoutes.register} element={<AuthPage />} />
            <Route path={AllRoutes.login} element={<AuthPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;
