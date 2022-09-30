import React, { PropsWithChildren, FC } from "react";
import { createPortal } from "react-dom";

interface IProps {
  isOpen: boolean;
}

const Portal: FC<PropsWithChildren<IProps>> = ({ children, isOpen }) => {
  return (
    <>
      {isOpen && createPortal(children, document.body)}
    </>
  );
};

export default Portal;
