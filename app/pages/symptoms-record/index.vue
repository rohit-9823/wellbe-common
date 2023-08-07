<template>
  <div>
    <div v-for="(ss, screenIndex) in screenStructures" :key="screenIndex">
      <!-- Section -->
      <w-common-section
        v-if="ss.section.label != null"
        :section="ss.section"
        :custom-style-obj="ss.section?.style"
        :new-hint-message="ss.section.annotation"
      />
      <!-- Parts -->
      <div class="parts">
        <div
          v-for="(p, partIndex) in ss.parts"
          :key="`${screenIndex}-${partIndex}`"
        >
          <w-common-component
            v-if="p.kind !== constants.SPECIAL"
            :part="p"
            :style-obj="p.style"
            :label-style-obj="getStyle(constants.LABEL_STYLE, p.other_style)"
            :label-required-obj="
              getStyle(constants.LABEL_REQUIRED_STYLE, p.other_style)
            "
            @input="updateCurrentPartValue($event, screenIndex, partIndex)"
            @click="submit($event, p, ss.parts)"
          >
          </w-common-component>

          <!--special Components-->
          <div
            v-else-if="
              p.kind === constants.SPECIAL &&
              toRenderDefecationSpecialComponent(
                p.id,
                constants.DEFECATION_GROUP_STRING
              )
            "
            class="parts__special-component"
          >
            <w-indicator
              v-model="indicator.defecation_count"
              :title="p.child_nodes[0].label"
              unit="回"
              :length="getRange(p.child_nodes[0].extra_data)"
              :class-inner="'wrating_blue'"
              @input="updateCurrentPartValue($event, screenIndex, partIndex, 0)"
            />
            <w-indicator
              v-model="indicator.diarrhea_count"
              :title="p.child_nodes[1].label"
              unit="回"
              :length="getRange(p.child_nodes[1].extra_data)"
              :error="formError.diarrheaError"
              :error-messages="diarrheaErrorMessages"
              :class-inner="'wrating_orange'"
              @input="updateCurrentPartValue($event, screenIndex, partIndex, 1)"
            />
          </div>

          <w-special-component v-else-if="!checkIfPartIsEmpty(p)" :part="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import moment from 'moment'
import { mapGetters } from 'vuex'

import { sanitizer } from '@/utils/sanitizer'
import { CONSTANTS } from '@/utils/constants'
import { validations } from '@/utils/validations'
import WCommonComponent from '@/components/common/WCommonComponent'
import WCommonSection from '@/components/common/WCommonSection'
import WIndicator from '@/components/stories/WIndicator'
import WSpecialComponent from '@/components/symptoms-record/WSpecialComponent'
import { GetHeaderToken } from '@/api/util'
import { WCSMTP1001 } from '@/api/collection/WCSMTP1001'
import { WCSCR1001 } from '@/api/collection/WCSCR1001'
import { WCSMTP1002 } from '@/api/collection/WCSMTP1002'
import { sendEvent, sendEventOnError } from '~/utils/native'

