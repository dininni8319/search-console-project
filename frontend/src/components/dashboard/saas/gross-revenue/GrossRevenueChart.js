import dayjs from 'dayjs';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { getOptions, turnObjIntoArray } from '../../../../utils';
import { getDates } from 'helpers/utils';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

echarts.use([LineChart, TooltipComponent, GridComponent, LegendComponent]);

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const dates = month => {
  return getDates(
    dayjs().month(months.indexOf(month)).date(1),
    dayjs()
      .month(Number(months.indexOf(month)) + 1)
      .date(0),
    1000 * 60 * 60 * 24 * 3
  );
};

const tooltipFormatter = (params, selectedMonth, previousMonth) => {
  let tooltipItem = ``;
  params.forEach(el => {
    const currentDate = dayjs(el.axisValue);
    tooltipItem =
      tooltipItem +
      `<h6 class="fs--1 text-700 d-flex align-items-center">
        <div class="dot me-2" style="background-color:${el.borderColor}"></div>
        ${
          el.seriesName === 'prevMonth' ? previousMonth : selectedMonth
        } ${currentDate.format('DD')} : ${el.value}
      </h6>`;
  });
  return `<div class='ms-1'>
            ${tooltipItem}
          </div>`;
};

const GrossRevenueChart = forwardRef(
  ({ analytics, selectedMonth, previousMonth, ...rest }, ref) => {
    const lenArr = turnObjIntoArray(analytics?.data?.data, 'keys');
    return (
      <ReactEChartsCore
        echarts={echarts}
        option={getOptions(analytics?.data, lenArr)}
        echarts={echarts}
        // ref={ref}
        // option={getOption(data, selectedMonth, previousMonth)}
        // {...rest}
      />
    );
  }
);

GrossRevenueChart.propTypes = {
  data: PropTypes.shape({
    Jan: PropTypes.array.isRequired,
    Feb: PropTypes.array.isRequired,
    Mar: PropTypes.array.isRequired,
    Apr: PropTypes.array.isRequired,
    May: PropTypes.array.isRequired,
    Jun: PropTypes.array.isRequired,
    Jul: PropTypes.array.isRequired,
    Aug: PropTypes.array.isRequired,
    Sep: PropTypes.array.isRequired,
    Oct: PropTypes.array.isRequired,
    Nov: PropTypes.array.isRequired,
    Dec: PropTypes.array.isRequired
  }).isRequired,
  selectedMonth: PropTypes.string,
  previousMonth: PropTypes.string
};

export default GrossRevenueChart;
