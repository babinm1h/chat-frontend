import { css } from "styled-components";

export const scrollbarMixin = () => css`
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    width: 6px;
    border-radius: 999px;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.currentTheme.background.scrollThumb};
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
`;
