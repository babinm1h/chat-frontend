import React, { FC, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useSocket } from '../../../hooks/useSocket';
import { IMessage, IUser } from '../../../types/entities';
import { SocketEvents } from '../../../types/socketEvents.types';
import { AttachIcon, CloseIcon, EditIcon, ReplyIcon, SendIcon } from '../../../assets/icons';
import { validate } from '../../../utils/validate';
import { useDropzone } from 'react-dropzone';
import DialogDropzone from '../../Dialog/DialogDropzone';
import { useCreateMessageMutation, useUpdateMessageMutation } from '../../../redux/services/messagesApi';
import { notifyError } from '../../../utils/toast.helpers';
import { setEditableMessage, setReplyToMsg } from '../../../redux/slices/dialogs.slice';
import { useUploadMultipleFiles } from '../../../hooks/useUploadMultipleFiles';
import { useModal } from '../../../hooks/useModal';
import TextareaAutosize from 'react-textarea-autosize';
import { lineClampMixin, scrollbarMixin } from '../../../styles/common/mixins';
import DialogModalForm from '../DialogModalForm';

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
`;

const StForm = styled.form`
  padding: 10px 20px;
  flex-shrink: 0;
  display: flex;
  gap: 10px;
  position: relative;
  align-items: center;
`;

const StSend = styled.button<{ show: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  transform: rotate(45deg);
  color: ${({ theme }) => theme.colors.common.primaryBlue};
  background-color: transparent;
  transition: all 0.2s ease-out;
  opacity: ${({ show }) => (show ? 1 : 0)};
  &:hover {
    color: ${({ theme }) => theme.colors.common.blueHover};
  }
`;

const StInput = styled(TextareaAutosize)`
  flex: 1 1 auto;
  padding: 10px;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  background-color: transparent;
  resize: none;
  ${scrollbarMixin()};
`;

const StFileinput = styled.input`
  display: none;
`;

const StFileLabel = styled.label<{ isEditableMessage: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  ${({ isEditableMessage }) =>
    isEditableMessage &&
    `
    pointer-events: none;
    opacity:0;
  `}
`;

const StReply = styled.div`
  display: flex;
  gap: 2px;
  padding: 8px 20px;
  align-items: center;
  gap: 15px;
  .reply__icon {
    color: ${({ theme }) => theme.colors.common.primaryBlue};
    flex-shrink: 0;
  }
  .close__icon {
    cursor: pointer;
    flex-shrink: 0;
  }
`;

const StReplyMsg = styled.div`
  gap: 2px;
  flex-direction: column;
  flex: 100%;
  display: flex;
  p {
    ${lineClampMixin()}
  }
`;

const StReplyUser = styled.div`
  color: ${({ theme }) => theme.colors.common.primaryBlue};
  font-weight: 500;
`;

interface IForm {
  message: string;
}

interface IProps {
  user: IUser | null;
  editableMessage: IMessage | null;
  replyToMsg: null | IMessage;
}

const DialogForm: FC<IProps> = ({ user, editableMessage, replyToMsg }) => {
  const socket = useSocket();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const [isTyping, setIsTyping] = useState(false);

  const [createMessage, { isLoading }] = useCreateMessageMutation();
  const [updateMessage, { isLoading: isMsgUpdating }] = useUpdateMessageMutation();

  const { resetFiles, files, handleFiles, handleRemoveFile } = useUploadMultipleFiles();
  const { handleSubmit, reset, register, watch, setValue } = useForm<IForm>({ mode: 'onChange' });
  const { isOpen, onClose, onOpen } = useModal();

  const onSubmit: SubmitHandler<IForm> = ({ message }) => {
    if (!!editableMessage) {
      updateMessage({ id: editableMessage.id, text: message })
        .unwrap()
        .catch((err) => notifyError(err.data.message));
      dispatch(setEditableMessage(null));
    } else {
      const fd = new FormData();
      fd.append('text', message);
      fd.append('dialogId', `${id}`);
      files.forEach((file) => fd.append('files', file));
      if (replyToMsg) fd.append('replyToMsgId', `${replyToMsg.id}`);

      createMessage(fd)
        .unwrap()
        .catch((err) => notifyError(err.data.message));
    }
    if (replyToMsg) dispatch(setReplyToMsg(null));
    reset();
  };

  const onDrop = useCallback(handleFiles, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

  const handleCloseMessageModal = () => {
    onClose();
    resetFiles();
  };

  const handleCancelEdit = () => {
    dispatch(setEditableMessage(null));
    setValue('message', '');
  };

  const handleCancelReply = () => {
    dispatch(setReplyToMsg(null));
    setValue('message', '');
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit(SocketEvents.userStartTyping, { dialogId: id, userName: user?.firstName });
    }
  };

  useEffect(() => {
    if (editableMessage) {
      setValue('message', editableMessage.text);
      return () => {
        dispatch(setEditableMessage(null));
      };
    }
  }, [editableMessage]);

  useEffect(() => {
    if (files.length > 0 && !isOpen) onOpen();
  }, [files.length, isOpen]);

  useEffect(() => {
    if (replyToMsg) {
      return () => {
        dispatch(setReplyToMsg(null));
      };
    }
  }, [replyToMsg]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsTyping(false);
      socket.emit(SocketEvents.userStopTyping, { dialogId: id });
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [watch('message'), id]);

  return (
    <>
      <StWrapper>
        {replyToMsg ? (
          <StReply>
            <ReplyIcon size={26} className="reply__icon" />
            <StReplyMsg>
              <StReplyUser>{replyToMsg.creator?.firstName}</StReplyUser>
              <p>{replyToMsg.text}</p>
            </StReplyMsg>
            <CloseIcon size={20} className="close__icon" onClick={handleCancelReply} />
          </StReply>
        ) : editableMessage ? (
          <StReply>
            <EditIcon size={24} className="reply__icon" />
            <StReplyMsg>
              <StReplyUser>Edit message</StReplyUser>
              <p>{editableMessage.text}</p>
            </StReplyMsg>
            <CloseIcon size={20} className="close__icon" onClick={handleCancelEdit} />
          </StReply>
        ) : null}
        <StForm onSubmit={handleSubmit(onSubmit)} {...getRootProps()}>
          <StFileLabel htmlFor="file" isEditableMessage={!!editableMessage}>
            <AttachIcon size={20} />
            <StFileinput type={'file'} id="file" {...getInputProps({ multiple: true })} />
          </StFileLabel>
          <StInput
            placeholder="New message..."
            {...register('message', { onChange: handleTyping, ...validate(0, 1000) })}
            maxRows={7}
            autoFocus
            autoComplete="off"
          />
          {
            <StSend show={watch('message') ? true : false} disabled={isLoading || isMsgUpdating}>
              <SendIcon />
            </StSend>
          }
          {isDragActive && !editableMessage && <DialogDropzone />}
        </StForm>
      </StWrapper>
      <DialogModalForm
        dialogId={+id}
        isOpen={isOpen}
        onClose={handleCloseMessageModal}
        files={files}
        handleRemoveFile={handleRemoveFile}
      />
    </>
  );
};

export default DialogForm;
