import React, { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useSocket } from "../../../hooks/useSocket";
import { createMessage } from "../../../redux/thunks/dialogs.thunks";
import { IUser } from "../../../types/entities";
import { SocketEvents } from "../../../types/socketEvents.types";
import { SendIcon } from "../../../utils/icons";
import { validate } from "../../../utils/validate";

const StForm = styled.form`
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  padding: 10px 20px;
  flex-shrink: 0;
  display: flex;
  gap: 10px;
`;

const StSend = styled.button<{ show: boolean }>`
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

const StInput = styled.input`
  flex: 1 1 auto;
  padding: 10px;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  background-color: transparent;
`;

interface IForm {
  message: string;
}

interface IProps {
  user: IUser | null;
}

const DialogForm: FC<IProps> = ({ user }) => {
  const socket = useSocket();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();

  const { handleSubmit, reset, register, watch, setFocus } = useForm<IForm>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IForm> = ({ message }) => {
    dispatch(createMessage({ dialogId: +id, text: message }));
    reset();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    socket.emit(SocketEvents.userStartTyping, { dialogId: id, userName: user?.firstName });
  };

  const handleBlur = () => {
    socket.emit(SocketEvents.userStopTyping, { dialogId: id });
  };

  return (
    <StForm onSubmit={handleSubmit(onSubmit)}>
      <StInput
        placeholder="New message..."
        {...register("message", validate(0, 1000))}
        autoComplete="off"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {
        <StSend show={watch("message") ? true : false}>
          <SendIcon />
        </StSend>
      }
    </StForm>
  );
};

export default DialogForm;
