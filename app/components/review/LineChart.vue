<template>
  <div class="container">
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <div
      v-if="yAxisLabel"
      :class="hintMessages ? 'y-axis-label-hint' : 'y-axis-label'"
    >
      {{ yAxisLabel }}
    </div>
    <LineChartGenerator
      v-if="loaded"
      :chart-data="chartData"
      :chart-options="chartOptions"
      :height="height"
      :width="width"
    />
  </div>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import moment from 'moment'
import { formatDateToYmd } from '@/utils/const'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: 'LineChart',
  components: { LineChartGenerator },
  props: {
    width: {
      type: Number,
      default: undefined,
    },
    height: {
      type: Number,
      default: undefined,
    },
    maxPoint: {
      type: Number,
      default: 10,
    },
    startDate: {
      type: String,
      default: formatDateToYmd(new Date()),
    },
    endDate: {
      type: String,
      default: formatDateToYmd(new Date()),
    },
    dataset: {
      type: Array,
      default: undefined,
    },
    hintMessages: {
      type: String,
      default: undefined,
    },
    hintMessagesColor: {
      type: String,
      default: 'black',
    },
    legendDisplay: {
      type: Boolean,
      default: false,
    },
    yAxisLabel: {
      type: String,
      default: '',
    },
    yVerticalAxisSettings: {
      type: Object,
      default: undefined,
    },
    holidays: {
      type: Array,
      default: () => [],
    },
    guidePos: {
      type: Array,
      default: undefined,
    },
    y2VerticalAxisSettings: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      loaded: false,
      chartData: null,
      chartOptions: null,
      displayLabels: this.legendDisplay,
      yVerticalAxisValue: [],
    }
  },
  watch: {
    startDate(newValue) {
      this.renderChartOptions(
        newValue,
        this.yVerticalAxisValue,
        this.yVerticalAxisSettings,
        this.y2VerticalAxisSettings
      )
    },
  },
  mounted() {
    this.yVerticalAxisValue = [
      this.yVerticalAxisSettings.label_mapper === undefined
        ? 0
        : this.yVerticalAxisSettings.label_mapper,
    ]
    this.createLabels()
    this.loaded = false
    const modifiedDataset = [...this.dataset]
    if (modifiedDataset.length > 1) {
      modifiedDataset[0].yAxisID = 'y'
      modifiedDataset[1].yAxisID = 'y1'
    }
    try {
      // const { userlist } = await fetch('/api/userlist')
      setTimeout(() => {
        this.chartData = {
          datasets: modifiedDataset,
        }
        this.renderChartOptions(
          this.startDate,
          this.yVerticalAxisValue,
          this.yVerticalAxisSettings,
          this.y2VerticalAxisSettings
        )
        this.loaded = true
      }, 1)
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    generateDynamicValue(value) {
      if (value === 'min') {
        return (
          Math.min(...this.dataset[0].data.filter((n) => n).map(Number)) -
          this.yVerticalAxisSettings.min_margin
        )
      } else {
        return (
          Math.max(...this.dataset[0].data.filter((n) => n).map(Number)) +
          this.yVerticalAxisSettings.max_margin
        )
      }
    },
    createLabels() {
      const jDays = ['日', '月', '火', '水', '木', '金', '土']
      const labels = []
      for (
        let m = moment(this.startDate);
        m.diff(this.endDate, 'days') <= 0;
        m.add(1, 'days')
      ) {
        labels.push([m.format('DD'), jDays[m.day()]])
      }
      return labels
    },
    setLabelsColor() {
      const dayColor = Array.from({ length: 7 }, () => 'black')
      dayColor[0] = '#FB0212'
      dayColor[6] = '#1C21FC'

      const labelColors = []
      for (
        let m = moment(this.startDate);
        m.diff(this.endDate, 'days') <= 0;
        m.add(1, 'days')
      ) {
        labelColors.push(dayColor[m.day()])
        if (this.holidays.some((holiday) => moment(holiday.date).isSame(m))) {
          if (labelColors[labelColors.length - 1] !== 'blue')
            labelColors[labelColors.length - 1] = 'red'
        }
      }
      return labelColors
    },
    renderChartOptions(
      startDate,
      yVerticalValue,
      yVerticalSetting,
      y2VerticalAxisSettings
    ) {
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false,
            text: '※グラフ内△マーク：記録あり',
            align: 'start',
            fullSize: false,
            padding: {
              top: 10,
            },
            font: { weight: 'normal' },
            color: 'black',
          },
          legend: {
            display: this.displayLabels,
            align: 'start',
            fullSize: false,
            labels: {
              filter: (legendItem, chartData) => {
                if (this.guidePos) {
                  const guideKey = Object.keys(
                    this.guidePos[legendItem.datasetIndex]
                  )[0]
                  const guideValue =
                    this.guidePos[legendItem.datasetIndex][guideKey]
                  return parseInt(guideValue) !== 0
                }
              },
              boxHeight: 1,
              color: 'black',
            },
          },
          tooltip: {
            callbacks: {
              title(context) {
                return context[0].label.replace(',', '')
              },

              labelColor(context) {
                return {
                  backgroundColor: context.dataset.borderColor,
                }
              },
              label(context) {
                const values = []
                let finalValues = []
                if (yVerticalSetting.label_mapper) {
                  context.dataset.data.forEach((value, index) => {
                    if (value != null) {
                      if (typeof value === 'string') {
                        const valueArray = value.split(',')
                        valueArray.forEach((item, itemIndex) => {
                          if (
                            Object.prototype.hasOwnProperty.call(
                              yVerticalSetting.label_mapper,
                              item
                            )
                          ) {
                            valueArray[itemIndex] =
                              yVerticalSetting.label_mapper[item]
                          }
                        })
                        value = valueArray.join(', ')
                      }
                      const combineData = [{ value, index }]
                      values.push(...combineData)
                    }
                  })
                  finalValues = values.filter(
                    (data) => data.index === context.dataIndex
                  )
                  return finalValues[0].value
                } else {
                  context.dataset.data.forEach((value, index) => {
                    if (value != null) {
                      if (typeof value === 'string') {
                        const valueArray = value.split(',')
                        value = valueArray.join(', ')
                      }
                      const combineData = [{ value, index }]
                      values.push(...combineData)
                    }
                  })
                  finalValues = values.filter(
                    (data) => data.index === context.dataIndex
                  )
                  return finalValues[0].value
                }
              },
            },
          },
        },
        scales: {
          y: {
            position: 'left',
            beginAtZero: true,
            display: true,
            grid: {
              borderColor: '#4C5163',
              borderWidth: 1,
              display: !y2VerticalAxisSettings,
            },
            min:
              this.yVerticalAxisSettings &&
              this.yVerticalAxisSettings.min !== ''
                ? parseInt(this.yVerticalAxisSettings.min)
                : this.generateDynamicValue('min'),
            max:
              this.yVerticalAxisSettings &&
              this.yVerticalAxisSettings.max !== ''
                ? parseInt(this.yVerticalAxisSettings.max)
                : this.generateDynamicValue('max'),
            title: {
              display: true,
              padding: { top: 0, bottom: -5 },
            },
            ticks: {
              stepSize: this.yVerticalAxisSettings?.interval,
              autoSkip: false,
              beginAtZero: true,
              precision: 0,
              callback(value, label, index, labels) {
                if (`${yVerticalValue[0]}` === '0') {
                  return value
                }
                return yVerticalValue[0][value]
              },
            },
          },
          y1: {
            position: 'right',
            grid: {
              borderColor: '#4C5163',
              borderWidth: 1,
              display: false,
            },
            min:
              y2VerticalAxisSettings && y2VerticalAxisSettings.min
                ? parseInt(y2VerticalAxisSettings.min)
                : 0,
            max:
              y2VerticalAxisSettings && y2VerticalAxisSettings.max
                ? parseInt(y2VerticalAxisSettings.max)
                : '',
            ticks: {
              stepSize: y2VerticalAxisSettings?.interval,
              autoSkip: false,
              callback: function (value) {
                if (y2VerticalAxisSettings) {
                  return value
                }
                return ''
              },
            },
          },

          x: {
            labels: this.createLabels(),
            grid: {
              borderColor: '#4C5163',
              borderWidth: 1,
              display: false,
            },
            ticks: {
              color: this.setLabelsColor(startDate),
              maxRotation: 0,
              minRotation: 0,
            },
          },
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.y-axis-label {
  font-size: 10px;
  position: absolute;
  top: 7px;
  left: 14px;
  color: #818591;
}
.y-axis-label-hint {
  font-size: 10px;
  position: absolute;
  top: 20px;
  left: 14px;
  color: #818591;
}
</style>
