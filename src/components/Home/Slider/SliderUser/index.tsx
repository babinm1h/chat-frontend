import React, { FC } from 'react';
import { IUser } from '../../../../types/entities';
import UserAvatar from '../../../UserAvatar';
import { StSlideUser } from '../styles';

interface IProps {
  user: Partial<IUser>;
}

const SliderUser: FC<IProps> = ({ user }) => {
  return (
    <StSlideUser>
      <UserAvatar showProfile={false} user={user as any} fakeSize="82" size="large" />
      <p>{user.firstName}</p>
      {user.country && (
        <img src={`https://flagcdn.com/${user.country.toLowerCase()}.svg`} alt="flag" width={24} height={16} />
      )}
    </StSlideUser>
  );
};

export default SliderUser;
