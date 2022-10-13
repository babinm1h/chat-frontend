import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useSocket } from "../../hooks/useSocket";
import { addDialog, addMessage } from "../../redux/slices/dialogs.slice";
import { IDialog, IMessage } from "../../types/entities";
import { SocketEvents } from "../../types/socketEvents.types";

const StWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;

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
    socket.on(SocketEvents.receiveMsg, (msg: IMessage) => {
      dispatch(addMessage(msg));
    });

    socket.on(SocketEvents.createDialog, ({ dialog }: { dialog: IDialog }) => {
      console.log(dialog);
      dispatch(addDialog(dialog));
    });

    return () => {
      socket.off(SocketEvents.receiveMsg);
      socket.off(SocketEvents.connect);
    };
  }, [socket]);

  return (
    <StWrapper>
      <Sidebar />
      <StEmpty>
        <Outlet />
      </StEmpty>
    </StWrapper>
  );
};

export default DialogsPage;