export default {
  name: 'SymptomsRecord',
  components: {
    WCommonComponent,
    WCommonSection,
    WIndicator,
    WSpecialComponent,
  },
  async asyncData({ $axios, query, error, req }) {
    if (!(req && req.headers)) {
      return {}
    }
    const xWLBHeader = GetHeaderToken(req.headers)

    let dateTimeStamp = ''
    const value = await WCSCR1001(
      $axios,
      xWLBHeader,
      CONSTANTS.SYMPTOMS_SCREEN_CODE
    )

    if (
      value.error &&
      [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
        process.env.SERVER_NAME
      )
    ) {
      error({
        statusCode: value.status,
        message: JSON.stringify(value.error) + ' ' + CONSTANTS.WCSMTP1001_API,
      })

      sendEventOnError(value)
      return {}
    }

    const symptomRecordType = value.data.symptom_record_type
    if (value && value.data) {
      dateTimeStamp =
        symptomRecordType === 1
          ? moment(new Date()).format(CONSTANTS.DATE_STATIC_TIME_FORMAT)
          : moment(new Date()).format(CONSTANTS.DYNAMIC_DATE_TIME_FORMAT)
    }

    if (symptomRecordType === 1) {
      if (query.answered) {
        const [datePart] = query.answered.split('_')
        const timePart2 = '00-00-00'
        query.answered = datePart + '_' + timePart2
      } else query.answered = dateTimeStamp
    }

    const answered = query.answered ? query.answered : dateTimeStamp

    if (!xWLBHeader.xWLBAuthorization || !xWLBHeader.xWLBApplicationId) {
      error({
        statusCode: CONSTANTS.HTTP_STATUS_BAD_REQUEST_CODE,
        message: CONSTANTS.HTTP_STATUS_BAD_REQUEST_MESSAGE,
      })
      return {}
    }
    const response = await WCSMTP1001($axios, xWLBHeader, answered)
    if (
      response.error &&
      [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
        process.env.SERVER_NAME
      )
    ) {
      error({
        statusCode: response.status,
        message:
          JSON.stringify(response.error) + ' ' + CONSTANTS.WCSMTP1001_API,
      })

      sendEventOnError(response)
      return {}
    }
    return {
      xWLBHeader,
      screenStructures: response.data.screen_structures,
      application: response.data.application,
      answered,
    }
  },

  data() {
    return {
      application: [],
      xWLBHeader: undefined,
      screenStructures: [],
      answered: undefined,
      diarrheaErrorMessages: '「下痢回数」は「排便回数」以下で入力してください',
      formError: {
        diarrheaError: false,
        content_error: false,
      },
      indicator: {
        defecation_count: 0,
        diarrhea_count: 0,
      },
      parts: [],
      partsValueMapperSet: [],
      sanitize: sanitizer,
      validate: validations,
      constants: CONSTANTS,
    }
  },
  computed: {
    ...mapGetters({
      getIfAnyError: 'error/getIfAnyError',
      getAllComponentListValue:
        'component-value-store/getAllComponentListValue',
    }),
  },
  created() {
    const clonedApplication = cloneDeep(this.application)
    this.$store.dispatch('theme/updateApplication', clonedApplication)
  },
  mounted() {
    for (const s of this.screenStructures) {
      if (
        s &&
        s.parts &&
        s.parts[0].kind === this.constants.SPECIAL &&
        this.toRenderDefecationSpecialComponent(
          s.parts[0].id,
          this.constants.DEFECATION_GROUP_STRING
        )
      ) {
        const nodes = s.parts[0].child_nodes

        // Assigning value to special components
        this.indicator.defecation_count = nodes[0].part_value
          ? parseInt(nodes[0].part_value)
          : 0
        this.indicator.diarrhea_count = nodes[1].part_value
          ? parseInt(nodes[1].part_value)
          : 0
      }
    }

    sendEvent(
      'onPageFinished',
      `{"title": "Symptoms Record", "showBack": false}`
    )
  },
  methods: {
    checkIfPartIsEmpty(part) {
      return Object.keys(part).length === 0
    },
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
    toRenderDefecationSpecialComponent(id, toMatchString) {
      return this.validate.matchesIdWithString(id, toMatchString)
    },
    updateCurrentPartValue(value, screenIndex, partIndex, child = null) {
      if (child != null) {
        this.screenStructures[screenIndex].parts[partIndex].child_nodes[
          child
        ].part_value = value
      } else {
        this.screenStructures[screenIndex].parts[partIndex].part_value = value
      }

      window.isEdited = () => {
        return true
      }
    },
    getRange(v) {
      if (v != null) {
        try {
          return parseInt(v.indicator_range.max)
        } catch (error) {
          console.error('getRange error:', error)
          return 20
        }
      }
    },
    getUpdatedDataForSpecialStructure(part) {
      Object.entries(part.child_nodes).forEach(([_, child]) => {
        if (child.id) {
          this.partsValueMapperSet.push({
            part_value: this.sanitize.validateValue(
              child.part_value,
              child.part_value_return_type
            ),
            part_id: child.id,
          })
        }
      })
    },
    getUpdatedDataToSave() {
      Object.entries(this.screenStructures).forEach(([_, ss]) => {
        if (ss.parts) {
          Object.entries(ss.parts).forEach(([_, part]) => {
            if (part.id) {
              if (part.kind === this.constants.SPECIAL) {
                this.getUpdatedDataForSpecialStructure(part)
              } else {
                this.partsValueMapperSet.push({
                  part_value: this.sanitize.validateValue(
                    part.part_value,
                    part.part_value_return_type
                  ),
                  part_id: part.id,
                })
              }
            }
          })
        }
      })
    },
    isValid() {
      this.formError.diarrheaError =
        this.indicator.diarrhea_count > this.indicator.defecation_count

      return !this.formError.diarrheaError && this.getIfAnyError
    },
    async submit(e, part) {
      if (part.part_type && part.part_type === this.constants.SUBMIT) {
        await this.$store.dispatch('error/updateSubmitRequested')
        if (!this.isValid()) {
          window.scrollTo(0, 0)
          console.log('not valid')
          return
        }

        sendEvent('onProcessing', '{}')

        this.partsValueMapperSet = []
        this.getUpdatedDataToSave()

        const stateStoredComponentValue = this.getAllComponentListValue

        this.parts = []
        this.partsValueMapperSet.forEach((obj) => {
          const dataObj = stateStoredComponentValue.find(
            (stateStoredObj) => stateStoredObj.part_id === obj.part_id
          )
          if (dataObj) {
            this.parts.push(dataObj)
          } else {
            this.parts.push(obj)
          }
        })

        const resp = await WCSMTP1002(
          this.$axios,
          this.xWLBHeader,
          this.answered,
          { parts: this.parts }
        )
        if (
          resp.error &&
          [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
            process.env.SERVER_NAME
          )
        ) {
          sendEventOnError(resp)

          this.$nuxt.error({
            statusCode: resp.status,
            message:
              JSON.stringify(resp.error) + ' ' + CONSTANTS.WCSMTP1002_API,
          })
          return {}
        } else {
          sendEvent('onSuccess', '{}')

          window.isEdited = () => {
            return false
          }
          console.log('Save Success')
        }
      }
    },
  },
}
</script>

<style lang="scss">
.parts {
  padding: 16px !important;

  &__special-component {
    &__checkbox-group {
      &__content {
        display: flex;
        flex-flow: wrap;
      }
    }
  }
}

html,
body {
  margin: 0 !important;
}
</style>
