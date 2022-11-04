import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDialogById } from "../../redux/thunks/dialogs.thunks";
import { SocketEvents } from "../../types/socketEvents.types";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";
import { useSocket } from "../useSocket";

export const useDialog = () => {
  const [typingUser, setTypingUser] = useState("");
  const dispatch = useAppDispatch();
  const {
    activeDialog,
    isActiveDialogFetching,
    activeDialogError,
    editableMessage,
    messageContextMenuIsOpen,
  } = useAppSelector((state) => state.dialogs);
  const { user } = useAppSelector((state) => state.auth);

  const socket = useSocket();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchDialogById(+id));
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    socket.emit(SocketEvents.joinRoom, { dialogId: id });

    socket.on(SocketEvents.userStartTyping, ({ userName }: { dialogId: number; userName: string }) => {
      setTypingUser(userName);
    });

    socket.on(SocketEvents.userStopTyping, ({ userName }: { dialogId: number; userName: string }) => {
      setTypingUser("");
    });

    return () => {
      socket.emit(SocketEvents.leaveRoom, { dialogId: id });
    };
  }, [id]);

  return {
    activeDialog,
    isActiveDialogFetching,
    activeDialogError,
    user,
    typingUser,
    editableMessage,
    messageContextMenuIsOpen,
  };
};
