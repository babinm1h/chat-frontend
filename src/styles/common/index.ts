import styled from 'styled-components';

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

export const StAvatar = styled.div<{ size?: 'big' | 'small' | 'medium' | 'large'; online?: boolean }>`
  width: ${({ size }) => (size === 'big' ? `54px` : size === 'medium' ? '45px' : size === 'large' ? '82px' : '32px')};
  height: ${({ size }) => (size === 'big' ? `54px` : size === 'medium' ? '45px' : size === 'large' ? '82px' : '32px')};
  border-radius: 50%;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  &::after {
    display: ${({ online }) => (online ? 'inline-block' : 'none')};
    position: absolute;
    bottom: 1px;
    right: 2px;
    width: 11px;
    height: 11px;
    content: '';
    background-color: lime;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.currentTheme.background.secondary};
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
  gap: 15px;
  padding: 10px 15px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  align-items: center;
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
