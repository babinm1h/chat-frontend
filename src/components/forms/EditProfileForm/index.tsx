import React, { FC } from 'react';
import Avatar from 'react-avatar';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { CameraIcon } from '../../../assets/icons';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useUploadImage } from '../../../hooks/useUploadFile';
import { useUpdateUserMutation } from '../../../redux/services/usersApi';
import { setAuthUser } from '../../../redux/slices/auth.slice';
import { StAvatar } from '../../../styles/common';
import { notifyError } from '../../../utils/toast.helpers';
import { validate } from '../../../utils/validate';
import CountrySelect from '../../CountrySelect';
import Button from '../../UI/Button';
import TextField from '../../UI/TextField';

const StForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
`;

const StAva = styled.div`
  margin: 0 auto;
  position: relative;
  text-align: center;
`;

const StAvaChange = styled.label`
  width: 34px;
  height: 34px;
  position: absolute;
  bottom: -3px;
  right: -4px;
  background-color: ${({ theme }) => theme.colors.common.primaryBlue};
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.currentTheme.background.secondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    color: #fff;
  }
  input {
    display: none;
  }
`;

const StFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface IProps {
  onClose: () => void;
}

interface IForm {
  firstName: string;
  lastName: string;
  avatar?: string;
  country: string;
  status?: string;
}

const EditProfileForm: FC<IProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const { file, handleFileChange, resetFiles } = useUploadImage();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const defaultValues: IForm = {
    country: authUser?.country || '',
    firstName: authUser?.firstName || '',
    lastName: authUser?.lastName || '',
    status: authUser?.status || '',
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IForm>({ defaultValues });

  const onCountryChange = (val: { value: string; label: string }) => {
    setValue('country', val.value);
  };

  const onSubmit: SubmitHandler<IForm> = async ({ country, firstName, lastName, status }) => {
    try {
      const fd = new FormData();
      if (file) fd.append('avatar', file);
      if (country) fd.append('country', country);
      if (firstName) fd.append('firstName', firstName);
      if (lastName) fd.append('lastName', lastName);
      if (status) fd.append('status', status);
      const updated = await updateUser(fd).unwrap();
      dispatch(setAuthUser(updated));
      onClose();
      resetFiles();
    } catch (err: any) {
      notifyError(err.data?.message);
    }
  };

  if (!authUser) return <>error</>;

  return (
    <StForm action="" onSubmit={handleSubmit(onSubmit)}>
      <StAva>
        {file ? (
          <StAvatar size={'large'}>
            <img src={URL.createObjectURL(file)} alt={authUser.firstName} />
          </StAvatar>
        ) : authUser.avatar ? (
          <StAvatar size={'large'}>
            <img src={authUser.avatar} alt={authUser.firstName} />
          </StAvatar>
        ) : (
          <Avatar size={'82px'} name={authUser.firstName} round textSizeRatio={1} />
        )}
        <StAvaChange htmlFor="img">
          <input type="file" id="img" accept="image/png, image/jpg, image/jpeg" onChange={handleFileChange} />
          <CameraIcon size={16} />
        </StAvaChange>
      </StAva>

      <StFields>
        <TextField
          placeholder="Status"
          register={register('status', { ...validate(0, 70, false) })}
          error={errors.status?.message}
        />
        <TextField
          placeholder="First Name"
          register={register('firstName', { ...validate(0, 40) })}
          error={errors.firstName?.message}
        />
        <TextField
          placeholder="Last Name"
          register={register('lastName', { ...validate(0, 40) })}
          error={errors.lastName?.message}
        />
        <CountrySelect onCountryChange={onCountryChange} defaultValue={authUser.country} />
      </StFields>
      <Button type="submit" variant="outlined" disabled={isLoading}>
        Submit
      </Button>
    </StForm>
  );
};

export default EditProfileForm;
