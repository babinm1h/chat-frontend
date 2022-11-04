import { useState, useRef, useEffect } from "react";

export const useOutsideClick = (initState: boolean) => {
  const [isVisible, setIsVisible] = useState(initState);
  const ref = useRef<any>();

  const onToggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleClick = (e: MouseEvent) => {
    if (e.which === 1 && ref.current && !ref.current.contains(e.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isVisible]);

  return { isVisible, setIsVisible, ref, onToggleVisible };
};
