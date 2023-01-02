import cn from "classnames";
import React, { FC } from "react";
import Avatar from "react-avatar";
import styled from "styled-components";
import { CheckIcon } from "../../assets/icons";
import { lineClampMixin } from "../../styles/common/mixins";
import { IUser } from "../../types/entities";

const StUser = styled.li`
  padding: 5px 10px;
  display: flex;
  gap: 15px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
`;

const StUserData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StUserName = styled.div`
  ${lineClampMixin()}
  max-width: 350px;
`;

const StUserAvatar = styled.div`
  /* width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.common.primaryBlue}; */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StUserOnline = styled.div`
  color: ${({ theme }) => theme.currentTheme.text.secondary};
  font-size: 14px;
`;

const StUserChecked = styled.div<{ isSelected: boolean }>`
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.common.primaryBlue};
  border-radius: 50%;
  right: -5px;
  border: 2px solid ${({ theme }) => theme.currentTheme.background.secondary};
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s ease-in-out;
  ${({ isSelected }) =>
    isSelected &&
    `
    opacity: 1;
     transform: scale(1);
  `}
`;

interface IProps {
  user: IUser;
  isSelected: boolean;
  onClick: (user: IUser) => void;
}

const SelectableUser: FC<IProps> = ({ user, isSelected, onClick }) => {
  const handleClick = () => {
    onClick(user);
  };

  return (
    <StUser onClick={handleClick}>
      <StUserAvatar>
        <Avatar size="45px" alt="user" name={user.firstName} round />
        <StUserChecked isSelected={isSelected}>
          <CheckIcon size={12} />
        </StUserChecked>
      </StUserAvatar>
      <StUserData>
        <StUserName>{user.firstName + " " + user.lastName}</StUserName>
        <StUserOnline>Online</StUserOnline>
      </StUserData>
    </StUser>
  );
};

export default SelectableUser;
