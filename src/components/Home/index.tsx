import React from 'react';
import styled from 'styled-components';
import Slider from './Slider';
import { LineChart } from './LineChart';
import { scrollbarMixin } from '../../styles/common/mixins';

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
  ${scrollbarMixin()}
`;

const StSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
  width: 100%;
  h1 {
    font-weight: bold;
    text-align: center;
    font-size: 1.5rem;
  }
`;

const Home = () => {
  return (
    <StWrapper>
      <StSection>
        <h1>Latest Users</h1>
        <Slider />
      </StSection>
      <StSection>
        <h1>Messages Statistic</h1>
        <LineChart />
      </StSection>
    </StWrapper>
  );
};

export default Home;
