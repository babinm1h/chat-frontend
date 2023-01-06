import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { socket } from '../../../context/socketContext';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useCreateDialogMutation } from '../../../redux/services/dialogsApi';
import { useDeleteFriendMutation } from '../../../redux/services/friendsApi';
import { userSelector } from '../../../redux/slices/auth.slice';
import { addDialog } from '../../../redux/slices/dialogs.slice';
import { deleteFriend } from '../../../redux/slices/friends.slice';
import { fetchFriends } from '../../../redux/thunks/friends.thunks';
import { SocketEvents } from '../../../types/socketEvents.types';
import { notifyError } from '../../../utils/toast.helpers';
import { AllRoutes } from '../../AppRoutes';
import FriendItem from '../FriendItem';

const StEmpty = styled.div`
  text-align: center;
`;

const FriendsList = () => {
  const dispatch = useAppDispatch();
  const friends = useAppSelector((state) => state.friends.friends);
  const isFrLoading = useAppSelector((state) => state.friends.isFriendsLoading);
  const authUser = useAppSelector(userSelector);
  const [createDialog, { isLoading }] = useCreateDialogMutation();
  const nav = useNavigate();

  const onUserClick = async (id: number) => {
    try {
      if (isLoading) return;
      const data = await createDialog(id).unwrap();
      if (data && data.dialog.id) {
        nav(AllRoutes.dialogs + `/${data.dialog.id}`);
        if (data.status === 'created') {
          dispatch(addDialog(data.dialog));
          socket.emit(SocketEvents.createDialog, { dialog: data.dialog });
        }
      }
    } catch (err: any) {
      notifyError(err?.data?.message);
    }
  };

  const [fetchDeleteFriend] = useDeleteFriendMutation();

  const handleDelete = async (frId: number) => {
    try {
      await fetchDeleteFriend(frId);
      dispatch(deleteFriend(frId));
    } catch (err: any) {
      notifyError(err?.data?.message);
    }
  };

  useEffect(() => {
    dispatch(fetchFriends());
  }, []);

  if (isFrLoading) return <>load</>;

  return (
    <>
      {friends.length ? (
        friends.map((fr) => {
          const friend = fr.receiver.id === authUser?.id ? fr.sender : fr.receiver;
          return (
            <FriendItem
              key={fr.id}
              friend={friend}
              handleDelete={handleDelete}
              onUserClick={onUserClick}
              friendEntityId={fr.id}
            />
          );
        })
      ) : (
        <StEmpty>The list is empty...</StEmpty>
      )}
    </>
  );
};

export default FriendsList;
