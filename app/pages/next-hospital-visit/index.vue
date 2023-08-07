<template>
  <div class="next-visit-date">
    <div v-for="(ss, screenIndex) in screenStructures" :key="screenIndex">
      <!-- Section -->
      <w-common-section
        v-if="ss.section.label != null"
        :section="ss.section"
        :custom-style-obj="ss.section?.style"
        :new-hint-message="ss.section.annotation"
      />
      <!-- Parts -->
      <div class="next-visit-date__content">
        <div
          v-for="(p, partIndex) in ss.parts"
          :key="`${screenIndex}-${partIndex}`"
        >
          <w-common-component
            v-if="p.kind !== constants.SPECIAL"
            class="next-visit-date__content__common"
            :part="p"
            :parent-class-name="`next-visit-date labelCustom`"
            :style-obj="p.style"
            :label-style-obj="getStyle(constants.LABEL_STYLE, p.other_style)"
            :label-required-obj="
              getStyle(constants.LABEL_REQUIRED_STYLE, p.other_style)
            "
            @input="
              updateCurrentPartValue(
                $event,
                screenIndex,
                partIndex,
                p,
                p.part_type_component_name
              )
            "
            @click="submit($event, p)"
          ></w-common-component>

          <!--special Components-->
          <div v-if="p.kind === constants.SPECIAL" class="special-component">
            <div style="font-weight: bolder">通院時間の設定</div>
            <div
              v-for="(c, childIndex) in p.child_nodes"
              :key="`${screenIndex}-${partIndex}- ${childIndex}`"
            >
              <w-switch
                v-if="
                  c.part_type_component_name === constants.SWITCH_COMPONENT_NAME
                "
                v-model="localData.notificationSwitch"
                :checked-color="
                  handleTickColor(c.style?.[constants.CHECK_COLOR])
                "
                :unchecked-color="
                  handleTickColor(c.style?.[constants.UNCHECKED_COLOR])
                "
                :color="primary"
                :disabled="notificationDisableFlag"
                :title="c.label"
                @input="
                  toggledNotificationSwitch(
                    screenIndex,
                    partIndex,
                    p.child_nodes
                  )
                "
              />
              <div
                v-if="childIndex === 1 && localData.notificationSwitch"
                style="font-weight: bolder"
              >
                通知の時間
              </div>
              <w-checkbox
                v-if="
                  localData.notificationSwitch &&
                  c.part_type_component_name ===
                    constants.CHECKBOX_COMPONENT_NAME
                "
                :value="c.part_value"
                :label="c.label"
                :selected-button-color="
                  getCheckingColor(c.style[constants.CHECK_COLOR])
                "
                :selected-unchecked-color="
                  getCheckingColor(c.style[constants.UNCHECKED_COLOR])
                "
                :class-inner="`labelRight`"
                @input="
                  updateCurrentPartValue(
                    $event,
                    screenIndex,
                    partIndex,
                    null,
                    constants.CHECKBOX_COMPONENT_NAME,
                    childIndex
                  )
                "
              />
            </div>
          </div>
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
import { validations } from '@/utils/validations'
import { CONSTANTS } from '@/utils/constants'
import WCommonComponent from '@/components/common/WCommonComponent'
import WCommonSection from '@/components/common/WCommonSection'
import WSwitch from '@/components/stories/WSwitch.vue'
import WCheckbox from '@/components/stories/WCheckbox.vue'

import { GetHeaderToken } from '@/api/util'
import { WCNHV1001 } from '@/api/collection/WCNHV1001'
import { WCNHV1002 } from '@/api/collection/WCNHV1002'
import { sendEvent, sendEventOnError } from '@/utils/native'

