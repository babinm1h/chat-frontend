import React, { FC } from "react";
import styled from "styled-components";
import { FileIcon } from "../../../assets/icons";

const StWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
`;

const StDropBlock = styled.div`
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  color: ${({ theme }) => theme.currentTheme.text.primary};
  padding: 60px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  border-radius: 4px;
  font-size: 110%;
  height: 100%;
  border: 2px dashed ${({ theme }) => theme.currentTheme.text.primary};
`;

const DialogDropzone = () => {
  return (
    <StWrapper>
      <StDropBlock>
        Drop files to send them <FileIcon size={18} />
      </StDropBlock>
    </StWrapper>
  );
};

export default DialogDropzone;
