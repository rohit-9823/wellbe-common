<template>
  <div class="symptoms-record-2">
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
            :answered="answered"
            :label-style-obj="p.other_style.label"
            :label-required-style-obj="p.other_style?.['label-required']"
            @input="updateCurrentPartValue($event, screenIndex, partIndex)"
            @click="submit($event, p, ss.parts)"
          />
          <div
            v-if="
              p.kind === constants.SPECIAL &&
              p.part_type_component_name ===
                constants.INDICATOR_BODY_PARTS_COMPONENT_NAME
            "
            class="special-component"
          >
            <w-body-parts-component :part="p" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { mapGetters } from 'vuex'
import moment from 'moment'

import WCommonComponent from '@/components/common/WCommonComponent'
import WBodyPartsComponent from '@/components/symptoms-record/WBodyPartsComponent'
import WCommonSection from '@/components/common/WCommonSection'

import { GetHeaderToken } from '@/api/util'
import { WCSMTP1003 } from '@/api/collection/WCSMTP1003'
import { WCSCR1001 } from '@/api/collection/WCSCR1001'
import { WCSMTP1002 } from '@/api/collection/WCSMTP1002'
import { CONSTANTS } from '@/utils/constants'
import { sanitizer } from '@/utils/sanitizer'
import { validations } from '@/utils/validations'
import { sendEvent, sendEventOnError } from '@/utils/native'
import { formatDateTime } from '@/utils/const'

export default {
  name: 'SymptomsRecordView2',
  components: {
    WCommonComponent,
    WBodyPartsComponent,
    WCommonSection,
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
      CONSTANTS.SYMPTOMS_SCREEN_CODE2
    )
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
    const response = await WCSMTP1003($axios, xWLBHeader, answered)
    if (
      response.error &&
      [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
        process.env.SERVER_NAME
      )
    ) {
      error({
        statusCode: response.status,
        message:
          JSON.stringify(response.error) + ' ' + CONSTANTS.WCSMTP1003_API,
      })
      sendEventOnError(response)
      return {}
    }
    return {
      xWLBHeader,
      screenStructures: response.data.screen_structures,
      application: response.data.application,
      answered,
      symptomRecordType,
    }
  },
  data: () => ({
    screenStructures: [],
    constants: CONSTANTS,
    sanitize: sanitizer,
    validate: validations,
    answered: '',
    symptomRecordType: '',
  }),
  computed: {
    ...mapGetters({
      getIfAnyError: 'error/getIfAnyError',
      getValueById: 'theme/getPartValueById',
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
        s.parts[0].part_type_component_name ===
          this.constants.DATE_TIME_LOCAL_COMPONENT_NAME
      ) {
        s.parts[0].part_value = formatDateTime(this.answered)
      }
    }

    sendEvent(
      'onPageFinished',
      `{"title": "Symptoms Record 2", "showBack": false}`
    )
  },
  methods: {
    isValid() {
      return this.getIfAnyError
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
    getUpdatedDataForSpecialStructure(part) {
      Object.entries(part.child_nodes).forEach(([_, child]) => {
        if (child.id) {
          this.parts.push({
            part_value: this.sanitize.validateValue(
              this.getValueById(child.id),
              child.part_value_return_type
            ),
            part_id: child.id,
          })
        }
      })
    },
    setAnsweredValue(value) {
      if (value === null) {
        const { year, month, day, hours, minutes, seconds } = new Date()
        value = `${year}-${String(month + 1).padStart(2, '0')}-${String(
          day
        ).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(
          minutes
        ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        if (!this.answered.includes('&screen_id')) {
          this.answered =
            this.symptomRecordType === 1
              ? this.answered + `&screen_id=${CONSTANTS.SYMPTOMS_SCREEN_CODE}`
              : this.answered + `&screen_id=${CONSTANTS.SYMPTOMS_SCREEN_CODE2}`
        }
      } else {
        this.answered =
          this.symptomRecordType === 1
            ? moment(value).format(CONSTANTS.DATE_STATIC_TIME_FORMAT)
            : moment(value).format(CONSTANTS.DYNAMIC_DATE_TIME_FORMAT)
      }
    },
    getUpdatedDataToSave() {
      Object.entries(this.screenStructures).forEach(([_, ss]) => {
        if (ss.parts) {
          Object.entries(ss.parts).forEach(([_, part]) => {
            if (part.id) {
              if (part.kind === this.constants.SPECIAL) {
                this.getUpdatedDataForSpecialStructure(part)
              } else {
                /**
                 * Ternary operator
                 * We are sending answered part value as a param
                 * we update answered value which we send via Param in API
                 **/
                this.validate.matchesIdWithString(
                  part.id,
                  this.constants.ANSWERED_STRING
                )
                  ? this.setAnsweredValue(part.part_value)
                  : this.answered.includes('&screen_id')
                  ? this.parts.push({
                      part_value: this.sanitize.validateValue(
                        part.part_value,
                        part.part_value_return_type
                      ),
                      part_id: part.id,
                    })
                  : this.setAnsweredValue(part.part_value)
              }
            }
          })
        }
      })
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

        this.parts = []
        this.getUpdatedDataToSave()

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
}

html,
body {
  margin: 0 !important;
}
</style>
