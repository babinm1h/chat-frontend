import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';
import { lineData } from '../../../utils/data';

const StChart = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 500px;
  margin: 0 auto;
  color: #000;
  padding: 0 20px;
  @media (max-width: 768px) {
    height: 400px;
    padding: 0;
  }
`;

export const LineChart = ({}) => (
  <StChart>
    <ResponsiveLine
      enableGridX={false}
      animate={false}
      data={lineData}
      margin={{ top: 70, right: 20, bottom: 150, left: 35 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      //   yFormat=" >-.2f"
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Messages Count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Time',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisRight={null}
      pointSize={8}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-left',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: 150,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 1,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          itemTextColor: '#999',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .05)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </StChart>
);
