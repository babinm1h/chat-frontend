import { Routes, Route } from 'react-router-dom';
import DialogPage from '../../pages/Dialog';
import DialogsPage from '../../pages/Dialogs';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import RegisterPage from '../../pages/Register';
import Mainlayout from '../layouts/Mainlayout';
import RequireAuth from '../RequireAuth/RequireAuth';

export enum AllRoutes {
  register = '/register',
  login = '/login',
  dialogs = '/dialogs',
  settings = '/settings',
  group_dialogs = '/group-dialogs',
  home = '/',
}

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route element={<Mainlayout />} path={AllRoutes.home}>
            <Route index element={<HomePage />} />
            <Route path={AllRoutes.dialogs} element={<DialogsPage />}>
              <Route path={':id'} element={<DialogPage />} />
            </Route>
            <Route path={AllRoutes.group_dialogs} element={<DialogsPage />}>
              <Route path={':id'} element={<DialogPage />} />
            </Route>
          </Route>
        </Route>

        <Route path={AllRoutes.register} element={<RegisterPage />} />
        <Route path={AllRoutes.login} element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
