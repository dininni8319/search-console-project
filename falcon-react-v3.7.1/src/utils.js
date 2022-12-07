import { getColor, getPastDates } from 'helpers/utils';
import dayjs from 'dayjs';
import { tooltipFormatter } from 'helpers/echart-utils';

export function getUrl(site) {
  const reg = /^https?:\/\/|\/+$/g;

  return (site).replace(reg, '');
}

export function turnObjIntoArray(data, allowedKey) {
  let arr = [];
  const allowed = [allowedKey];

  for (let i = 0; i < data?.length; i++) {
    const el = data[i];
   
    const filtered = Object.keys(el)
    .filter(key => allowed.includes(key))
    .reduce((arr, key) => {
     
      arr = [el[key]].concat(arr);
      return arr;
    }, []);
    arr = arr.concat(filtered);
  }
  return arr;
}

export const getOptions = data => ({
  color: [getColor('primary'), getColor('success'), getColor('info'), getColor('danger')],
  tooltip: {
    trigger: 'axis',
    padding: [7, 10],
    backgroundColor: getColor('gray-100'),
    borderColor: getColor('gray-300'),
    textStyle: { color: getColor('dark') },
    borderWidth: 1,
    transitionDuration: 0,
    formatter: tooltipFormatter
  },
  xAxis: {
    type: 'category',
    data: getPastDates(90).map(date => dayjs(date).format('DD MMM, YYYY')),
    boundaryGap: false,
    silent: true,
    axisPointer: {
      lineStyle: {
        color: getColor('gray-300')
      }
    },
    splitLine: { show: false },
    axisLine: {
      lineStyle: {
        color: getColor('gray-300')
      }
    },
    axisTick: {
      show: true,
      length: 20,
      lineStyle: {
        color: getColor('gray-200')
      },

      interval: 5
    },
    axisLabel: {
      color: getColor('gray-600'),
      formatter: value => dayjs(value).format('MMM DD'),
      align: 'left',
      fontSize: 11,
      padding: [0, 0, 0, 5],
      interval: 5
    }
  },
  yAxis: {
    type: 'value',
    position: 'right',
    axisPointer: { show: false },
    splitLine: {
      lineStyle: {
        color: getColor('gray-200')
      }
    },
    axisLabel: {
      show: true,
      color: getColor('gray-600'),
      formatter: value => `${Math.round((value / 1000) * 10) / 10}k`
    },
    axisTick: { show: false },
    axisLine: { show: false }
  },
  series: [
    {
      type: 'line',
      name: 'Clicks',
      data: turnObjIntoArray(data?.data, 'clicks'),
      showSymbol: false,
      symbol: 'circle',
      itemStyle: {
        borderColor: getColor('primary'),
        borderWidth: 2
      },
      lineStyle: {
        color: getColor('primary')
      },
      symbolSize: 2
    },
    {
      type: 'line',
      name: 'Impressions',
      data: turnObjIntoArray(data?.data, 'impressions'),
      showSymbol: false,
      symbol: 'circle',
      itemStyle: {
        borderColor: getColor('success'),
        borderWidth: 2
      },
      lineStyle: {
        color: getColor('success')
      },
      symbolSize: 2
    },
    {
      type: 'line',
      name: 'Position',
      data: turnObjIntoArray(data?.data, 'position'),
      showSymbol: false,
      symbol: 'circle',
      itemStyle: {
        borderColor: getColor('danger'),
        borderWidth: 2
      },
      lineStyle: {
        color: getColor('info')
      },
      symbolSize: 2
    },
    {
      type: 'line',
      name: 'CTR',
      data: turnObjIntoArray(data?.data, 'ctr'),
      showSymbol: false,
      symbol: 'circle',
      itemStyle: {
        borderColor: getColor('primary'),
        borderWidth: 2
      },
      lineStyle: {
        color: getColor('primary')
      },
      symbolSize: 2
    },
  ],
  grid: {
    containLabel: true,
    right: '5px',
    left: 0,
    bottom: 0,
    top: 10
  }
});
