import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDialogById } from '../../redux/thunks/dialogs.thunks';
import { SocketEvents } from '../../types/socketEvents.types';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';
import { useSocket } from '../useSocket';

export const useDialog = () => {
  const [typingUser, setTypingUser] = useState('');
  const dispatch = useAppDispatch();
  const { activeDialog, isActiveDialogFetching, activeDialogError, editableMessage, replyToMsg } = useAppSelector(
    (state) => state.dialogs,
  );
  const { user } = useAppSelector((state) => state.auth);
  const socket = useSocket();
  const { id } = useParams();
  const bottomRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchDialogById(+id));
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    socket.emit(SocketEvents.joinRoom, { dialogId: id });

    socket.on(SocketEvents.userStartTyping, ({ userName, dialogId }: { dialogId: string; userName: string }) => {
      if (+id === +dialogId) {
        setTypingUser(userName);
      }
    });

    socket.on(SocketEvents.userStopTyping, ({ dialogId }: { dialogId: string; userName: string }) => {
      if (+id === +dialogId) {
        setTypingUser(``);
      }
    });

    return () => {
      socket.emit(SocketEvents.leaveRoom, { dialogId: id });
    };
  }, [id, socket]);

  return {
    activeDialog,
    isActiveDialogFetching,
    activeDialogError,
    user,
    typingUser,
    editableMessage,
    replyToMsg,
    bottomRef,
  };
};
