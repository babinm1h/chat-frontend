import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotifiedMessage from '../../components/NotifiedMessage';
import { incrFriendRequsts } from '../../redux/slices/auth.slice';
import { setCaller, setIsCalling } from '../../redux/slices/call.slice';
import { addMessage, addDialog, deleteMessage, updateMessage, readMessage } from '../../redux/slices/dialogs.slice';
import { addRequest } from '../../redux/slices/friends.slice';
import { IMessage, IDialog, IFriendRequest, IUser } from '../../types/entities';
import { SocketEvents } from '../../types/socketEvents.types';
import { notifyMessage, notifyFriendRequest } from '../../utils/toast.helpers';
import { useAppDispatch } from '../useAppDispatch';
import { useSocket } from '../useSocket';

const sound = new Audio('/sounds/msg.mp3');

export const useSocketEvents = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
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
      notifyFriendRequest(req.sender.firstName);
      sound.play();
    });

    socket.on(SocketEvents.onVideoCallInit, (data: { caller: IUser }) => {
      dispatch(setIsCalling(true));
      dispatch(setCaller(data.caller));
    });

    return () => {
      socket?.off(SocketEvents.receiveMsg);
      socket?.off(SocketEvents.connect);
    };
  }, [socket, id]);
};
