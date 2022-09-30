import { motion } from "framer-motion";
import styled from "styled-components";

export const StOverlay = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.common.semitransparentBlack};
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 18;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
