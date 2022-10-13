import React, { FC } from "react";
import styled from "styled-components";
import { IMessage, IUser } from "../../../types/entities";
import MessageItem from "./MessageItem";

const StMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1 1 auto;
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    width: 6px;
    border-radius: 999px;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.currentTheme.background.scrollThumb};
    }
    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.currentTheme.background.scrollTrack};
    }
  }
`;

interface IProps {
  messages: IMessage[];
  user: IUser | null;
}

const DialogMessages: FC<IProps> = ({ messages, user }) => {
  return (
    <StWrapper>
      <StMessages>
        {messages.map((msg, idx, arr) => (
          <MessageItem
            key={msg.id}
            message={msg}
            user={user}
            repeated={arr[idx + 1]?.creatorId === msg.creatorId}
          />
        ))}
      </StMessages>
    </StWrapper>
  );
};

export default DialogMessages;