export default {
  name: 'NextHospitalVisit',
  components: {
    WCheckbox,
    WCommonSection,
    WCommonComponent,
    WSwitch,
  },
  async asyncData({ $axios, query, error, req }) {
    if (!(req && req.headers)) {
      return {}
    }
    const answered = query.answered
      ? query.answered
      : moment(new Date()).format('YYYY-MM-DD')

    const xWLBHeader = GetHeaderToken(req.headers)

    if (!xWLBHeader.xWLBAuthorization || !xWLBHeader.xWLBApplicationId) {
      error({
        statusCode: CONSTANTS.HTTP_STATUS_BAD_REQUEST_CODE,
        message: CONSTANTS.HTTP_STATUS_BAD_REQUEST_MESSAGE,
      })
      return {}
    }

    const response = await WCNHV1001($axios, xWLBHeader, answered)
    if (
      response.error &&
      [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
        process.env.SERVER_NAME
      )
    ) {
      error({
        statusCode: response.status,
        message: JSON.stringify(response.error) + ' ' + CONSTANTS.WCNHV1001_API,
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
  data: () => ({
    uniqueColor: '',
    application: [],
    xWLBHeader: undefined,
    screenStructures: [],
    notificationDisableFlag: false,
    primary: '#009EDB',
    localData: {
      notificationSwitch: false,
      dateSelected: false,
      timeSelected: false,
      sAlerts: [],
    },
    switchMode: [
      {
        part_value: '',
        part_id: CONSTANTS.NOTIFY_BUTTON_STRING,
      },
    ],
    parts: [],
    sanitize: sanitizer,
    validate: validations,
    constants: CONSTANTS,
  }),
  computed: {
    customizeStyle() {
      return {
        '--uniqueColor': this.uniqueColor,
      }
    },

    ...mapGetters({
      getAttributeValue: 'theme/getAttributeValue',
      getIfAnyError: 'error/getIfAnyError',
    }),
  },
  watch: {
    localData: {
      handler(v) {
        if (v.notificationSwitch) {
          this.switchMode[0].part_value = '1'
        } else {
          this.switchMode[0].part_value = '0'
        }
      },
      deep: true,
    },
  },
  created() {
    const clonedApplication = cloneDeep(this.application)
    this.$store.dispatch('theme/updateApplication', clonedApplication)
  },
  mounted() {
    const longLabel = this.screenStructures.reduce((result, value) => {
      const filteredParts = (value.parts || []).filter(
        (datas) =>
          datas.part_type_component_name === 'WLabel' &&
          datas.part_value.length > 50
      )
      return result.concat(filteredParts)
    }, [])[0]

    this.uniqueColor = this.getAttributeValue(
      longLabel?.style?.['background-color']
    )
    document.documentElement.style.setProperty(
      '--uniqueColor',
      this.uniqueColor
    )

    for (const s of this.screenStructures) {
      if (s.parts != null && s.parts[0].kind === this.constants.SPECIAL) {
        const nodes = s.parts[0].child_nodes

        // Assigning value to special components
        this.localData.notificationSwitch = !!parseInt(nodes[0].part_value)
      } else if (s.parts) {
        if (
          s.parts[0].part_type_component_name ===
            this.constants.DATE_PICKER_COMPONENT_NAME &&
          this.validate.matchesIdWithString(
            s.parts[0].id,
            this.constants.NEXT_VISIT_DATE_STRING
          )
        )
          this.localData.dateSelected = !!s.parts[0].part_value

        if (
          (s.parts[0].part_type_component_name ===
            this.constants.SELECT_COMPONENT_NAME ||
            s.parts[0].part_type_component_name ===
              this.constants.TIME_PICKER_COMPONENT_NAME) &&
          this.validate.matchesIdWithString(
            s.parts[0].id,
            this.constants.NEXT_VISIT_TIME_STRING
          )
        )
          this.localData.timeSelected = !!s.parts[0].part_value
      }
    }
    this.isNotificationSwitchDisable()
    this.$store.dispatch('theme/setXWLBHeader', this.xWLBHeader)

    sendEvent(
      'onPageFinished',
      `{"title": "次回通院日の設定", "showBack": true}`
    )
  },
  methods: {
    getCheckingColor(part) {
      return this.getAttributeValue(part)
    },
    handleTickColor(c) {
      return this.getAttributeValue(c)
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
    isNotificationSwitchDisable() {
      this.notificationDisableFlag = !(
        this.localData.dateSelected && this.localData.timeSelected
      )

      if (this.notificationDisableFlag) {
        this.localData.notificationSwitch = false
      }
    },
    toggledNotificationSwitch(screenIndex, partIndex, childComponents) {
      childComponents.forEach((child, childIndex) => {
        if (
          child.part_type_component_name ===
          this.constants.CHECKBOX_COMPONENT_NAME
        )
          this.screenStructures[screenIndex].parts[partIndex].child_nodes[
            childIndex
          ].part_value = '0'
      })
    },
    updateCurrentPartValue(
      value,
      screenIndex,
      partIndex,
      part,
      partType,
      child = null
    ) {
      window.isEdited = () => {
        return true
      }

      if (child != null) {
        this.screenStructures[screenIndex].parts[partIndex].child_nodes[
          child
        ].part_value = value
      } else {
        this.screenStructures[screenIndex].parts[partIndex].part_value = value
      }

      // special component Switch logic
      if (
        part &&
        part.part_type_component_name ===
          this.constants.DATE_PICKER_COMPONENT_NAME &&
        this.validate.matchesIdWithString(
          part.id,
          this.constants.NEXT_VISIT_DATE_STRING
        )
      ) {
        this.localData.dateSelected = true
        this.isNotificationSwitchDisable()
      }

      if (
        part &&
        (part.part_type_component_name ===
          this.constants.SELECT_COMPONENT_NAME ||
          part.part_type_component_name ===
            this.constants.TIME_PICKER_COMPONENT_NAME) &&
        this.validate.matchesIdWithString(
          part.id,
          this.constants.NEXT_VISIT_TIME_STRING
        )
      ) {
        this.localData.timeSelected = !(part.part_value === '-1')
        this.isNotificationSwitchDisable()
      }
    },
    isValid() {
      return this.getIfAnyError
    },

    clearForm() {
      // clear special Components value
      this.localData.notificationSwitch = false
      this.localData.dateSelected = false
      this.localData.timeSelected = false
      this.notificationDisableFlag = true

      // clear common components value
      Object.entries(this.screenStructures).forEach(([_, ss]) => {
        if (ss.parts != null) {
          Object.entries(ss.parts).forEach(([_, part]) => {
            if (
              part.part_type_component_name ===
                this.constants.DATE_PICKER_COMPONENT_NAME &&
              this.validate.matchesIdWithString(
                part.id,
                this.constants.NEXT_VISIT_DATE_STRING
              )
            )
              part.part_value = undefined
            else if (
              (part.part_type_component_name ===
                this.constants.SELECT_COMPONENT_NAME ||
                part.part_type_component_name ===
                  this.constants.TIME_PICKER_COMPONENT_NAME) &&
              this.validate.matchesIdWithString(
                part.id,
                this.constants.NEXT_VISIT_TIME_STRING
              )
            )
              part.part_value = undefined
          })
        }
      })
    },

    getUpdatedDataForSpecialStructure(part) {
      Object.entries(part.child_nodes).forEach(([_, child]) => {
        if (child.id) {
          if (
            this.validate.matchesIdWithString(
              child.id,
              this.constants.NOTIFY_BUTTON_STRING
            )
          ) {
            this.parts.push({
              part_value: this.sanitize.validateValue(
                this.switchMode[0].part_value,
                child.part_value_return_type
              ),
              part_id: child.id,
            })
          } else {
            this.parts.push({
              part_value: this.sanitize.validateValue(
                this.localData.notificationSwitch ? child.part_value : 0,
                child.part_value_return_type
              ),
              part_id: child.id,
            })
          }
        }
      })
    },

    getUpdatedDataToSave() {
      Object.entries(this.screenStructures).forEach(([_, ss]) => {
        if (ss.parts) {
          Object.entries(ss.parts).forEach(([_, part]) => {
            if (
              part.id &&
              ![
                this.constants.NATIVE_LINK_COMPONENT_NAME,
                this.constants.LABEL_COMPONENT_NAME,
              ].includes(part.part_type_component_name)
            ) {
              if (part.kind === this.constants.SPECIAL) {
                this.getUpdatedDataForSpecialStructure(part)
              } else {
                this.parts.push({
                  part_value: this.sanitize.validateValue(
                    part.part_value,
                    part.part_value_return_type,
                    part.part_type_component_name
                  ),
                  part_id: part.id,
                })
              }
            }
          })
        }
      })
    },

    async submit($event, part) {
      if (part.part_type && part.part_type === this.constants.SUBMIT) {
        this.parts = []
        await this.$store.dispatch('error/updateSubmitRequested')
        if (!this.isValid()) {
          window.scrollTo(0, 0)
          console.log('not valid')
          return
        }

        sendEvent('onProcessing', '{}')

        this.getUpdatedDataToSave()

        const resp = await WCNHV1002(this.$axios, this.xWLBHeader, {
          parts: this.parts,
        })
        if (
          resp.error &&
          [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
            process.env.SERVER_NAME
          )
        ) {
          this.$nuxt.error({
            statusCode: resp.status,
            message: JSON.stringify(resp.error) + ' ' + CONSTANTS.WCNHV1002_API,
          })
          sendEventOnError(resp)
          return {}
        } else {
          sendEvent('onSuccess', '{}')
          window.isEdited = () => {
            return false
          }
          console.log('Save Success')
        }
      } else if (part.part_type && part.part_type === this.constants.CLEAR) {
        this.clearForm()
      }
    },
  },
}
</script>

<style lang="scss">
.labelCustom {
  margin-top: 35px;
  background-color: var(--uniqueColor);
}

.next-visit-date {
  &__title {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #edf8fd;
  }
  &__parts {
    padding: 16px !important;
  }

  &__btn {
    color: #009edb;
    text-decoration-line: underline;
    text-align: right;
  }

  &__content {
    padding: 15px;

    &__common {
      button:first-child {
        margin-bottom: 15px !important;
      }

      &__notice {
        border-radius: 5px;
        background-color: #ebecf0;
        padding: 15px;
        margin-bottom: 15px;

        &__title {
          font-weight: bolder;
        }

        &__note {
          font-size: 0.8em;
          padding-top: 5px;
        }
      }
    }
  }

  .labelRight {
    ::v-deep(.w-checkbox-group__content__label) {
      flex-direction: row-reverse;
      justify-content: flex-end;

      .w-checkbox-group__content__checkbox {
        margin-right: 6px;
      }
    }
  }
}
html,
body {
  margin: 0 !important;
}
</style>
