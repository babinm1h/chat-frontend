import React, { useEffect } from 'react';
import { Chart } from '@antv/g2';
import styled from 'styled-components';
import { scrollbarMixin } from '../../styles/common/mixins';

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 40px 20px;
  ${scrollbarMixin()}
`;

const StChartBlock = styled.div`
  background-color: ${({ theme }) => theme.currentTheme.background.secondary};
  width: 100%;
  padding: 20px;
  height: 100%;
`;

const StChartsRow = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  ${StChartBlock} {
    flex: 1;
  }
`;

const data = [
  { day: 1, value: 1000, percent: 1000 / 10000 },
  { day: 2, value: 500, percent: 500 / 10000 },
  { day: 3, value: 5000, percent: 5000 / 10000 },
  { day: 4, value: 1000, percent: 1000 / 10000 },
  { day: 5, value: 500, percent: 500 / 10000 },
  { day: 6, value: 2000, percent: 2000 / 10000 },
];

type Props = {};

const HomePage = (props: Props) => {
  useEffect(() => {
    const chart = new Chart({
      container: 'stats-chart',
      autoFit: true,
      height: 300,
      padding: 50,
    });

    chart.data(data);

    chart.scale('day', {
      alias: 'Messages for day',
      tickCount: data.length,
    });

    chart.axis('day', {
      tickLine: {
        alignTick: false,
      },
      label: {
        style: { fill: '#fff' },
      },
      title: {
        text: 'Messages count',
        position: 'end',
        style: {
          fontSize: 18,
          y: 20,
          x: 100,
          fontWeight: 'bold',
        },
      },
    });

    // появляются горизонтальные линии по графику типа значение-линия по убыванию
    // chart.axis('value', {
    //   tickLine: null,
    //   line: null,
    //   label: {
    //     style: {
    //       textBaseline: 'middle',
    //     },
    //   },
    // });
    chart.axis('value', false);

    chart.tooltip({
      showMarkers: false,
    });

    // position('day*value') = ось X - day, ось Y - value
    chart
      .interval()
      .position('day*value')
      .size(30)
      .color('value', (value: any) => {
        if (value > 4999) {
          return 'lime';
        } else if (value < 1000) {
          return 'red';
        }
        return '#4388B9';
      });

    chart.interaction('element-active');

    data.forEach((item) => {
      chart
        .annotation()
        // текст над шкалой
        .text({
          position: [item.day, item.value],
          content: item.value,
          style: {
            textAlign: 'center',
            fill: '#fff',
          },
          offsetY: -35,
        })
        // текст над шкалой 2
        .text({
          position: [item.day, item.value],
          content: (item.percent * 100).toFixed(0) + '%',
          style: {
            textAlign: 'center',
            fill: '#fff',
          },
          offsetY: -15,
        });
    });

    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  //================================================================
  useEffect(() => {
    const chart = new Chart({
      container: 'line-chart',
      autoFit: true,
      height: 300,
    });
    chart.data(data);
    chart.scale({
      day: {
        tickCount: data.length,
        alias: 'Messages in this day',
      },
      value: {
        alias: 'Messages for day',
        nice: true,
      },
    });

    chart.axis('day', {
      label: {
        style: { fill: '#fff' },
      },
    });

    chart.axis('value', {
      label: {
        style: { fill: '#fff' },
      },
    });

    chart.line().position('day*value');

    chart.render();

    return () => chart.destroy();
  }, []);

  //================================================================
  useEffect(() => {
    const chart = new Chart({
      container: 'bar-chart',
      autoFit: true,
      height: 300,
    });
    chart.data(data);
    chart.scale({
      value: {
        alias: 'Messages for day',
      },
    });
    chart.axis('type', {
      title: null,
      tickLine: null,
      line: null,
      label: {
        style: { fill: '#fff' },
      },
    });

    chart.axis('value', {
      label: null,
      title: {
        offset: 30,
        style: {
          fontSize: 12,
          fontWeight: 300,
        },
      },
    });

    chart.axis('day', {
      label: {
        style: { fill: '#fff' },
      },
    });

    chart.legend(false);

    chart.coordinate().transpose();

    chart
      .interval()
      .position('day*value')
      .size(20)
      .label('value', {
        style: {
          fill: '#fff',
        },
        offset: 10,
      });

    chart.interaction('element-active');

    chart.theme({
      styleSheet: {
        brandColor: '#4388B9',
        paletteQualitative10: [],
        paletteQualitative20: [],
      },
    });
    chart.render();

    return () => chart.destroy();
  }, []);
  //================================================================
  useEffect(() => {
    const chart = new Chart({
      container: 'pie-chart',
      autoFit: true,
      height: 300,
    });
    chart.data(data);

    chart.coordinate('theta', {
      radius: 0.75,
    });
    chart.tooltip({
      showMarkers: false,
    });

    chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('day', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
      .style({ opacity: 1 })
      .state({
        active: {
          style: {
            border: '1px solid red',
          },
        },
      })
      .label('day', (val) => {
        return {
          offset: -30,
          style: {
            opacity: 1,
            fill: '#fff',
            fontSize: 12,
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
          content: (obj) => {
            return obj.day + '\n' + obj.value + '%';
          },
        };
      });

    chart.interaction('element-single-selected');

    chart.render();

    return () => chart.destroy();
  }, []);

  /// =================================================================

  useEffect(() => {
    const data = [{ gender: 'male', value: 56.4 }];

    const chart = new Chart({
      container: 'facet-chart',
      autoFit: true,
      height: 300,
    });
    chart.data(data);
    chart.legend(false);
    chart.tooltip({
      showMarkers: false,
    });
    chart.facet('rect', {
      fields: ['gender'],
      padding: 20,
      showTitle: false,
      eachView: (view, facet) => {
        if (!facet) return;
        const data = facet.data as { gender: string; value: number }[];
        let color;
        if (data[0].gender === 'male') {
          color = '#75c6ff';
        } else {
          color = '#ff7474';
        }
        data.push({ gender: 'female', value: 100 - data[0].value });
        view.data(data);
        view.coordinate('theta', {
          radius: 0.8,
          innerRadius: 0.7,
        });
        view.interval().adjust('stack').position('value').color('gender', [color, '#ff7474']).style({
          opacity: 1,
        });

        view.annotation().text({
          position: ['50%', '50%'],
          content: `Genders`,
          style: {
            fontSize: 18,
            fill: '#fff',
            fontWeight: 500,
            textAlign: 'center',
          },
          offsetY: 5,
        });

        view.interaction('element-active');
      },
    });
    chart.render();

    return () => chart.destroy();
  }, []);

  return (
    <StWrapper>
      <StChartsRow>
        <StChartBlock id="stats-chart"></StChartBlock>
        <StChartBlock id="line-chart"></StChartBlock>
      </StChartsRow>

      <StChartsRow>
        <StChartBlock id="bar-chart"></StChartBlock>
        <StChartBlock id="pie-chart"></StChartBlock>
      </StChartsRow>

      <StChartsRow>
        <StChartBlock id="facet-chart" />
      </StChartsRow>
    </StWrapper>
  );
};

export default HomePage;
