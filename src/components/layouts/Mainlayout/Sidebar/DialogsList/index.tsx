import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDialog } from '../../../../../types/entities';
import { AllRoutes } from '../../../../AppRoutes';
import SidebarUser from '../SidebarItems';

interface IProps {
  dialogs: IDialog[];
  activeDialogId?: string;
  authUserId: number;
}

const DialogsList: FC<IProps> = ({ dialogs, activeDialogId, authUserId }) => {
  const nav = useNavigate();

  const handleSetActiveDialog = (id: number) => {
    nav(AllRoutes.dialogs + `/${id}`);
  };

  return (
    <>
      {dialogs
        .filter((dialog) => !!dialog.lastMessage)
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
