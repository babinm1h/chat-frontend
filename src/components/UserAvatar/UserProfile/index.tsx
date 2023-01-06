import React, { FC } from 'react';
import styled from 'styled-components';
import UserAvatar from '..';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useCreateReqMutation } from '../../../redux/services/friendsApi';
import { userSelector } from '../../../redux/slices/auth.slice';
import { lineClampMixin } from '../../../styles/common/mixins';
import { IUser } from '../../../types/entities';
import { notifyError, notifyMessage } from '../../../utils/toast.helpers';
import Button from '../../UI/Button';

interface IProps {
  user: IUser;
}

const StFlag = styled.img`
  width: 30px;
  height: 20px;
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const StInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100px;
`;

const StRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  align-items: center;
`;

const StRowName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StName = styled.p`
  ${lineClampMixin()}
`;

const StFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserProfile: FC<IProps> = ({ user }) => {
  const authUser = useAppSelector(userSelector);
  const [createFriendReq] = useCreateReqMutation();

  const handleCreateRequest = async () => {
    try {
      const data = await createFriendReq(user.id).unwrap();
      notifyMessage('Friend request created');
    } catch (err: any) {
      notifyError(err.data?.message);
    }
  };

  return (
    <StWrapper>
      <StMain>
        <UserAvatar user={user} fakeSize="82px" size="large" showProfile={false} textSizeRatio={1} />
        <StName>{`${user.firstName} ${user.lastName}`}</StName>
        {user.status && <p>{user.status}</p>}
      </StMain>
      <StInfo>
        <StRow>
          <StRowName>Country:</StRowName>
          <StFlag src={`https://flagcdn.com/${user.country.toLowerCase()}.svg`} />
        </StRow>
        <StRow>
          <StRowName>Gender:</StRowName>
          {user.gender}
        </StRow>
        <StRow>
          <StRowName>Email:</StRowName>
          {user.email}
        </StRow>
      </StInfo>
      {user.id !== authUser?.id && (
        <StFooter>
          <Button onClick={handleCreateRequest}>Friend Request</Button>
        </StFooter>
      )}
    </StWrapper>
  );
};

export default UserProfile;
