import { Swiper } from 'swiper/react';
import styled from 'styled-components';

export const StHomeSwiper = styled(Swiper)`
  margin-top: 30px;
  max-width: 1000px;
  width: 100%;
  padding: 10px;
  &.swiper {
    overflow: hidden;
  }
  .swiper-slide {
    width: 358px;
    transition: 0.2s opacity ease-in-out;

    @media (min-width: 1360px) {
      opacity: 0.5;
    }

    &.swiper-slide-visible,
    &.swiper-slide-active,
    &.swiper-slide-duplicate-active {
      opacity: 1;
    }
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.colors.common.primaryBlue} !important;
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 50% !important;
    z-index: 3;
    width: 34px !important;
    height: 34px !important;
    background: white;
    border-radius: 50%;
    box-shadow: 0 1px 5px black;
    background-image: url('icons/arrowRight.svg') !important;
    background-repeat: no-repeat;
    background-size: 50% auto;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    &::after {
      display: none;
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.common.primaryBlue};
    }
  }

  .swiper-button-prev {
    background-image: url('icons/arrowLeft.svg') !important;
  }

  .swiper-slide {
    opacity: 1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }

  .swiper-pagination-bullets {
    bottom: 5px;
    z-index: 1111;
  }
`;

export const StSlideUser = styled.div`
  padding: 15px;
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  display: flex;
  flex-direction: column;
  height: 220px;
  width: 100%;
  border-radius: 12px;
  user-select: none;
  gap: 15px;
  align-items: center;
  p {
    font-size: 1.1rem;
  }
`;
