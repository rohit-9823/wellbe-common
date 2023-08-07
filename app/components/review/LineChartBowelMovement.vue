<template>
  <div class="container">
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <div v-if="yAxisLabel" class="y-axis-label">{{ yAxisLabel }}</div>
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
  name: 'LineChartBowelMovement',
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
    holidays: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loaded: false,
      chartData: null,
      chartOptions: null,
    }
  },
  watch: {
    startDate(newValue) {
      this.renderChartOptions(newValue)
    },
  },
  mounted() {
    this.createLabels()

    this.loaded = false
    try {
      // const { userlist } = await fetch('/api/userlist')
      setTimeout(() => {
        this.chartData = {
          datasets: this.dataset,
        }
        this.renderChartOptions(this.startDate)

        this.loaded = true
      }, 1)
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
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
    renderChartOptions(startDate) {
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
            display: this.legendDisplay,
            align: 'start',
            fullSize: false,
            labels: {
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
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: this.maxPoint,
            display: true,
            grid: {
              borderColor: '#4C5163',
              borderWidth: 1,
              display: true,
            },
            title: {
              display: true,
              padding: { top: 0, bottom: -5 },
            },
            ticks: {
              callback(label, index, labels) {
                switch (label) {
                  case 0:
                    return '0'
                  case 5:
                    return '5'
                  case 10:
                    return '10'
                  case 15:
                    return '15'
                  case 20:
                    return '20'
                }
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
  top: 30px;
  left: 14px;
  color: #818591;
}
</style>
