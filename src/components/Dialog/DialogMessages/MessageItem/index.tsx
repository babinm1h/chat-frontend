import { FC, RefObject, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { FileTypes, IAttachment, IMessage, IUser } from '../../../../types/entities';
import cn from 'classnames';
import { StAvatar } from '../../../../styles/common';
import { formatDate, getMessageTime } from '../../../../utils/date.helpers';
import { useContextMenu } from '../../../../hooks/useContextMenu';
import MessageContextMenu from '../MessageContextMenu';
import { lineClampMixin } from '../../../../styles/common/mixins';
import AttachedMedia from '../AttachedMedia';
import AudioPlayer from '../../../AudioPlayer';
import { useInView } from 'react-intersection-observer';
import { FileIcon, NotReadedIcon, ReadedIcon } from '../../../../assets/icons';
import UserAvatar from '../../../UserAvatar';

const StMessage = styled.div<{ repeated: boolean }>`
  padding: 10px 10px 2px 10px;
  background-color: ${({ theme }) => theme.currentTheme.background.receivedMessage};
  border-radius: ${({ repeated }) => (repeated ? '8px' : '8px 8px 8px 0')};
  display: flex;
  align-self: flex-start;
  position: relative;
  max-width: 50%;
  word-break: break-all;
  flex-direction: column;
  min-width: 100px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  &:after {
    content: '';
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
    border-radius: ${({ repeated }) => (repeated ? '8px' : '8px 8px 0px 8px')};
    align-self: flex-end;
    &:after {
      content: '';
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

const StBlockDate = styled.div`
  color: ${({ theme }) => theme.currentTheme.text.primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: sticky; */
  width: 100%;
  top: 0;
  z-index: 2;
  opacity: 0.8;
  p {
    border-radius: 8px;
    font-size: 14px;
    padding: 4px 15px;
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
`;

const StWrapper = styled.div<{ isMy: boolean }>`
  display: flex;
  gap: 15px;
  flex-direction: ${({ isMy }) => (isMy ? 'row-reverse' : 'row')};
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
  font-size: 13px;
  white-space: nowrap;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: -2px;
  align-items: center;
  gap: 4px;
  margin-left: 5px;
  span {
    margin-bottom: -2px;
  }
`;

const StReply = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
  padding-left: 10px;
  margin-bottom: 4px;
  &::before {
    content: '';
    height: 100%;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.common.primaryBlue};
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const StReplyMsg = styled.p`
  ${lineClampMixin()}
`;

const StFileLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 5px 0;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  svg {
    color: ${({ theme }) => theme.currentTheme.text.primary};
  }
  .circle {
    background-color: ${({ theme }) => theme.colors.common.primaryBlue};
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
`;

interface IProps {
  message: IMessage;
  user: IUser | null;
  repeated: boolean;
  scrollAreaRef: RefObject<HTMLDivElement>;
  activeAudio: IAttachment | null;
  onSetActiveAudio: (a: IAttachment | null) => void;
  onReadMessage: (msgId: number, dialogId: number) => void;
  shouldShowDate: boolean;
}

const MessageItem: FC<IProps> = ({
  message,
  user,
  repeated,
  scrollAreaRef,
  activeAudio,
  onSetActiveAudio,
  onReadMessage,
  shouldShowDate,
}) => {
  const { coords, onContextMenu, showMenu, menuRef, handleClose } = useContextMenu(200);
  const isMyMsg = user?.id === message.creatorId;

  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (message.readed || !inView || isMyMsg) {
      return;
    }
    if (inView) {
      onReadMessage(message.id, message.dialogId);
    }
  }, [message.readed, inView]);

  const attachedImages = useMemo(
    () => message.attachments?.filter((att) => att.type === FileTypes.image),
    [message.attachments],
  );

  const attachedAudios = useMemo(
    () => message.attachments?.filter((att) => att.type === FileTypes.audio),
    [message.attachments],
  );

  const attachedVideos = useMemo(
    () => message.attachments?.filter((att) => att.type === FileTypes.video),
    [message.attachments],
  );

  const attachedFiles = useMemo(
    () => message.attachments?.filter((att) => att.type === FileTypes.file),
    [message.attachments],
  );

  const messageDateRender = (
    <StDate isMy={isMyMsg}>
      <span>{getMessageTime(message.createdAt)}</span>
      {message.readed ? <ReadedIcon size={22} color={`#62A5E0`} /> : <NotReadedIcon size={22} />}
    </StDate>
  );

  const attachmentsRender = (
    <>
      {attachedFiles.length > 0 &&
        attachedFiles.map((f) => (
          <StFileLink href={f.path} download key={f.id}>
            <div className="circle">
              <FileIcon size={20} />
            </div>
            <span>{f.name}</span>
          </StFileLink>
        ))}
      {attachedAudios.length > 0 &&
        attachedAudios.map((a) => (
          <AudioPlayer key={a.id} audio={a} activeAudio={activeAudio} onSetActiveAudio={onSetActiveAudio} />
        ))}
      <AttachedMedia images={attachedImages} videos={attachedVideos} />
    </>
  );

  return (
    <>
      {shouldShowDate && (
        <StBlockDate>
          <p>{formatDate('DD MMMM', message.createdAt)}</p>
        </StBlockDate>
      )}

      <StWrapper isMy={isMyMsg} onContextMenu={onContextMenu}>
        {repeated ? (
          <StAvatarWrapper repeated={repeated} onContextMenu={(e) => e.stopPropagation()}>
            <StAvatar size="small"></StAvatar>
          </StAvatarWrapper>
        ) : (
          <StAvatarWrapper onContextMenu={(e) => e.stopPropagation()}>
            <UserAvatar user={message.creator} fakeSize={'32px'} size="small" />
          </StAvatarWrapper>
        )}
        <StMessage
          ref={ref}
          repeated={repeated}
          key={message.id}
          className={cn('', {
            myMessage: isMyMsg,
          })}
        >
          {message.replyToMsg && (
            <StReply>
              <StReplyMsg>{message.replyToMsg.text}</StReplyMsg>
            </StReply>
          )}
          <StText>{message.text}</StText>
          {attachmentsRender}
          {messageDateRender}
        </StMessage>

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
    </>
  );
};

export default MessageItem;
