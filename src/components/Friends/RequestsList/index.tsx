import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAcceptReqMutation, useRejectReqMutation } from '../../../redux/services/friendsApi';
import { decrFriendRequsts } from '../../../redux/slices/auth.slice';
import { acceptRequest, rejectRequest } from '../../../redux/slices/friends.slice';
import { fetchRequests } from '../../../redux/thunks/friends.thunks';
import { notifyError } from '../../../utils/toast.helpers';
import RequestItem from './RequestItem';

const StEmpty = styled.div`
  text-align: center;
`;

const FriendsList = () => {
  const dispatch = useAppDispatch();
  const requests = useAppSelector((state) => state.friends.requests);
  const isLoading = useAppSelector((state) => state.friends.isRequestsLoading);

  const [rejectReq] = useRejectReqMutation();
  const [acceptReq] = useAcceptReqMutation();

  const handleAccept = async (reqId: number) => {
    try {
      await acceptReq(reqId).unwrap();
      dispatch(acceptRequest(reqId));
      dispatch(decrFriendRequsts());
    } catch (err: any) {
      notifyError(err?.data?.message);
    }
  };

  const handleReject = async (reqId: number) => {
    try {
      await rejectReq(reqId).unwrap();
      dispatch(rejectRequest(reqId));
      dispatch(decrFriendRequsts());
    } catch (err: any) {
      notifyError(err?.data?.message);
    }
  };

  useEffect(() => {
    dispatch(fetchRequests());
  }, []);

  if (isLoading) return <>load</>;

  return (
    <>
      {requests.length ? (
        requests.map((req) => (
          <RequestItem key={req.id} req={req} handleReject={handleReject} handleAccept={handleAccept} />
        ))
      ) : (
        <StEmpty>The list is empty...</StEmpty>
      )}
    </>
  );
};

export default FriendsList;
