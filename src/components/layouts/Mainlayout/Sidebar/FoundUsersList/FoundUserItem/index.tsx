import { FC } from "react";
import Avatar from "react-avatar";
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
  avatar?: string;
  handleCreateDialog: (id: number) => void;
}

const FoundUserItem: FC<IProps> = ({ firstName, lastName, handleCreateDialog, id, avatar }) => {
  const onUserClick = () => {
    handleCreateDialog(id);
  };

  return (
    <StWrapper onClick={onUserClick}>
      {avatar ? (
        <StAvatar size="medium">
          <img src={avatar} alt={firstName} />
        </StAvatar>
      ) : (
        <Avatar name={firstName} size="45px" round />
      )}
      <StInfo>
        <StHeader>
          <StName>{`${firstName} ${lastName}`}</StName>
        </StHeader>
      </StInfo>
    </StWrapper>
  );
};

export default FoundUserItem;
