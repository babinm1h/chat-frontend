import React, { FC } from "react";
import styled from "styled-components";
import { IMessage, IUser } from "../../../../types/entities";
import cn from "classnames";
import { StAvatar } from "../../../../styles/common";
import { getMessageDate } from "../../../../utils/date.helpers";

const StMessage = styled.div<{ repeated: boolean }>`
  padding: 10px 10px 2px 10px;
  background-color: ${({ theme }) => theme.currentTheme.background.receivedMessage};
  border-radius: ${({ repeated }) => (repeated ? "8px" : "8px 8px 8px 0")};
  display: flex;
  align-self: flex-start;
  position: relative;
  max-width: 50%;
  word-break: break-all;
  flex-direction: column;
  min-width: 100px;
  &:after {
    content: "";
    position: absolute;
    margin-top: -6px;
    margin-left: -5px;
    border-left: 0px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid ${({ theme }) => theme.currentTheme.background.receivedMessage};
    transform: rotate(-90deg);
    left: -5px;
    bottom: 0px;
    ${({ repeated }) => repeated && `display: none`};
  }

  &.myMessage {
    background-color: ${({ theme }) => theme.currentTheme.background.myMessage};
    border-radius: ${({ repeated }) => (repeated ? "8px" : "8px 8px 0px 8px")};
    align-self: flex-end;
    &:after {
      content: "";
      position: absolute;
      margin-top: -6px;
      margin-left: -5px;
      border-left: 12px solid transparent;
      border-right: 0px solid transparent;
      border-bottom: 12px solid ${({ theme }) => theme.currentTheme.background.myMessage};
      transform: rotate(90deg);
      right: -9px;
      bottom: 0px;
      left: auto;
    }
  }
`;

const StText = styled.p`
  word-wrap: break-word;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  position: relative;
`;

const StWrapper = styled.div<{ isMy: boolean }>`
  display: flex;
  gap: 15px;
  flex-direction: ${({ isMy }) => (isMy ? "row-reverse" : "row")};
`;

const StAvatarWrapper = styled.div<{ repeated?: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  ${({ repeated }) => repeated && `opacity:0`}
`;

const StDate = styled.span<{ isMy: boolean }>`
  color: ${({ theme }) => theme.currentTheme.text.secondary};
  font-size: 12px;
  white-space: nowrap;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: -2px;
`;

interface IProps {
  message: IMessage;
  user: IUser | null;
  repeated: boolean;
}

const MessageItem: FC<IProps> = ({ message, user, repeated }) => {
  const isMyMsg = user?.id === message.creatorId;

  const messageWithoutAvatar = () => {
    return (
      <StWrapper isMy={isMyMsg}>
        <StAvatarWrapper repeated={repeated}>
          <StAvatar size="small"></StAvatar>
        </StAvatarWrapper>
        <StMessage
          repeated={repeated}
          key={message.id}
          className={cn("", {
            myMessage: isMyMsg,
          })}
        >
          <StText>{message.text}</StText>
          <StDate isMy={isMyMsg}>{getMessageDate(message.createdAt)}</StDate>
        </StMessage>
      </StWrapper>
    );
  };
  if (repeated) {
    return messageWithoutAvatar();
  }

  return (
    <StWrapper isMy={isMyMsg}>
      <StAvatarWrapper>
        <StAvatar size="small"></StAvatar>
      </StAvatarWrapper>
      <StMessage
        repeated={repeated}
        key={message.id}
        className={cn("", {
          myMessage: isMyMsg,
        })}
      >
        <StText>{message.text}</StText>
        <StDate isMy={isMyMsg}>{getMessageDate(message.createdAt)}</StDate>
      </StMessage>
    </StWrapper>
  );
};

export default MessageItem;
