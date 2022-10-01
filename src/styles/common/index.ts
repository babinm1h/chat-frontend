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

export const StAvatar = styled.div<{ size: "small" | "big" | "medium" }>`
  width: ${({ size }) => (size === "big" ? `54px` : size === "medium" ? "45px" : "32px")};
  height: ${({ size }) => (size === "big" ? `54px` : size === "medium" ? "45px" : "32px")};
  border-radius: 50%;
  background-color: lime;
  flex-shrink: 0;
  img {
    object-fit: cover;
    width: 100%;
  }
`;
