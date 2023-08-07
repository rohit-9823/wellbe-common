<template>
  <div class="profile">
    <div v-for="(ss, screenIndex) in screenStructures" :key="screenIndex">
      <!-- Section -->
      <w-common-section
        v-if="ss.section.label != null"
        :section="ss.section"
        :custom-style-obj="ss.section?.style"
        :new-hint-message="ss.section.annotation"
      />
      <!-- Parts -->
      <div class="profile__content pa-0">
        <div
          v-for="(p, partIndex) in ss.parts"
          :key="`${screenIndex}-${partIndex}`"
        >
          <w-common-component
            v-if="
              (p.kind === constants.SPECIAL || p.kind !== constants.SPECIAL) &&
              !(
                p.part_type_component_name ===
                constants.FORMAT_DATA_COMPONENT_NAME
              )
            "
            :part="p"
            :style-obj="p.style"
            :label-style-obj="getStyle(constants.LABEL_STYLE, p.other_style)"
            :label-required-obj="
              getStyle(constants.LABEL_REQUIRED_STYLE, p.other_style)
            "
            parent-class-name="profile__content"
          />
          <w-format-data
            v-if="
              p.part_type_component_name ===
              constants.FORMAT_DATA_COMPONENT_NAME
            "
            :label="p.label"
            :value="p.part_value"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import moment from 'moment/moment'

import WCommonComponent from '@/components/common/WCommonComponent'
import WCommonSection from '@/components/common/WCommonSection'

import { GetHeaderToken } from '@/api/util'
import { WCUP1001 } from '@/api/collection/WCUP1001'
import WFormatData from '@/components/stories/WFormatData'
import { CONSTANTS } from '@/utils/constants'
import { validations } from '@/utils/validations'
import { sendEvent } from '@/utils/native'

export default {
  name: 'ProfileView',
  components: {
    WFormatData,
    WCommonSection,
    WCommonComponent,
  },
  async asyncData({ $axios, query, error, req }) {
    if (!(req && req.headers)) {
      return {}
    }

    const xWLBHeader = GetHeaderToken(req.headers)

    if (!xWLBHeader.xWLBAuthorization || !xWLBHeader.xWLBApplicationId) {
      error({
        statusCode: CONSTANTS.HTTP_STATUS_BAD_REQUEST_CODE,
        message: CONSTANTS.HTTP_STATUS_BAD_REQUEST_MESSAGE,
      })
      return {}
    }

    const response = await WCUP1001($axios, xWLBHeader)
    if (
      response.error &&
      [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
        process.env.SERVER_NAME
      )
    ) {
      error({
        statusCode: response.status,
        message: JSON.stringify(response.error) + ' ' + CONSTANTS.WCUP1001_API,
      })
      return {}
    }
    return {
      xWLBHeader,
      screenStructures: response.data.screen_structures,
      application: response.data.application,
    }
  },
  data: () => ({
    screenStructures: [],
    constants: CONSTANTS,
    validate: validations,
  }),
  created() {
    const clonedApplication = cloneDeep(this.application)
    this.$store.dispatch('theme/updateApplication', clonedApplication)
  },
  mounted() {
    this.$store.dispatch('theme/setXWLBHeader', this.xWLBHeader)

    sendEvent(
      'onPageFinished',
      `{"title": "プロフィール情報", "showBack": false}`
    )
  },
  methods: {
    getStyle(styleType, styleObj) {
      let current = {}
      if (styleObj) {
        switch (styleType) {
          case this.constants.LABEL_STYLE:
            if (this.constants.LABEL in styleObj) current = styleObj.label
            break
          case this.constants.LABEL_REQUIRED_STYLE:
            if (this.constants.LABEL_REQUIRED in styleObj)
              current = styleObj[this.constants.LABEL_REQUIRED]
            break
        }
        return current
      }
    },
    getMappedValue(id, value, mapObj) {
      if (mapObj) {
        const found = mapObj.find(
          (m) =>
            String(m.value).replace(/^0+/, '') ===
            String(value).replace(/^0+/, '')
        )

        if (found) return found.label
      }
      const formatType = this.validate.getFormat(id)
      return this.customizeValue(value, formatType)
    },

    customizeValue(val, formatType) {
      if (this.validate.isValueEmpty(val)) return val

      let value = val
      switch (formatType) {
        case this.constants.STRING:
          value = val
          break
        case this.constants.DATE_FORMAT:
          value = moment(val).format('YYYY/MM/DD')
          break
      }
      return value
    },
  },
}
</script>

<style lang="scss">
html,
body {
  margin: 0 !important;
}

.profile {
  padding-bottom: 32px;

  &__title {
    background-color: #fff8ca;
    padding: 11px 16px;
    font-weight: 600;
    font-size: 16px;
    color: #4c5163;
  }

  &__btn {
    padding: 10px;
  }

  &__mention {
    padding: 20px;
    text-align: center;
  }
}
</style>
