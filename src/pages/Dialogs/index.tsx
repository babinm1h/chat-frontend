import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import Mainlayout from "../../components/layouts/Mainlayout";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useSocket } from "../../hooks/useSocket";
import { addDialog, addMessage, deleteMessage, updateMessage } from "../../redux/slices/dialogs.slice";
import { IDialog, IMessage } from "../../types/entities";
import { SocketEvents } from "../../types/socketEvents.types";

const StEmpty = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.currentTheme.background.primary}; ;
`;

const DialogsPage = () => {
  const dispatch = useAppDispatch();
  const { dialogs } = useAppSelector((state) => state.dialogs);

  const { id } = useParams() as { id: string };
  const socket = useSocket();

  useEffect(() => {
    socket.connect();
    socket.on(SocketEvents.receiveMsg, (msg: IMessage) => {
      dispatch(addMessage(msg));
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

    return () => {
      socket.off(SocketEvents.receiveMsg);
      socket.off(SocketEvents.connect);
    };
  }, [socket]);

  return (
    <Mainlayout>
      <StEmpty>
        <Outlet />
      </StEmpty>
    </Mainlayout>
  );
};

export default DialogsPage;
