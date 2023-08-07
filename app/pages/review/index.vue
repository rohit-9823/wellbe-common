<template>
  <div class="content">
    <div v-for="(ss, screenIndex) in screenStructures" :key="screenIndex">
      <!-- Section -->
      <w-common-section
        v-if="showSection(ss)"
        :class-name="`main__content__label`"
        :section="ss.section"
        :custom-style-obj="ss.section?.style"
      />
      <!-- Parts -->
      <div
        v-for="(p, partIndex) in ss.parts"
        :key="`${screenIndex}-${partIndex}`"
        class="main__content__content"
      >
        <div
          v-if="
            p.part_type_component_name === constants.LINE_CHART_COMPONENT_NAME
          "
        >
          <line-chart
            :y2-vertical-axis-settings="p.axis2_vertical_axis_settings"
            :dataset="getLineChartDataSet(p)"
            :end-date="queryParam.rangeTo"
            :height="200"
            :hint-messages="p.annotation"
            :legend-display="true"
            :start-date="queryParam.rangeFrom"
            :hint-messages-color="'#4C5163'"
            :max-point="20"
            :y-axis-label="getYAxisLabel(p)"
            :y-vertical-axis-settings="p.axis1_vertical_axis_settings"
            :guide-pos="getAllGuides(p)"
          />
        </div>
        <div
          v-if="
            p.part_type_component_name ===
              constants.RECORDING_CALENDAR_GRID_COMPONENT_NAME && showGrid
          "
        >
          <w-recording-calendar
            :grid-week="getDataObject(p.id)"
            :breakfast="getRecordingBreakfast(p.id)"
            :dinner="getRecordingDinner(p.id)"
            :hint-messages="p.annotation"
            :lunch="getRecordingLunch(p.id)"
            :memo="getRecordingMemo(p.id)"
            :start-date="queryParam.rangeFrom"
            :stomach-ache="getRecordingStomachache(p.id)"
            :taking-medicine="getRecordingTakingMedicine(p.id)"
            :part-head="getRecordingPartHead(p.id)"
            :back-head="getRecordingPartBackHead(p.id)"
            :front-head="getRecordingPartFrontHead(p.id)"
            :part-left-hand="getRecordingPartLeftHand(p.id)"
            :part-right-hand="getRecordingPartRightHand(p.id)"
            :part-left-leg="getRecordingPartLeftLeg(p.id)"
            :part-pain="getRecordingPartPain(p.id)"
            :part-right-leg="getRecordingPartRightLeg(p.id)"
            :part-waist="getRecordingPartWaist(p.id)"
            :part-abdomen="getRecordingPartAbdomen(p.id)"
            :part-chest="getRecordingPartChest(p.id)"
            :part-back="getRecordingPartBack(p.id)"
            :part-whole-body="getRecordingPartWholeBody(p.id)"
            :part-stomach-ache="getRecordingPartStomachache(p.id)"
            :part-anti-diarrheal="getRecordingPartAntidiarrheal(p.id)"
            :part-bloody-stool="getRecordingPartBloodyStool(p.id)"
            :irregular-pulse-wave="getIrregularPulseWave(p.id)"
            :even-line-color="getEvenLineColor(p)"
            :odd-line-color="getOddLineColor(p)"
            :guide-position="getGuidePosition(p)"
            :days-total="daysTotal"
            :default-style="defaultStyle"
            @click="wCalendarMemoClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash-es'

import { validations } from '@/utils/validations'
import LineChart from '@/components/review/LineChart'
import WCommonSection from '@/components/common/WCommonSection'
import WRecordingCalendar from '@/components/stories/WRecordingCalendar'
import { CONSTANTS, shapeKeyMap } from '@/utils/constants'

import { GetHeaderToken } from '@/api/util'
import { WCRTSP1001 } from '@/api/collection/WCRTSP1001'
import { sanitizer } from '@/utils/sanitizer'
import { sendEvent, sendEventOnError } from '@/utils/native'

