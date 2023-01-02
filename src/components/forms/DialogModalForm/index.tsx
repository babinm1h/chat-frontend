import React, { FC } from 'react';
import styled from 'styled-components';
import { scrollbarMixin } from '../../../styles/common/mixins';
import AttachedFile from '../../Dialog/DialogMessages/AttachedFile';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import TextField from '../../UI/TextField';
import { v4 } from 'uuid';
import { FileWithId } from '../../../hooks/useUploadMultipleFiles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validate } from '../../../utils/validate';
import { useCreateMessageMutation } from '../../../redux/services/messagesApi';
import { notifyError } from '../../../utils/toast.helpers';

const StPreview = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const StModalContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  justify-content: space-between;
`;

const StModalFiles = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  overflow-y: auto;
  ${scrollbarMixin()}
`;

const StModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
  width: 100%;
  justify-content: flex-end;
`;

const StNotImages = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StImages = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  files: FileWithId[];
  handleRemoveFile: (id: string) => void;
  dialogId: number;
}

interface IForm {
  message: string;
}

const DialogModalForm: FC<IProps> = ({ isOpen, onClose, handleRemoveFile, dialogId, files }) => {
  const [createMessage, { isLoading }] = useCreateMessageMutation();
  const { register, handleSubmit, reset } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = ({ message }) => {
    const fd = new FormData();
    files.forEach((file) => fd.append('files', file));
    fd.append('text', message);
    fd.append('dialogId', dialogId.toString());
    createMessage(fd)
      .unwrap()
      .catch((err) => notifyError(err.data.message));
    onClose();
    reset();
  };

  const notImageFiles = files.filter((f) => !f.type.includes('image/'));
  const imgFiles = files.filter((f) => f.type.includes('image/'));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Message">
      <StModalContent>
        <StModalFiles>
          {notImageFiles.length > 0 && (
            <StNotImages>
              {notImageFiles.map((f) => (
                <AttachedFile
                  fileName={f.name}
                  size={Math.round(f.size)}
                  key={v4()}
                  handleRemoveFile={handleRemoveFile}
                  id={f.id}
                />
              ))}
            </StNotImages>
          )}
          {imgFiles.length > 0 && (
            <StImages>
              {imgFiles.map((p) => (
                <StPreview key={v4()}>
                  <img src={URL.createObjectURL(p)} alt="file" width={20} height={20} />
                </StPreview>
              ))}
            </StImages>
          )}
        </StModalFiles>
        <StModalForm onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Message" autoComplete="false" register={register('message', validate(0, 1000))} />
          <Button variant="outlined" type="submit" disabled={isLoading}>
            Send Message
          </Button>
        </StModalForm>
      </StModalContent>
    </Modal>
  );
};

export default DialogModalForm;
