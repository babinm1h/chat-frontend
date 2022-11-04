import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { useSocket } from "../../../../../hooks/useSocket";
import { ICreateDialogResponse, useCreateDialogMutation } from "../../../../../redux/services/dialogsApi";
import { addDialog, setSearchMode } from "../../../../../redux/slices/dialogs.slice";
import { IUser } from "../../../../../types/entities";
import { SocketEvents } from "../../../../../types/socketEvents.types";
import { AllRoutes } from "../../../../AppRoutes";
import FoundUserItem from "./FoundUserItem";

interface IProps {
  foundUsers: IUser[];
}

const FoundUsersList: FC<IProps> = ({ foundUsers }) => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const [createDialog, { isLoading, isError, isSuccess }] = useCreateDialogMutation();
  const nav = useNavigate();

  const handleCreateDialog = async (id: number) => {
    const { data } = (await createDialog(id)) as { data: ICreateDialogResponse };
    if (data && data.dialog.id) {
      nav(AllRoutes.main + `/${data.dialog.id}`);
      dispatch(addDialog(data.dialog));
      socket.emit(SocketEvents.createDialog, { dialog: data.dialog });
      dispatch(setSearchMode(false));
    }
  };
  return (
    <>
      {foundUsers.map((user) => (
        <FoundUserItem
          firstName={user.firstName}
          lastName={user.lastName}
          handleCreateDialog={handleCreateDialog}
          key={user.id}
          id={user.id}
        />
      ))}
    </>
  );
};

export default FoundUsersList;
