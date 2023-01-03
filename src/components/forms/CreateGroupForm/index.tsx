import cn from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { CameraIcon } from '../../../assets/icons';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useDebounce } from '../../../hooks/useDebounce';
import { useUploadImage } from '../../../hooks/useUploadFile';
import { useCreateGroupDialogMutation } from '../../../redux/services/groupDialogsApi';
import { setGroupDialogCreationFoundUsers } from '../../../redux/slices/dialogs.slice';
import { groupDialogCreationSearchUsers } from '../../../redux/thunks/dialogs.thunks';
import { scrollbarMixin } from '../../../styles/common/mixins';
import { IUser } from '../../../types/entities';
import { notifyError } from '../../../utils/toast.helpers';
import { validate } from '../../../utils/validate';
import SelectableUser from '../../SelectableUser';
import Button from '../../UI/Button';
import TextField from '../../UI/TextField';
import UserChip from '../../UserChip';

const StForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const StGroupInfo = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: center;
  flex: 1 1 auto;
  height: 100%;
`;

const StGroupImg = styled.label`
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.common.primaryBlue};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.common.blueHover};
  }
  input {
    display: none;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  &.withoutBg {
    background-color: transparent;
  }
  svg {
    color: #fff;
  }
`;

const StBtns = styled.div`
  padding-top: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const StSearchBlock = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  flex-direction: column;
`;

const StUsersList = styled.ul`
  flex-direction: column;
  display: flex;
  margin: 10px 0;
  ${scrollbarMixin()}
  overflow-y: auto;
  flex: 1 1 auto;
`;

const StSelected = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

interface IProps {
  onClose: () => void;
}

interface IForm {
  title: string;
}

const CreateGroupForm: FC<IProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { groupDialogCreationFoundUsers, groupDialogCreationIsSearching } = useAppSelector((state) => state.dialogs);
  const { user } = useAppSelector((state) => state.auth);

  const [searchValue, setSearchValue] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

  const debouncedSearchValue = useDebounce(searchValue, 1000);
  const { file, handleFileChange, resetFiles } = useUploadImage();

  const [createGroupDialog, { isLoading }] = useCreateGroupDialogMutation();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = ({ title }) => {
    createGroupDialog({ title, users: selectedUsers.map((u) => u.id) })
      .unwrap()
      .then((res) => {
        onClose();
        reset();
        setSelectedUsers([]);
        resetFiles();
      })
      .catch((err) => notifyError(err.data.message));
  };

  const handleRemoveSelected = (userId: number) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
  };

  const toggleSelectUser = (user: IUser) => {
    if (selectedUsers.find((u) => u.id === user.id)) {
      handleRemoveSelected(user.id);
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleContinue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (step === 1) {
      e.preventDefault();
      if (!getValues('title')) {
        return notifyError('Group name is required');
      }
      setStep(step + 1);
    }
  };

  const handleCancel = () => {
    if (step === 1) {
      onClose();
    } else {
      setStep(1);
    }
  };

  useEffect(() => {
    if (!debouncedSearchValue) {
      dispatch(setGroupDialogCreationFoundUsers([]));
      return;
    }
    dispatch(groupDialogCreationSearchUsers(debouncedSearchValue));
    return () => {
      dispatch(setGroupDialogCreationFoundUsers([]));
    };
  }, [debouncedSearchValue]);

  return (
    <>
      <StForm onSubmit={handleSubmit(onSubmit)}>
        {step === 1 ? (
          <StGroupInfo>
            <StGroupImg htmlFor="groupImg" className={cn({ withoutBg: !!file })}>
              <input type="file" id="groupImg" accept="image/png, image/jpg, image/jpeg" onChange={handleFileChange} />
              {file ? <img src={URL.createObjectURL(file)} alt="preview" /> : <CameraIcon size={30} />}
            </StGroupImg>
            <TextField label="Group name" register={register('title', validate(1, 10))} error={errors.title?.message} />
          </StGroupInfo>
        ) : (
          <>
            <StSearchBlock>
              <TextField label="Search Users" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
              {selectedUsers.length > 0 && (
                <StSelected>
                  {selectedUsers.map((su) => (
                    <UserChip onRemove={handleRemoveSelected} user={su} key={su.id} />
                  ))}
                </StSelected>
              )}
            </StSearchBlock>
            <StUsersList>
              {groupDialogCreationIsSearching
                ? 'Loading'
                : groupDialogCreationFoundUsers.length > 0 &&
                  searchValue &&
                  groupDialogCreationFoundUsers
                    .filter((u) => u.id !== user?.id)
                    .map((u) => (
                      <SelectableUser
                        user={u}
                        isSelected={!!selectedUsers.find((user) => user.id === u.id)}
                        onClick={toggleSelectUser}
                        key={u.id}
                      />
                    ))}
            </StUsersList>
          </>
        )}
        <StBtns>
          <Button variant="outlined" onClick={handleCancel} type="button">
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleContinue} disabled={isLoading}>
            {step === 2 ? 'Create Group' : 'Continue'}
          </Button>
        </StBtns>
      </StForm>
    </>
  );
};

export default CreateGroupForm;
