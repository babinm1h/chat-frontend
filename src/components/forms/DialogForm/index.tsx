import React, { FC, useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useSocket } from "../../../hooks/useSocket";
import { IMessage, IUser } from "../../../types/entities";
import { SocketEvents } from "../../../types/socketEvents.types";
import { AttachIcon, SendIcon } from "../../../utils/icons";
import { validate } from "../../../utils/validate";
import { useDropzone } from "react-dropzone";
import DialogDropzone from "../../Dialog/DialogDropzone";
import { useUploadImage } from "../../../hooks/useUploadFile";
import { useCreateMessageMutation, useUpdateMessageMutation } from "../../../redux/services/messagesApi";
import { notifyError } from "../../../utils/notifyError";
import { setEditableMessage } from "../../../redux/slices/dialogs.slice";
import { useUploadMultipleFiles } from "../../../hooks/useUploadMultipleFiles";
import Modal from "../../UI/Modal";
import { useModal } from "../../../hooks/useModal";
import TextField from "../../UI/TextField";
import TextareaAutosize from "react-textarea-autosize";
import { scrollbarMixin } from "../../../styles/common/mixins";
import Button from "../../UI/Button";

const StForm = styled.form`
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
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

const StFileLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StPreview = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const StModalContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 20px;
  ${scrollbarMixin()}
  justify-content: space-between;
`;

const StModalFiles = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`;

const StModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  width: 100%;
  height: 100%;
`;

interface IForm {
  message: string;
}

interface IProps {
  user: IUser | null;
  editableMessage: IMessage | null;
}

const DialogForm: FC<IProps> = ({ user, editableMessage }) => {
  const socket = useSocket();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const [createMessage, { isLoading }] = useCreateMessageMutation();
  const [updateMessage, { isLoading: isMsgUpdating }] = useUpdateMessageMutation();

  const { files, previews, resetFiles, setPreviews } = useUploadMultipleFiles();
  const { handleSubmit, reset, register, watch, setValue } = useForm<IForm>({ mode: "onChange" });
  const { isOpen, onClose, onOpen } = useModal();

  const onSubmit: SubmitHandler<IForm> = ({ message }) => {
    if (!!editableMessage) {
      updateMessage({ id: editableMessage.id, text: message })
        .unwrap()
        .catch((err) => notifyError(err.data.message));
      dispatch(setEditableMessage(null));
    } else {
      createMessage({ dialogId: +id, text: message })
        .unwrap()
        .catch((err) => notifyError(err.data.message));
    }
    reset();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    socket.emit(SocketEvents.userStartTyping, { dialogId: id, userName: user?.firstName });
  };
  const handleBlur = () => {
    socket.emit(SocketEvents.userStopTyping, { dialogId: id });
  };

  const onDrop = useCallback((files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 10 * 1024 * 1024) {
        notifyError(`File ${files[i].name} is too big`);
        continue;
      }
      setPreviews((prev) => [...prev, URL.createObjectURL(files[i])]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

  useEffect(() => {
    if (editableMessage) {
      setValue("message", editableMessage.text);
    }
  }, [editableMessage]);

  useEffect(() => {
    return () => {
      dispatch(setEditableMessage(null));
    };
  }, []);

  const handleCloseMessageModal = () => {
    onClose();
    resetFiles();
  };

  useEffect(() => {
    if (previews.length > 0 && !isOpen) onOpen();
  }, [previews, isOpen]);

  return (
    <>
      <StForm onSubmit={handleSubmit(onSubmit)} {...getRootProps()}>
        <StFileLabel htmlFor="file">
          <AttachIcon size={20} />
          <StFileinput type={"file"} id="file" {...getInputProps({ multiple: true })} />
        </StFileLabel>
        <StInput
          placeholder="New message..."
          {...register("message", validate(0, 1000))}
          autoComplete="off"
          // onFocus={handleFocus}
          onBlur={handleBlur}
          maxRows={7}
        />
        {
          <StSend show={watch("message") ? true : false} disabled={isLoading || isMsgUpdating}>
            <SendIcon />
          </StSend>
        }
        {isDragActive && <DialogDropzone />}
      </StForm>
      <Modal isOpen={isOpen} onClose={handleCloseMessageModal} size="medium" title="Send Message">
        <StModalContent>
          <StModalFiles>
            {previews.length > 0 &&
              previews.map((p, idx) => (
                <StPreview key={idx}>
                  <img src={p} alt="file" width={20} height={20} />
                </StPreview>
              ))}
          </StModalFiles>
          <StModalForm>
            <TextField label="Message" />
            <Button variant="text">Send Message</Button>
          </StModalForm>
        </StModalContent>
      </Modal>
    </>
  );
};

export default DialogForm;
