import { motion } from "framer-motion";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { logout } from "../../../redux/slices/auth.slice";
import { AllRoutes } from "../../AppRoutes";

const StWrapper = styled(motion.div)`
  width: 300px;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
`;

const StOverlay = styled.div`
  background-color: ${({ theme }) => theme.colors.common.semitransparentBlack};
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 5;
  top: 0;
  right: 0;
  left: 0;
`;

const StLogout = styled.button`
  background-color: red;
  color: #fff;
`;

interface IProps {
  onClose: () => void;
}

const asideVars = {
  hidden: { x: "-100%" },
  visible: { x: "0" },
  exit: { x: "-100%" },
};

const BurgerMenu: FC<IProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    nav(AllRoutes.login);
  };

  return (
    <StOverlay onClick={onClose}>
      <StWrapper
        onClick={(e) => e.stopPropagation()}
        variants={asideVars}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        <StLogout onClick={handleLogout}>Logout</StLogout>
      </StWrapper>
    </StOverlay>
  );
};

export default BurgerMenu;
