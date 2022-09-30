import { useEffect, useState } from "react";

export const useModal = () => {
  let [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return { onClose, onOpen, isOpen };
};
