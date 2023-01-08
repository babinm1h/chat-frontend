import { io } from 'socket.io-client';
import { createContext } from 'react';

export const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:7777', {
  withCredentials: true,
  transports: ['websocket'],
});

export const SocketContext = createContext(socket);
