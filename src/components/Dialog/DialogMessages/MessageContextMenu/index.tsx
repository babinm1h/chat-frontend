import React, { FC, RefObject, useEffect } from "react";
import styled from "styled-components";
import { EditIcon, ReplyIcon, TrashIcon } from "../../../../assets/icons";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useModal } from "../../../../hooks/useModal";
import { useDeleteMessageMutation } from "../../../../redux/services/messagesApi";
import { setEditableMessage, setReplyToMsg } from "../../../../redux/slices/dialogs.slice";
import { StContextMenuItem } from "../../../../styles/common";
import { IMessage } from "../../../../types/entities";
import { notifyError } from "../../../../utils/toast.helpers";
import Button from "../../../UI/Button";
import ContextMenu from "../../../UI/ContextMenu";
import Modal from "../../../UI/Modal";

const StModalText = styled.div`
  padding: 20px;
  height: 100%;
  flex: 1 1 auto;
`;

const StModalBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
  justify-content: flex-end;
`;

interface IProps {
  top: number;
  left: number;
  showMenu: boolean;
  menuRef?: RefObject<HTMLDivElement>;
  message: IMessage;
  isMy: boolean;
  handleClose: () => void;
  scrollAreaRef: RefObject<HTMLDivElement>;
}

const MessageContextMenu: FC<IProps> = ({
  showMenu,
  left,
  top,
  menuRef,
  message,
  isMy,
  handleClose,
  scrollAreaRef,
}) => {
  const [deleteMessage] = useDeleteMessageMutation();
  const dispatch = useAppDispatch();
  const { isOpen, onClose, onOpen } = useModal();

  const onOpenDeleteModal = () => {
    handleClose();
    onOpen();
  };

  const handleDelete = () => {
    onClose();
    deleteMessage(message.id)
      .unwrap()
      .catch((err) => notifyError(err.data.message));
  };

  const handleUpdate = () => {
    handleClose();
    dispatch(setEditableMessage(message));
  };

  const handleReply = () => {
    handleClose();
    dispatch(setReplyToMsg(message));
  };

  const handlePreventScroll = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (!scrollAreaRef.current) return;
    if (showMenu) {
      scrollAreaRef.current.addEventListener("wheel", handlePreventScroll, { passive: false });
    }
    return () => scrollAreaRef.current?.removeEventListener("wheel", handlePreventScroll);
  }, [scrollAreaRef.current, showMenu]);

  return (
    <>
      <ContextMenu top={top} left={left} isOpen={showMenu} menuRef={menuRef}>
        {isMy ? (
          <>
            <StContextMenuItem onClick={handleUpdate}>
              <EditIcon size={18} />
              Edit
            </StContextMenuItem>
            <StContextMenuItem onClick={onOpenDeleteModal}>
              <TrashIcon size={18} />
              Delete
            </StContextMenuItem>
          </>
        ) : (
          <>
            <StContextMenuItem onClick={handleReply}>
              <ReplyIcon size={18} />
              Reply
            </StContextMenuItem>
          </>
        )}
      </ContextMenu>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Confirm action"
        withButtons
        onConfirm={handleDelete}
        confirmText="Delete"
      >
        Delete this message?
      </Modal>
    </>
  );
};

export default MessageContextMenu;
