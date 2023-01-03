import { FC, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useSocket } from '../../../hooks/useSocket';
import { IMessage, IUser } from '../../../types/entities';
import { SocketEvents } from '../../../types/socketEvents.types';
import { AttachIcon, MicroIcon, SendIcon } from '../../../assets/icons';
import { validate } from '../../../utils/validate';
import { useDropzone } from 'react-dropzone';
import DialogDropzone from '../../Dialog/DialogDropzone';
import { useCreateMessageMutation, useUpdateMessageMutation } from '../../../redux/services/messagesApi';
import { notifyError } from '../../../utils/toast.helpers';
import { setEditableMessage, setReplyToMsg } from '../../../redux/slices/dialogs.slice';
import { useUploadMultipleFiles } from '../../../hooks/useUploadMultipleFiles';
import { useModal } from '../../../hooks/useModal';
import TextareaAutosize from 'react-textarea-autosize';
import { scrollbarMixin } from '../../../styles/common/mixins';
import DialogModalForm from '../DialogModalForm';
import EmojiPicker from './EmojiPicker';
import ReplyOrEditableMessage from './ReplyOrEditableMessage';
import { useReactMediaRecorder } from 'react-media-recorder';

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
`;

const StForm = styled.form`
  position: relative;
  align-items: center;
  flex: 1 1 auto;
  width: 100%;
  display: flex;
`;

const StSend = styled.button<{ show: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  transform: rotate(45deg);

  background-color: transparent;
  transition: all 0.25s ease-out;
  opacity: ${({ show }) => (show ? 1 : 0)};
  svg {
    color: ${({ theme }) => theme.colors.common.primaryBlue};
    &:hover {
      color: ${({ theme }) => theme.colors.common.blueHover};
    }
  }
`;

const StMicro = styled.button<{ show: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
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
  ${({ isEditableMessage }) =>
    isEditableMessage &&
    `
    display:none;
  `}
`;

const StFormActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StFormWrapper = styled.div`
  padding: 10px 20px;
  flex-shrink: 0;
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
`;

interface IForm {
  message: string;
}

interface IProps {
  user: IUser | null;
  editableMessage: IMessage | null;
  replyToMsg: null | IMessage;
  bottomRef: React.RefObject<HTMLSpanElement>;
}

const DialogForm: FC<IProps> = ({ user, editableMessage, replyToMsg, bottomRef }) => {
  const recorder = useReactMediaRecorder({
    askPermissionOnMount: true,
    video: false,
    onStart() {
      console.log(777);
    },
    onStop(blobUrl, blob) {
      console.log(blob, blobUrl);
    },
  });

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
    if (!bottomRef.current) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
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

  const handleEmoji = (emoji: string) => {
    setValue('message', (watch('message') || '') + emoji);
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
        <ReplyOrEditableMessage
          handleCancelEdit={handleCancelEdit}
          handleCancelReply={handleCancelReply}
          editableMessage={editableMessage}
          replyToMsg={replyToMsg}
        />
        <StFormWrapper>
          <StFormActions>
            <StFileLabel htmlFor="file" isEditableMessage={!!editableMessage}>
              <AttachIcon size={21} />
              <StFileinput type={'file'} id="file" {...getInputProps({ multiple: true })} />
            </StFileLabel>

            <EmojiPicker handleEmoji={handleEmoji} />
          </StFormActions>
          <StForm onSubmit={handleSubmit(onSubmit)} {...getRootProps()}>
            <StInput
              placeholder="New message..."
              {...register('message', { onChange: handleTyping, ...validate(0, 1000) })}
              maxRows={7}
              autoFocus
              autoComplete="off"
            />

            {watch('message') ? (
              <StSend show={true} disabled={isLoading || isMsgUpdating} type="submit">
                <SendIcon />
              </StSend>
            ) : (
              <StMicro
                show={true}
                disabled={isLoading || isMsgUpdating}
                onPointerDown={recorder.startRecording}
                onPointerUp={recorder.stopRecording}
              >
                <MicroIcon />
              </StMicro>
            )}

            {isDragActive && !editableMessage && <DialogDropzone />}
          </StForm>
        </StFormWrapper>
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
