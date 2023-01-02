import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IGroupDialog } from '../../../../../types/entities';
import { AllRoutes } from '../../../../AppRoutes';
import { SidebarGroup } from '../SidebarItems';

const StWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  activeDialogId?: string;
  isGroupDialogsFetching: boolean;
  groupDialogs: IGroupDialog[];
}

const GroupDialogsList: FC<IProps> = ({ activeDialogId, groupDialogs, isGroupDialogsFetching }) => {
  // const { data, isFetching, error } = useFetchGroupDialogsQuery();
  const nav = useNavigate();

  const handleSetActiveDialog = (id: number) => {
    nav(AllRoutes.dialogs + `/${id}`);
  };

  return (
    <StWrapper>
      {isGroupDialogsFetching
        ? 'loading'
        : groupDialogs.length > 0 &&
          groupDialogs.map((gr) => (
            <SidebarGroup
              dialog={gr}
              activeDialogId={activeDialogId}
              handleSetActiveDialog={handleSetActiveDialog}
              key={gr.id}
            />
          ))}
    </StWrapper>
  );
};

export default GroupDialogsList;