export default {
  name: 'ReviewPage',
  components: {
    WCommonSection,
    LineChart,
    WRecordingCalendar,
  },
  async asyncData({ $axios, query, error, req }) {
    if (!(req && req.headers)) {
      return {}
    }

    const xWLBHeader = GetHeaderToken(req.headers)
    if (
      !query.from_date ||
      !query.to_date ||
      !moment(query.from_date).isValid() ||
      !moment(query.to_date).isValid() ||
      !xWLBHeader.xWLBAuthorization ||
      !xWLBHeader.xWLBApplicationId
    ) {
      error({
        statusCode: CONSTANTS.HTTP_STATUS_BAD_REQUEST_CODE,
        message: CONSTANTS.HTTP_STATUS_BAD_REQUEST_MESSAGE,
      })
      return {}
    }
    const response = await WCRTSP1001($axios, xWLBHeader, {
      from_date: query.from_date,
      to_date: query.to_date,
      show_grid: query.show_grid === 'true',
    })
    const from = moment(query.from_date)
    const to = moment(query.to_date)
    if (
      response.error &&
      [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
        process.env.SERVER_NAME
      )
    ) {
      error({
        statusCode: response.status,
        message:
          JSON.stringify(response.error) + ' ' + CONSTANTS.WCRTSP1001_API,
      })

      sendEventOnError(response)
      return {}
    }
    return {
      xWLBHeader,
      screenStructures: response.data.screen_structures,
      application: response.data.application,
      showGrid: query.show_grid === 'true',
      daysTotal: to.diff(from, 'days'),
      queryParam: {
        rangeFrom: from.format('YYYY-MM-DD'),
        rangeTo: to.format('YYYY-MM-DD'),
      },
      dataObject: response.data.datas,
    }
  },
  data: () => ({
    screenStructures: [],
    showGrid: false,
    dataObject: {},
    defaultStyle: { width: 'auto', overflow: 'scroll' },
    daysTotal: 7,
    validate: validations,
    constants: CONSTANTS,
    sanitize: sanitizer,
  }),
  computed: {
    ...mapGetters({
      getAttributeValue: 'theme/getAttributeValue',
      getColorValue: 'theme/getColorValue',
    }),
  },
  created() {
    const clonedApplication = cloneDeep(this.application)
    this.$store.dispatch('theme/updateApplication', clonedApplication)
  },
  mounted() {
    sendEvent('onPageFinished', `{"title": "Review", "showBack": false}`)
  },
  methods: {
    getAllGuides(part) {
      const keys = Object.keys(part)
      const guide = []
      keys.forEach(
        (key) =>
          key.includes(this.constants.GUIDE_POSITION_STRING) &&
          guide.push({ [key]: part[key] })
      )
      return guide
    },
    getYAxisLabel(part) {
      return part.vertical_unit == null ? '' : part.vertical_unit
    },
    wCalendarMemoClick($event) {
      console.log($event)
    },
    showSection(screenStructure) {
      if (
        screenStructure &&
        this.validate.matchesIdWithString(
          screenStructure.parts[0].id,
          this.constants.GREED_WEEK_STRING
        )
      ) {
        return this.showGrid && screenStructure.section.label != null
      }
      return screenStructure.section.label != null
    },
    updateDataSet(current, axis, dataSetToUpdate) {
      if (axis && Object.keys(axis).length) {
        try {
          if (axis.dates) {
            const index = axis.dates.indexOf(current.format('YYYY-MM-DD'))
            if (index !== -1)
              dataSetToUpdate.push(
                axis.datas[index] === '' ? null : axis.datas[index]
              )
            else dataSetToUpdate.push(null)
          } else dataSetToUpdate.push(null)
        } catch (e) {
          console.warn('Dataset could not be updated properly so set to null')
          dataSetToUpdate.push(null)
        }
      } else {
        dataSetToUpdate.push(null)
      }
    },
    getDataObject(type) {
      return this.dataObject[type]
    },
    getEvenLineColor(part) {
      return this.getAttributeValue(part.even_lines_color)
    },
    getOddLineColor(part) {
      return this.getAttributeValue(part.odd_lines_color)
    },
    getGuidePosition(part) {
      return part.guide_position
    },

    getFixedDateData(dateSet, valueSet) {
      const matchDataSet = dateSet.map((k, index) => {
        return {
          key: k,
          value: valueSet[index],
        }
      })
      let start = moment(this.queryParam.rangeFrom)
      const dataSet = []
      while (start <= moment(this.queryParam.rangeTo)) {
        // update DataSet
        const found = matchDataSet.find(
          (d) => d.key === start.format('YYYY-MM-DD')
        )

        if (found) dataSet.push(found.value)
        else dataSet.push('')
        start = start.add(1, 'days')
      }

      return dataSet
    },

    getRecordingBreakfast(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.BREAKFAST
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingDinner(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.DINNER
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingLunch(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.LUNCH
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingMemo(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.MEMO
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingStomachache(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.STOMACH_ACHE
        ).val

        const dataSet = this.getFixedDateData(headerSet, valueSet)

        return dataSet.map((d) => {
          if (d === '0' || d === 0) d = null
          return d
        })
      } catch (e) {
        return []
      }
    },
    getRecordingTakingMedicine(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.TAKING_MEDICINE
        ).val

        const dataSet = this.getFixedDateData(headerSet, valueSet)

        return dataSet.map((d) => {
          if (d === '0' || d === 0) d = null
          return d
        })
      } catch (e) {
        return []
      }
    },
    getAxisSetPointKey(data) {
      const found = shapeKeyMap.filter((value) => value.type === data)
      return found[0]?.key
    },
    getRecordingPartFrontHead(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.FRONT_HEAD
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartBackHead(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.BACK_HEAD
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartHead(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.HEAD
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartLeftHand(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.LEFT_HAND
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartPain(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.PAIN
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartLeftLeg(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.LEFT_LEG
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },

    fetchEmptyArray(currentDataset, valueSet) {
      const differenceInDays = moment(this.queryParam.rangeTo).diff(
        moment(this.queryParam.rangeFrom),
        'days'
      )
      if (valueSet.length === 0) {
        return new Array(differenceInDays + 1).fill(null)
      }
    },
    getRecordingPartRightHand(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.RIGHT_HAND
        ).val

        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }

        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartRightLeg(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.RIGHT_LEG
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartWaist(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.WAIST
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartWholeBody(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.WHOLE_BODY
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartAbdomen(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.ABDOMEN
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartChest(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.CHEST
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },

    getRecordingPartBack(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.PART_BACK
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartStomachache(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.STOMACH_ACHE
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },
    getRecordingPartAntidiarrheal(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.ANTI_DIARRHEAL
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },

    getRecordingPartBloodyStool(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.BLOODY_STOOL
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },

    getIrregularPulseWave(id) {
      try {
        const currentDataset = this.getDataObject(id).datas
        const headerSet = this.getDataObject(id).header
        const valueSet = currentDataset.find(
          (c) => c.label === this.constants.IRREGULAR_PULSE_WAVE
        ).val
        const isEmpty = this.fetchEmptyArray(currentDataset, valueSet)
        if (isEmpty) {
          return isEmpty
        }
        return this.getFixedDateData(headerSet, valueSet)
      } catch (e) {
        return []
      }
    },

    setDataSetForXAxisPlot(part, data) {
      const dataSet = {}
      dataSet.label = part.axis1_title
      dataSet.data = data
      dataSet.pointStyle = this.getAxisSetPointKey(part.axis1_plot_type.plot1)
      dataSet.pointBackgroundColor = part.axis1_style.pointBackgroundColor
      dataSet.pointBorderWidth = part.axis1_style.pointBorderWidth
      dataSet.pointBorderColor = this.getColorValue(
        part.axis1_style.pointBorderColor
      )
      dataSet.pointRadius = part.axis1_style.pointRadius
      dataSet.hoverRadius = part.axis1_style.hoverRadius
      dataSet.borderColor = this.getColorValue(part.axis1_style.borderColor)
      dataSet.backgroundColor = this.getColorValue(
        part.axis1_style.backgroundColor
      )
      dataSet.spanGaps = true

      return dataSet
    },

    setDataSetForYAxisPlot(part, data) {
      const dataSet = {}
      dataSet.label = part.axis2_title
      dataSet.data = data
      dataSet.pointStyle = this.getAxisSetPointKey(part.axis2_plot_type.plot1)
      dataSet.pointBackgroundColor = part.axis2_style.pointBackgroundColor
      dataSet.pointBorderWidth = part.axis2_style.pointBorderWidth
      dataSet.pointBorderColor = this.getColorValue(
        part.axis2_style.pointBorderColor
      )
      dataSet.pointRadius = part.axis2_style.pointRadius
      dataSet.hoverRadius = part.axis2_style.hoverRadius
      dataSet.borderColor = this.getColorValue(part.axis2_style.borderColor)
      dataSet.backgroundColor = this.getColorValue(
        part.axis2_style.backgroundColor
      )
      dataSet.spanGaps = true

      return dataSet
    },

    getCommonDataSet(part, d1, d2) {
      const currentDatSet = []
      currentDatSet.push(this.setDataSetForXAxisPlot(part, d1))

      if (d2.length > 0)
        currentDatSet.push(this.setDataSetForYAxisPlot(part, d2))

      return currentDatSet
    },

    mapDataSetWithSpecificDate(part, xAxis, yAxis) {
      let start = moment(this.queryParam.rangeFrom)
      const dataSetXAxis = []
      const dataSetYAxis = []
      while (start <= moment(this.queryParam.rangeTo)) {
        // update DataSet for x and y-axis in a loop
        this.updateDataSet(start, xAxis, dataSetXAxis)

        if (yAxis !== undefined && Object.keys(yAxis).length !== 0)
          this.updateDataSet(start, yAxis, dataSetYAxis)

        start = start.add(1, 'days')
      }

      const drawingAxis = part.drawing_axis
      if (parseInt(drawingAxis) === 1)
        return this.getCommonDataSet(part, dataSetXAxis, [])

      return this.getCommonDataSet(part, dataSetXAxis, dataSetYAxis)
    },

    getLineChartDataSet(part) {
      const retrievedDataSetObj = this.dataObject[part.id]

      const datasetXAxis = retrievedDataSetObj ? retrievedDataSetObj.axis1 : {}
      const datasetYAxis = retrievedDataSetObj ? retrievedDataSetObj.axis2 : {}
      return this.mapDataSetWithSpecificDate(part, datasetXAxis, datasetYAxis)
    },
  },
}
</script>

<style lang="scss">
html,
body {
  margin: 0 !important;
}

.content {
  .main__content__label {
    padding: 11px 16px;

    &:not(:first-of-type) {
      margin-top: 30px;
    }
  }

  .main__content__content {
    padding: 16px;
  }

  .btn__memo_list {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    padding-right: 22px;

    & ::v-deep(.w-button__button) {
      min-height: auto;
      font-size: 14px;
      padding-left: 30px;
      padding-right: 12px;
      position: relative;

      &::before {
        content: '';
        width: 25px;
        height: 25px;
        background-color: #009ddc;
        position: absolute;
        left: 4px;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        mask-image: url('../../assets/img/icon_Memo_32.svg');
        mask-repeat: no-repeat;
        mask-size: contain;
      }

      &:disabled {
      }

      &:active {
        &::before {
          background-color: #1b8ac1;
        }
      }
    }
  }

  .btn__report {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
