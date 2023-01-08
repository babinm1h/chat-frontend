import { useEffect } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import AppRoutes from './components/AppRoutes';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { checkAuth } from './redux/thunks/auth.thunks';
import { ToastContainer } from 'react-toastify';
import theme, { DarkTheme, LightTheme } from './styles/theme';
import { AppThemes } from './context/themeContext';
import { useTheme } from './hooks/useTheme';
import { useSocket } from './hooks/useSocket';
import { userSelector } from './redux/slices/auth.slice';
import Peer from 'peerjs';
import { useSocketEvents } from './hooks/componentsHooks/useSocketEvents';
import 'react-toastify/dist/ReactToastify.css';
import CallingModal from './components/Call/CallingModal';
import WaitingAnswerModal from './components/Call/WaitingAnswerModal';
import { setPeer } from './redux/slices/call.slice';
import { useCallEvents } from './hooks/componentsHooks/useCallEvents';

const App = () => {
  const dispatch = useAppDispatch();
  const isCheckingAuth = useAppSelector((state) => state.auth.isCheckingAuth);
  const auth = useAppSelector(userSelector);

  const themeCtx = useTheme();
  const socket = useSocket();
  useSocketEvents();
  useCallEvents(auth);

  useEffect(() => {
    if (!auth) return;
    socket.connect();

    const newPeer = new Peer(`${auth.id}`, {
      config: {
        iceServers: [
          {
            url: 'stun:stun.l.google.com:19302',
          },
          {
            url: 'stun:stun1.l.google.com:19302',
          },
        ],
      },
    });

    dispatch(setPeer(newPeer));
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
      <CallingModal />
      <WaitingAnswerModal />
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
