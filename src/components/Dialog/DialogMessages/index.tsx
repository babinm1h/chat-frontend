import { FC, useRef } from "react";
import styled from "styled-components";
import { scrollbarMixin } from "../../../styles/common/mixins";
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
  position: relative;
  ${scrollbarMixin()};
  touch-action: none;
`;

interface IProps {
  messages: IMessage[];
  user: IUser | null;
  messageContextMenuIsOpen: boolean;
}

const DialogMessages: FC<IProps> = ({ messages, user, messageContextMenuIsOpen }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  return (
    <StWrapper ref={scrollAreaRef}>
      <StMessages>
        {messages.map((msg, idx, arr) => (
          <MessageItem
            key={msg.id}
            message={msg}
            user={user}
            repeated={arr[idx + 1]?.creatorId === msg.creatorId}
            scrollAreaRef={scrollAreaRef}
          />
        ))}
      </StMessages>
    </StWrapper>
  );
};

export default DialogMessages;
