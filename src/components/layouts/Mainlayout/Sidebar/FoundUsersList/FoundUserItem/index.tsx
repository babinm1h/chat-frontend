import { FC } from "react";
import styled from "styled-components";
import { StAvatar } from "../../../../../../styles/common";

const StWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.2s ease-in;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
`;

const StInfo = styled.div`
  flex: 1 1 auto;
  padding-right: 5px;
  display: flex;
  flex-direction: column;
`;

const StName = styled.div`
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;

const StHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 2px;
`;

interface IProps {
  firstName: string;
  id: number;
  lastName: string;
  handleCreateDialog: (id: number) => void;
}

const FoundUserItem: FC<IProps> = ({ firstName, lastName, handleCreateDialog, id }) => {
  const onUserClick = () => {
    handleCreateDialog(id);
  };

  return (
    <StWrapper onClick={onUserClick}>
      <StAvatar size="medium"></StAvatar>
      <StInfo>
        <StHeader>
          <StName>{`${firstName} ${lastName}`}</StName>
        </StHeader>
      </StInfo>
    </StWrapper>
  );
};

export default FoundUserItem;
