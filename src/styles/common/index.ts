import styled from "styled-components";

export const StOverlay = styled.div`
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
export const StMenuItem = styled.li`
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  a {
    color: ${({ theme }) => theme.currentTheme.text.primary};
  }
  &:hover {
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
  &.active {
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
  &:active {
    background-color: ${({ theme }) => theme.currentTheme.background.active};
  }
  &.logout {
    color: red;
  }
`;

export const StContextMenuItem = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px 20px;
  transition: all 0.2s ease-in;
  border-radius: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  a {
    color: ${({ theme }) => theme.currentTheme.text.primary};
  }
  &:hover {
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
  &.active {
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
  &:active {
    background-color: ${({ theme }) => theme.currentTheme.background.active};
  }
  &.logout {
    color: red;
  }
`;
