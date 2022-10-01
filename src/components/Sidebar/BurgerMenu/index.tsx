import { motion } from "framer-motion";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { logout } from "../../../redux/slices/auth.slice";
import { StAvatar } from "../../../styles/common";
import { AllRoutes } from "../../AppRoutes";
import MenuItems from "./MenuItems";

const StWrapper = styled(motion.div)`
  width: 320px;
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

const StHeader = styled.div`
  padding: 15px 20px;
`;

const StName = styled.div`
  margin: 10px 0 2px 0;
`;

const StSetStatus = styled.p`
  color: #56adeb;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

interface IProps {
  onClose: () => void;
  name: string;
}

const asideVars = {
  hidden: { x: "-100%" },
  visible: { x: "0" },
  exit: { x: "-100%" },
};

const BurgerMenu: FC<IProps> = ({ onClose, name }) => {
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
        <StHeader>
          <StAvatar size="medium"></StAvatar>
          <StName>{name}</StName>
          <StSetStatus>Установить статус</StSetStatus>
        </StHeader>
        <MenuItems />
      </StWrapper>
    </StOverlay>
  );
};

export default BurgerMenu;
