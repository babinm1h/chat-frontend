import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AllRoutes } from "../../components/AppRoutes";
import { fetchAllDialogs } from "../../redux/thunks/dialogs.thunks";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";

export const useSidebar = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const dispatch = useAppDispatch();
  const { dialogs } = useAppSelector((state) => state.dialogs);
  const { user } = useAppSelector((state) => state.auth);

  const handleSetActiveDialog = (id: number) => {
    nav(AllRoutes.main + `/${id}`);
  };

  useEffect(() => {
    dispatch(fetchAllDialogs());
  }, []);

  return {
    dialogs: dialogs.items,
    isFetching: dialogs.isFetching,
    activeDialogId: id,
    handleSetActiveDialog,
    authUserId: user?.id,
  };
};
