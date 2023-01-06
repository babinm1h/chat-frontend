import cn from 'classnames';
import React, { FC } from 'react';
import styled from 'styled-components';
import { CheckIcon } from '../../assets/icons';

const StStepTitle = styled.div`
  position: absolute;
  bottom: -32px;
  width: 200px;
  text-align: center;
  pointer-events: none;
`;

const StStepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.currentTheme.background.myMessage};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: ${({ theme }) => theme.shadow.button};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &.active {
    background-color: ${({ theme }) => theme.currentTheme.background.hover};
  }
`;

const StLine = styled.div`
  border-top: 1px solid ${({ theme }) => theme.currentTheme.background.icon};
  flex: auto;
  width: 100%;
`;

const StStepCircle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  svg {
    color: #fff;
  }
`;

const StWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin-bottom: 70px;
  justify-content: space-between;
`;

const StStep = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.currentTheme.text.primary};
  width: 100%;
  &.last {
    width: auto;
    ${StLine} {
      display: none;
      width: 0;
    }
  }
`;

interface IProps {
  steps: { title: string; number: number }[];
  activeStep: number;
  setActiveStep: Function;
}

const Stepper: FC<IProps> = ({ activeStep, steps, setActiveStep }) => {
  return (
    <StWrapper>
      {steps.length > 0 &&
        steps.map((s, idx) => (
          <StStep
            className={cn({ last: idx === steps.length - 1 })}
            onClick={() => setActiveStep(s.number)}
            key={s.number}
          >
            <StStepCircle>
              <StStepNumber className={cn({ active: activeStep === s.number })}>
                {activeStep > s.number ? <CheckIcon size={20} /> : s.number}
                <StStepTitle>{s.title}</StStepTitle>
              </StStepNumber>
              <StLine />
            </StStepCircle>
          </StStep>
        ))}
    </StWrapper>
  );
};

export default Stepper;
