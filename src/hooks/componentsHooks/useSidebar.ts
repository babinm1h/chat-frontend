import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllDialogs, fetchAllGroupDialogs } from '../../redux/thunks/dialogs.thunks';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

export const useSidebar = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);

  const dispatch = useAppDispatch();
  const { dialogs, isDialogsFetching, isSearching, foundUsers, searchMode, groupDialogs, isGroupDialogsFetching } =
    useAppSelector((state) => state.dialogs);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllDialogs());
  }, []);

  useEffect(() => {
    dispatch(fetchAllGroupDialogs());
  }, []);

  return {
    dialogs,
    isDialogsFetching,
    activeDialogId: id,
    authUser: user,
    foundUsers,
    isSearching,
    searchMode,
    groupDialogs,
    isGroupDialogsFetching,
    activeTab,
    setActiveTab,
  };
};
