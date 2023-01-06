import React, { useEffect } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import AppRoutes from './components/AppRoutes';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { checkAuth } from './redux/thunks/auth.thunks';
import { ToastContainer } from 'react-toastify';
import theme, { DarkTheme, LightTheme } from './styles/theme';
import 'react-toastify/dist/ReactToastify.css';
import { AppThemes } from './context/themeContext';
import { useTheme } from './hooks/useTheme';
import { useSocket } from './hooks/useSocket';
import { SocketEvents } from './types/socketEvents.types';
import { useParams } from 'react-router-dom';
import NotifiedMessage from './components/NotifiedMessage';
import { incrFriendRequsts, userSelector } from './redux/slices/auth.slice';
import { addMessage, addDialog, deleteMessage, updateMessage, readMessage } from './redux/slices/dialogs.slice';
import { addRequest } from './redux/slices/friends.slice';
import { IMessage, IDialog, IFriendRequest } from './types/entities';
import { notifyMessage } from './utils/toast.helpers';

const sound = new Audio('/sounds/msg.mp3');

const App = () => {
  const dispatch = useAppDispatch();
  const isCheckingAuth = useAppSelector((state) => state.auth.isCheckingAuth);
  const auth = useAppSelector(userSelector);
  const themeCtx = useTheme();

  const { id } = useParams() as { id: string };
  const socket = useSocket();

  useEffect(() => {
    socket.on(SocketEvents.receiveMsg, (msg: IMessage) => {
      dispatch(addMessage(msg));
      sound.play();
      if (!id || +id !== +msg.dialogId) {
        notifyMessage(<NotifiedMessage message={msg} />);
      }
    });

    socket.on(SocketEvents.createDialog, ({ dialog }: { dialog: IDialog }) => {
      dispatch(addDialog(dialog));
    });

    socket.on(SocketEvents.deleteMsg, (msg: IMessage) => {
      dispatch(deleteMessage(msg));
    });

    socket.on(SocketEvents.updateMsg, (msg: IMessage) => {
      dispatch(updateMessage(msg));
    });

    socket.on(SocketEvents.readMsg, (msg: IMessage) => {
      dispatch(readMessage(msg));
    });

    socket.on(SocketEvents.receiveFriendReq, (req: IFriendRequest) => {
      dispatch(incrFriendRequsts());
      dispatch(addRequest(req));
      sound.play();
    });

    return () => {
      // socket.off(SocketEvents.receiveMsg);
      socket.off(SocketEvents.connect);
    };
  }, [socket, id]);

  useEffect(() => {
    if (!auth) return;
    socket.connect();
  }, [auth]);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const themeSettings: DefaultTheme = {
    colors: theme.colors,
    fontSize: theme.fontSize,
    shadow: theme.shadow,
    currentTheme: themeCtx.theme === AppThemes.dark ? DarkTheme : LightTheme,
  };

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
