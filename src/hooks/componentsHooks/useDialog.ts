import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDialogById } from "../../redux/thunks/activeDialog.thunks";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";

export const useDialog = () => {
  const dispatch = useAppDispatch();
  const { activeDialog, isFetching, error } = useAppSelector((state) => state.activeDialog);
  const { user } = useAppSelector((state) => state.auth);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchDialogById(+id));
    }
  }, [id]);

  return { activeDialog, isFetching, error, user };
};
