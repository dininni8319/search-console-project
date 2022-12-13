import AppContext from 'context/Context';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent
} from 'echarts/components';
import dayjs from 'dayjs';
import * as echarts from 'echarts/core';
import { getColor, getPastDates, rgbaColor } from 'helpers/utils';
import { getUrl, turnObjIntoArray } from "../../../../utils";
import PropTypes from 'prop-types';
import React, { forwardRef, useContext } from 'react';
import { tooltipFormatter } from 'helpers/echart-utils';

echarts.use([LineChart, TooltipComponent, GridComponent, LegendComponent]);

const getOption = (data, isDark) => ({
    tooltip: {
    trigger: 'axis',
    padding: [7, 10],
    backgroundColor: getColor('gray-100'),
    borderColor: getColor('gray-300'),
    textStyle: { color: getColor('white') },
    borderWidth: 1,
    transitionDuration: 0,
    formatter: tooltipFormatter
  },
  xAxis: {
    type: 'category',
    data: turnObjIntoArray(data?.data, 'keys').map(date => dayjs(date).format('DD MMM, YYYY')),
    boundaryGap: false,
    silent: true,
    splitLine: { show: false },
    splitLine: {
      show: true,
      lineStyle: {
        color: rgbaColor('#fff', 0.1)
      },
      interval: 0
    },
    axisLine: {
      lineStyle: {
        color: rgbaColor('#fff', 0.1)
      }
    },
    axisTick: {
      show: false,
      length: 10,
      lineStyle: {
        color: rgbaColor('#fff', 0.1)
      }
    },
    axisLabel: {
      color: getColor('gray-400'),
      fontWeight: 100,
      fontSize: 10,
      margin: 5,
      interval: 5,
      formatter: value => dayjs(value).format('MMM DD')
    }
  },
  yAxis: {
    type: 'value',
    axisPointer: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    axisTick: { show: false },
    axisLine: { show: false }
  },
  series: [
    {
      type: 'line',
      smooth: true,
      data: turnObjIntoArray(data?.data, 'clicks'),
      symbol: 'emptyCircle',
      itemStyle: {
        color: isDark ? getColor('primary') : getColor('white')
      },
      lineStyle: {
        color: isDark
          ? rgbaColor(getColor('primary'), 0.8)
          : rgbaColor(getColor('white'), 0.8)
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: isDark
                ? rgbaColor(getColor('primary'), 0.5)
                : rgbaColor('#fff', 0.5)
            },
            {
              offset: 1,
              color: isDark
                ? rgbaColor(getColor('primary'), 0)
                : rgbaColor('#fff', 0)
            }
          ]
        }
      },
      emphasis: {
        lineStyle: {
          width: 2
        }
      }
    }
  ],
   grid: {
    containLabel: true,
    right: '5px',
    left: 0,
    bottom: 0,
    top: 0
  }
})

const LinePaymentChart = forwardRef(({ analytics,  style }, ref) => {
  const {
    config: { isDark }
  } = useContext(AppContext);

  return (
    <ReactEChartsCore
      echarts={echarts}
      ref={ref}
      option={getOption(analytics?.data, isDark)}
      style={style}
    />
  );
});

LinePaymentChart.propTypes = {
  data: PropTypes.shape({
    all: PropTypes.array,
    successful: PropTypes.array,
    failed: PropTypes.array
  }).isRequired,
  style: PropTypes.object
};

export default LinePaymentChart;
