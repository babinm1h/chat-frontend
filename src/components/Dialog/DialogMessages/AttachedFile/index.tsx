import React, { FC } from 'react';
import styled from 'styled-components';
import { FileIcon, TrashIcon } from '../../../../assets/icons';

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const StInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1 1 auto;
  font-size: 14px;
  height: 100%;
  justify-content: center;
`;

const StName = styled.span`
  color: ${({ theme }) => theme.currentTheme.text.primary};
`;
const StSize = styled.span`
  color: ${({ theme }) => theme.currentTheme.text.secondary};
`;

const StDelete = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.currentTheme.background.icon};
    transition: all 0.15s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.currentTheme.text.primary};
    }
  }
`;

const StCircle = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.common.primaryBlue};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  .file-icon {
    width: 50%;
    height: 50%;
    object-fit: cover;
    color: ${({ theme }) => theme.currentTheme.text.primary};
  }
`;

interface IProps {
  fileName: string;
  size: string | number;
  handleRemoveFile: (id: string) => void;
  id: string;
}

const AttachedFile: FC<IProps> = ({ fileName, size, handleRemoveFile, id }) => {
  return (
    <StWrapper>
      <StCircle>
        <FileIcon className="file-icon" />
      </StCircle>
      <StInfo>
        <StName>{fileName}</StName>
        <StSize>{size} B</StSize>
      </StInfo>
      <StDelete>
        <TrashIcon size={18} onClick={() => handleRemoveFile(id)} />
      </StDelete>
    </StWrapper>
  );
};

export default AttachedFile;
