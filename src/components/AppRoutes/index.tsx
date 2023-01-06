import { Routes, Route } from 'react-router-dom';
import DialogPage from '../../pages/Dialog';
import DialogsPage from '../../pages/Dialogs';
import FriendsPage from '../../pages/Friends';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import Page404 from '../../pages/Page404';
import RegisterPage from '../../pages/Register';
import FriendsList from '../Friends/FriendsList';
import RequestsList from '../Friends/RequestsList';
import Mainlayout from '../layouts/Mainlayout';
import PanelLayout from '../layouts/PanelLayout';
import RequireAuth from '../RequireAuth/RequireAuth';

export enum AllRoutes {
  register = '/register',
  login = '/login',
  dialogs = '/dialogs',
  settings = '/settings',
  group_dialogs = '/group-dialogs',
  home = '/',
  friends = '/friends',
  friendsReqs = '/friend-requests',
}

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route element={<PanelLayout />}>
            <Route index element={<HomePage />} />
            <Route element={<FriendsPage />}>
              <Route path={AllRoutes.friends} element={<FriendsList />} />
              <Route element={<RequestsList />} path={AllRoutes.friendsReqs} />
            </Route>
          </Route>

          <Route element={<Mainlayout />} path={AllRoutes.home}>
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
        <Route path={'/*'} element={<Page404 />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
