import { useState, useEffect, useRef, RefObject } from "react";
import { setMessageContextMenuIsOpen } from "../redux/slices/dialogs.slice";
import { useAppDispatch } from "./useAppDispatch";

export const useContextMenu = (menuWidth: number) => {
  const dispatch = useAppDispatch();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const menuRef = useRef<HTMLDivElement>(null);

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const msg = e.currentTarget.getBoundingClientRect();
    let x = e.pageX;
    let y = e.pageY;

    if (msg.width + x > window.innerWidth) {
      x = x - menuWidth;
    }
    // console.log(msg.height + y, window.innerHeight);
    setCoords({ x, y });
    setShowMenu(true);
    dispatch(setMessageContextMenuIsOpen(true));
  };

  const handleClose = () => {
    setShowMenu(false);
    dispatch(setMessageContextMenuIsOpen(false));
  };

  const handleCloseOnOusideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as any)) handleClose();
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("pointerdown", handleCloseOnOusideClick);
    }

    return () => {
      document.removeEventListener("pointerdown", handleCloseOnOusideClick);
    };
  }, [showMenu]);


  return { onContextMenu, handleClose, coords, showMenu, menuRef };
};
