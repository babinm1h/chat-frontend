import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NotifiedMessage from '../../components/NotifiedMessage';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSocket } from '../../hooks/useSocket';
import { addDialog, addMessage, deleteMessage, readMessage, updateMessage } from '../../redux/slices/dialogs.slice';
import { IDialog, IMessage } from '../../types/entities';
import { SocketEvents } from '../../types/socketEvents.types';
import { notifyMessage } from '../../utils/toast.helpers';

const StEmpty = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.currentTheme.background.primary}; ;
`;

const DialogsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const socket = useSocket();

  useEffect(() => {
    socket.connect();
    socket.on(SocketEvents.receiveMsg, (msg: IMessage) => {
      dispatch(addMessage(msg));
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

    return () => {
      socket.off(SocketEvents.receiveMsg);
      socket.off(SocketEvents.connect);
    };
  }, [socket, id]);

  return (
    <StEmpty>
      <Outlet />
    </StEmpty>
  );
};

export default DialogsPage;
