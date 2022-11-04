import React, { FC, RefObject, useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useDeleteMessageMutation } from "../../../../redux/services/messagesApi";
import { setEditableMessage } from "../../../../redux/slices/dialogs.slice";
import { StContextMenuItem } from "../../../../styles/common";
import { IMessage } from "../../../../types/entities";
import { notifyError } from "../../../../utils/notifyError";
import ContextMenu from "../../../UI/ContextMenu";

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

  const handleDelete = () => {
    handleClose();
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
    <ContextMenu top={top} left={left} isOpen={showMenu} menuRef={menuRef}>
      {isMy ? (
        <>
          <StContextMenuItem onClick={handleUpdate}>Edit</StContextMenuItem>
          <StContextMenuItem onClick={handleDelete}>Delete</StContextMenuItem>
        </>
      ) : (
        <>
          <StContextMenuItem onClick={handleReply}>Reply</StContextMenuItem>
        </>
      )}
    </ContextMenu>
  );
};

export default MessageContextMenu;
