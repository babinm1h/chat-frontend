import { FC, RefObject } from "react";
import styled from "styled-components";
import { IMessage, IUser } from "../../../../types/entities";
import cn from "classnames";
import { StAvatar } from "../../../../styles/common";
import { getMessageDate } from "../../../../utils/date.helpers";
import { useContextMenu } from "../../../../hooks/useContextMenu";
import MessageContextMenu from "../MessageContextMenu";

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
  position: relative;
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
  scrollAreaRef: RefObject<HTMLDivElement>;
}

const MessageItem: FC<IProps> = ({ message, user, repeated, scrollAreaRef }) => {
  const { coords, onContextMenu, showMenu, menuRef, handleClose } = useContextMenu(200);
  const isMyMsg = user?.id === message.creatorId;

  const formatedMessage = () => {
    if (repeated) {
      return (
        <>
          <StAvatarWrapper repeated={repeated} onContextMenu={(e) => e.stopPropagation()}>
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
        </>
      );
    } else {
      return (
        <>
          <StAvatarWrapper onContextMenu={(e) => e.stopPropagation()}>
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
        </>
      );
    }
  };

  return (
    <StWrapper isMy={isMyMsg} onContextMenu={onContextMenu}>
      {formatedMessage()}
      <MessageContextMenu
        handleClose={handleClose}
        message={message}
        left={coords.x as number}
        top={coords.y as number}
        showMenu={showMenu}
        menuRef={menuRef}
        isMy={isMyMsg}
        scrollAreaRef={scrollAreaRef}
      />
    </StWrapper>
  );
};

export default MessageItem;
