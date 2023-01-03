import { FC, useState } from 'react';
import styled from 'styled-components';
import MenuItems from './MenuItems';
import { CSSTransition } from 'react-transition-group';
import { IUser } from '../../../../../types/entities';
import TextField from '../../../../UI/TextField';
import { useUpdateUserMutation } from '../../../../../redux/services/usersApi';
import { notifyError } from '../../../../../utils/toast.helpers';
import { lineClampMixin } from '../../../../../styles/common/mixins';
import UserAvatar from '../../../../UserAvatar';

const StWrapper = styled.div`
  width: 320px;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  transition: all 0.2s ease-in-out;
  transform: translateX(-100%);
`;

const StOverlay = styled.div`
  background-color: ${({ theme }) => theme.colors.common.semitransparentBlack};
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 5;
  top: 0;
  right: 0;
  left: 0;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  &.sidebar-enter-done {
    opacity: 1;
    ${StWrapper} {
      transform: translateX(0);
    }
  }
`;

const StHeader = styled.div`
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.currentTheme.background.primary};
`;

const StName = styled.div`
  margin: 10px 0 2px 0;
  ${lineClampMixin()}
`;

const StSetStatus = styled.button`
  color: #56adeb;
  font-size: 14px;
  cursor: pointer;
  align-self: flex-start;
  &:hover {
    text-decoration: underline;
  }
`;

const StStatus = styled.p`
  font-size: 0.85rem;
  ${lineClampMixin()}
`;

const StStatusBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface IProps {
  onClose: () => void;
  authUser: IUser;
  isOpen: boolean;
}

const BurgerMenu: FC<IProps> = ({ onClose, authUser, isOpen }) => {
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState(authUser.status || '');
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const toggleEdit = async () => {
    try {
      if (edit) {
        setEdit(false);
        if (status !== authUser.status) await updateUser({ status });
      } else {
        setEdit(true);
      }
    } catch (err: any) {
      notifyError(err.data.message);
    }
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={100}
      mountOnEnter
      unmountOnExit
      classNames={{ enterDone: 'sidebar-enter-done' }}
    >
      <StOverlay onClick={onClose}>
        <StWrapper onClick={(e) => e.stopPropagation()}>
          <StHeader>
            <div>
              <UserAvatar user={authUser} size="medium" fakeSize="45px" />
              <StName>{authUser.firstName}</StName>
            </div>
            <StStatusBlock>
              {edit ? (
                <TextField value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
              ) : (
                <StStatus>{status}</StStatus>
              )}
              <StSetStatus onClick={toggleEdit} disabled={isLoading}>
                Set Status
              </StSetStatus>
            </StStatusBlock>
          </StHeader>
          <MenuItems />
        </StWrapper>
      </StOverlay>
    </CSSTransition>
  );
};

export default BurgerMenu;
