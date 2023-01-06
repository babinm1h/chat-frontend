import React, { FC } from 'react';
import styled from 'styled-components';
import { CheckIcon, CloseIcon } from '../../../../assets/icons';
import { FriendRequestStatus, IFriendRequest } from '../../../../types/entities';
import UserAvatar from '../../../UserAvatar';

const StReq = styled.div`
  width: 100%;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  border-radius: 6px;
`;

const StInfo = styled.div`
  width: 100%;
  flex: 1 1 auto;
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

const StBtns = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 15px;
  align-items: center;
`;

const StAccepted = styled.span`
  color: lime;
`;

const StRejected = styled.span`
  color: red;
`;

interface IProps {
  req: IFriendRequest;
  handleAccept: (reqId: number) => void;
  handleReject: (reqId: number) => void;
}

const RequestItem: FC<IProps> = ({ req, handleAccept, handleReject }) => {
  return (
    <StReq>
      <UserAvatar user={req.sender} fakeSize={'45px'} size="medium" />
      <StInfo>
        <p>{`${req.sender.firstName} ${req.sender.lastName}`}</p>
        <div>
          <img src={`https://flagcdn.com/${req.sender.country.toLowerCase()}.svg`} alt="flag" width={24} height={14} />
        </div>
      </StInfo>
      {req.status === FriendRequestStatus.accepted ? (
        <StAccepted>ACCEPTED</StAccepted>
      ) : req.status === FriendRequestStatus.rejected ? (
        <StRejected>REJECTED</StRejected>
      ) : (
        <StBtns>
          <button onClick={() => handleAccept(req.id)}>
            <CheckIcon size={22} color={'lime'} />
          </button>
          <button onClick={() => handleReject(req.id)}>
            <CloseIcon size={22} color={'red'} />
          </button>
        </StBtns>
      )}
    </StReq>
  );
};

export default RequestItem;
