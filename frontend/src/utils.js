import { getColor, getPastDates, rgbaColor } from 'helpers/utils';
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
    textStyle: { color: getColor('white') },
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
      length: 10,
      lineStyle: {
        color: rgbaColor('#fff', 0.1)
      }
    },
    axisLabel: {
      color: getColor('white-600'),
      formatter: value => dayjs(value).format('MMM DD'),
      align: 'left',
      fontSize: 16,
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
      show: false,
      color: getColor('gray-600'),
      // formatter: value => `${Math.round((value / 1000) * 10) / 10}k`
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
        borderColor: '#00bbf9',
        borderWidth: 2
      },
      lineStyle: {
        color: '#00bbf9'
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
        borderColor: '#fee440',
        borderWidth: 2
      },
      lineStyle: {
        color: '#fee440'
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
        borderColor: '#9b5de5',
        borderWidth: 2
      },
      lineStyle: {
        color: '#9b5de5'
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
        borderColor: '#f15bb5',
        borderWidth: 2
      },
      lineStyle: {
        color: '#f15bb5'
      },
      symbolSize: 2
    },
  ],
  grid: { right: 15, left: 15, bottom: '15%', top: 0 }
  // grid: {
  //   containLabel: true,
  //   right: '5px',
  //   left: 0,
  //   bottom: 0,
  //   top: 0
  // }
});
