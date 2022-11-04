import React, { FC } from "react";
import styled from "styled-components";
import Button from "../../UI/Button";

const StBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

interface IProps {
  setActiveStep: Function;
  activeStep: number;
  stepsLength: number;
}

const StepperControls: FC<IProps> = ({ setActiveStep, activeStep, stepsLength }) => {
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep === 1) return;
    setActiveStep(activeStep - 1);
  };

  return (
    <StBtns>
      <Button onClick={handlePrev}>Prev</Button>
      {activeStep === stepsLength ? (
        <Button type="submit">Submit</Button>
      ) : (
        <Button onClick={handleNext}>Next</Button>
      )}
    </StBtns>
  );
};

export default StepperControls;
