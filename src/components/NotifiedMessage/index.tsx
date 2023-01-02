import React, { FC } from 'react';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StAvatar } from '../../styles/common';
import { lineClampMixin } from '../../styles/common/mixins';
import { IMessage } from '../../types/entities';
import { AllRoutes } from '../AppRoutes';

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StName = styled.div`
  ${lineClampMixin(1)};
  font-weight: 500;
`;

const StText = styled.p`
  ${lineClampMixin(3)};
`;

const StMsg = styled.p`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

interface IProps {
  message: IMessage;
}

const NotifiedMessage: FC<IProps> = ({ message }) => {
  const nav = useNavigate();
  return (
    <StWrapper onClick={() => nav(AllRoutes.dialogs + `/${message.dialogId}`)}>
      <StAvatar size="medium">
        {message.creator.avatar ? (
          <img src={message.creator.avatar} alt={message.creator.firstName} />
        ) : (
          <Avatar size="45px" round name={message.creator.firstName} />
        )}
      </StAvatar>
      <StMsg>
        <StName>{message.creator.firstName}</StName>
        <StText>{message.text}</StText>
      </StMsg>
    </StWrapper>
  );
};

export default NotifiedMessage;
