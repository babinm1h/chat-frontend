import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAllDialogs } from "../../redux/thunks/dialogs.thunks";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";

export const useSidebar = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { dialogs, isDialogsFetching, isSearching, foundUsers, searchMode } = useAppSelector(
    (state) => state.dialogs
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllDialogs());
  }, []);

  return {
    dialogs,
    isDialogsFetching,
    activeDialogId: id,
    authUser: user,
    foundUsers,
    isSearching,
    searchMode,
  };
};
