import React, { FC } from 'react';
import styled from 'styled-components';
import { ReplyIcon, CloseIcon, EditIcon } from '../../../../assets/icons';
import { lineClampMixin } from '../../../../styles/common/mixins';
import { IMessage } from '../../../../types/entities';

const StReply = styled.div`
  display: flex;
  gap: 2px;
  padding: 8px 20px;
  align-items: center;
  gap: 15px;
  .reply__icon {
    color: ${({ theme }) => theme.colors.common.primaryBlue};
    flex-shrink: 0;
  }
  .close__icon {
    cursor: pointer;
    flex-shrink: 0;
  }
`;

const StReplyMsg = styled.div`
  gap: 2px;
  flex-direction: column;
  flex: 100%;
  display: flex;
  p {
    ${lineClampMixin()}
  }
`;

const StReplyUser = styled.div`
  color: ${({ theme }) => theme.colors.common.primaryBlue};
  font-weight: 500;
`;

interface IProps {
  replyToMsg: IMessage | null;
  handleCancelReply: () => void;
  editableMessage: IMessage | null;
  handleCancelEdit: () => void;
}

const ReplyOrEditableMessage: FC<IProps> = ({ handleCancelEdit, handleCancelReply, editableMessage, replyToMsg }) => {
  return (
    <>
      {replyToMsg ? (
        <StReply>
          <ReplyIcon size={26} className="reply__icon" />
          <StReplyMsg>
            <StReplyUser>{replyToMsg.creator?.firstName}</StReplyUser>
            <p>{replyToMsg.text}</p>
          </StReplyMsg>
          <CloseIcon size={20} className="close__icon" onClick={handleCancelReply} />
        </StReply>
      ) : editableMessage ? (
        <StReply>
          <EditIcon size={24} className="reply__icon" />
          <StReplyMsg>
            <StReplyUser>Edit message</StReplyUser>
            <p>{editableMessage.text}</p>
          </StReplyMsg>
          <CloseIcon size={20} className="close__icon" onClick={handleCancelEdit} />
        </StReply>
      ) : null}
    </>
  );
};

export default ReplyOrEditableMessage;
