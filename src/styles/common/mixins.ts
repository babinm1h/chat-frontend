import { css } from 'styled-components';

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

export const lineClampMixin = (num?: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${num ? num : 1};
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
  max-width: 100%;
  word-break: break-all;
  white-space: pre-wrap;
`;
