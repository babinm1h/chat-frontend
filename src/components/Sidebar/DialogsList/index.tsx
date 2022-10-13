import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IDialog } from "../../../types/entities";
import { AllRoutes } from "../../AppRoutes";
import SidebarUser from "../SidebarUser";

interface IProps {
  dialogs: IDialog[];
  activeDialogId?: string;
  authUserId: number;
}

const DialogsList: FC<IProps> = ({ dialogs, activeDialogId, authUserId }) => {
  const nav = useNavigate();

  const handleSetActiveDialog = (id: number) => {
    nav(AllRoutes.main + `/${id}`);
  };

  return (
    <>
      {dialogs
        .filter((d) => d.messages?.length > 0)
        .map((d) => (
          <SidebarUser
            key={d.id}
            dialog={d}
            authUserId={authUserId}
            activeDialogId={activeDialogId}
            handleSetActiveDialog={handleSetActiveDialog}
          />
        ))}
    </>
  );
};

export default DialogsList;
