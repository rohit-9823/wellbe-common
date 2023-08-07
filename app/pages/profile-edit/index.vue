<template>
  <div class="profile-edit">
    <div v-for="(ss, screenIndex) in screenStructures" :key="screenIndex">
      <!-- Section -->
      <w-common-section
        v-if="showSection(ss)"
        :section="ss.section"
        :custom-style-obj="ss.section?.style"
        :new-hint-message="ss.section.annotation"
      />

      <!-- Custom Confirmation page  -->
      <div v-if="showConfirmationPage(ss.section.page_no)">
        <w-confirmation-component :parts="confirmationComponentList" />
      </div>
      <!-- Parts -->
      <div v-if="showComponentPart(ss)" class="profile-edit__parts">
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
            @input="
              updateCurrentPartValue(
                $event,
                screenIndex,
                partIndex,
                p.part_type_component_name
              )
            "
            @click="submit($event, p)"
          ></w-common-component>

          <!--special Components-->
          <w-special-component
            v-else-if="p.kind === constants.SPECIAL"
            :part="p"
            :uc-group-part="ucGroupPart"
            :cd-group-part="cdGroupPart"
            :is-treatment-mode-prop="isTreatmentMode"
            @unCheckAllDisease="unCheckAllDisease"
          />
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
import WCommonComponent from '@/components/common/WCommonComponent'
import WCommonSection from '@/components/common/WCommonSection'
import WSpecialComponent from '@/components/profile-edit/WSpecialComponent'
import WConfirmationComponent from '@/components/profile-edit/WConfirmationComponent'

import { GetHeaderToken } from '@/api/util'
import { WCUP1002 } from '@/api/collection/WCUP1002'
import { WCUP1003 } from '@/api/collection/WCUP1003'
import { CONSTANTS } from '@/utils/constants'
import { sendEvent, sendEventOnError } from '@/utils/native'

export default {
  name: 'ProfileEdit',
  components: {
    WCommonSection,
    WCommonComponent,
    WSpecialComponent,
    WConfirmationComponent,
  },
  async asyncData({ $axios, query, error, req }) {
    if (!(req && req.headers)) {
      return {}
    }
    const answered = query.answered
      ? query.answered
      : moment(new Date()).format('YYYY-MM-DD')

    const xWLBParamHeader = {
      xWLBAuthorization: query.xWLBAuthorization,
      xWLBApplicationId: query.xWLBApplicationId,
    }

    const xWLBHeader = GetHeaderToken(req.headers)

    if (!xWLBHeader.xWLBAuthorization || !xWLBHeader.xWLBApplicationId) {
      if (
        !xWLBParamHeader.xWLBAuthorization ||
        !xWLBParamHeader.xWLBApplicationId
      ) {
        error({
          statusCode: CONSTANTS.HTTP_STATUS_BAD_REQUEST_CODE,
          message: CONSTANTS.HTTP_STATUS_BAD_REQUEST_MESSAGE,
        })
        return {}
      }
    }

    const currentHeader =
      xWLBHeader.xWLBAuthorization !== undefined ? xWLBHeader : xWLBParamHeader
    const response = await WCUP1002($axios, currentHeader, answered)
    if (
      response.error &&
      [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
        process.env.SERVER_NAME
      )
    ) {
      error({
        statusCode: response.status,
        message: JSON.stringify(response.error) + ' ' + CONSTANTS.WCUP1002_API,
      })
      sendEventOnError(response)
      return {}
    }
    return {
      currentHeader,
      screenStructures: response.data.screen_structures,
      application: response.data.application,
      answered,
    }
  },
  data: () => ({
    application: [],
    currentHeader: undefined,
    screenStructures: [],
    sanitize: sanitizer,
    validate: validations,
    constants: CONSTANTS,
    isTreatmentMode: undefined,
    parts: [],
    partsValueMapperSet: [],
    ucGroupPart: undefined,
    cdGroupPart: undefined,
    checkboxErrorMessage: undefined,
    radioAnswers: [],
    isConfirmationButtonExist: false,
    isSpecialCurrentDiseaseComponentExist: false,
    specialCurrentDiseaseComponentSectionNumber: 0,
    confirmationButtonExistSectionNumber: 0,
    confirmationComponentList: [],
  }),
  computed: {
    ...mapGetters({
      getIfAnyError: 'error/getIfAnyError',
      getCurrentPageIndex: 'theme/getCurrentPageIndex',
      getProfileEditComponentValueById:
        'theme/getProfileEditComponentValueById',
      getErrorIfNoneCheckBoxSelectedForProfileEdit:
        'theme/getErrorIfNoneCheckBoxSelectedForProfileEdit',
      getIfIsSubmitted: 'error/getIfIsSubmitted',
      getAllComponentListValue:
        'component-value-store/getAllComponentListValue',
    }),
  },
  created() {
    const clonedApplication = cloneDeep(this.application)
    this.$store.dispatch('theme/updateApplication', clonedApplication)
  },
  mounted() {
    const radioValue = this.screenStructures[0]?.parts.find((value) =>
      this.validate
        .getStringWithoutNumberFromComponentId(value.part_type_component_name)
        .includes(this.constants.RADIO_GROUP_COMPONENT_NAME)
        ? value
        : null
    )

    this.radioAnswers = radioValue?.answers.map(({ value }) => value) || []
    for (const s of this.screenStructures) {
      if (
        s.parts.length > 0 &&
        this.validate.matchesIdWithString(
          s.parts[0].id,
          this.constants.CURRENT_DISEASE_RADIO_STRING
        )
      ) {
        this.isTreatmentMode = parseInt(s.parts[0].part_value)
      }

      if (s.parts) {
        Object.entries(s.parts).forEach(([_, part]) => {
          if (
            part.part_type_component_name ===
            this.constants.BUTTON_CONFIRMATION_COMPONENT_NAME
          ) {
            this.isConfirmationButtonExist = true
            this.confirmationButtonExistSectionNumber = s.section.page_no
          }

          if (
            this.validate.matchesIdWithString(
              part.id,
              this.constants.CURRENT_DISEASE_RADIO_STRING
            ) &&
            part.kind === this.constants.SPECIAL
          ) {
            this.isSpecialCurrentDiseaseComponentExist = true
            this.specialCurrentDiseaseComponentSectionNumber = s.section.page_no
          }
        })
      }
    }

    this.getUcGroupPart()
    this.getCdGroupPart()

    sendEvent(
      'onPageFinished',
      `{"title": "プロフィール登録", "showBack": false}`
    )
  },

  methods: {
    showConfirmationPage(currentSectionNumber) {
      if (!this.isConfirmationButtonExist) return false

      if (this.confirmationButtonExistSectionNumber === null) return false

      const customConfirmationPageSectionNumber =
        Number(this.confirmationButtonExistSectionNumber) + 1
      if (customConfirmationPageSectionNumber !== this.getCurrentPageIndex)
        return false

      if (Number(currentSectionNumber) !== customConfirmationPageSectionNumber)
        return false

      return true
    },
    getIfCheckboxSelectRequired() {
      let required = false
      if (this.cdGroupPart && this.cdGroupPart.validations) {
        const validations = this.cdGroupPart.validations
        const found = validations.filter(
          (v) =>
            v.label === this.constants.REQUIRED ||
            v.label === this.constants.COUNT_OVER_ONE
        )

        if (found.length > 0) {
          this.checkboxErrorMessage = found[0].message
          required = true
        }
      }
      if (this.ucGroupPart && this.ucGroupPart.validations) {
        const validations = this.ucGroupPart.validations
        const found = validations.filter(
          (v) =>
            v.label === this.constants.REQUIRED ||
            v.label === this.constants.COUNT_OVER_ONE
        )

        if (found.length > 0) {
          this.checkboxErrorMessage = found[0].message
          required = true
        }
      }

      return required
    },
    getUcGroupPart() {
      for (const s of this.screenStructures) {
        if (s.parts.length > 0) {
          s.parts.forEach((part, index) => {
            if (
              this.validate.matchesIdWithString(
                part.id,
                this.constants.DISEASE_GROUP_UC_STRING
              )
            ) {
              this.ucGroupPart = part
            }
          })
        }
      }
    },
    getCdGroupPart() {
      for (const s of this.screenStructures) {
        if (s.parts.length > 0) {
          s.parts.forEach((part, index) => {
            if (
              this.validate.matchesIdWithString(
                part.id,
                this.constants.DISEASE_GROUP_CD_STRING
              )
            ) {
              this.cdGroupPart = part
            }
          })
        }
      }
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
    updateCurrentPartValue(
      value,
      screenIndex,
      partIndex,
      partType,
      child = null
    ) {
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

    // uncheck previous value while toggling
    unCheckAllDisease() {
      this.$store.dispatch('theme/clearAllProfileEditSpecialComponentValue')
      for (const s of this.screenStructures) {
        if (
          s.parts.length > 0 &&
          this.validate.matchesIdWithString(
            s.parts[0].id,
            this.constants.CURRENT_DISEASE_RADIO_STRING
          )
        ) {
          this.isTreatmentMode = parseInt(s.parts[0].part_value)

          if (
            this.validate.matchesIdWithString(
              s.parts[1].id,
              this.constants.DISEASE_GROUP_CD_STRING
            )
          ) {
            for (const c of s.parts[1].child_nodes) {
              c.part_value = '0'
            }
          }
          if (
            this.validate.matchesIdWithString(
              s.parts[2].id,
              this.constants.DISEASE_GROUP_UC_STRING
            )
          ) {
            for (const c of s.parts[2].child_nodes) {
              c.part_value = '0'
            }
          }
        }
      }

      this.cdGroupPart = undefined
      this.ucGroupPart = undefined

      this.getUcGroupPart()
      this.getCdGroupPart()
    },
    checkIfCheckBoxGroupHasError() {
      if (!this.isSpecialCurrentDiseaseComponentExist) return false

      return (
        this.getCurrentPageIndex ===
          Number(this.specialCurrentDiseaseComponentSectionNumber) &&
        this.getErrorIfNoneCheckBoxSelectedForProfileEdit
      )
    },
    isValid() {
      return this.getIfAnyError && !this.checkIfCheckBoxGroupHasError()
    },
    showSection(ss) {
      return (
        parseInt(ss.section.page_no) === this.getCurrentPageIndex &&
        ss.section.label
      )
    },
    showComponentPart(ss) {
      return parseInt(ss.section.page_no) === this.getCurrentPageIndex
    },
    getUpdatedDataForSpecialStructure(part) {
      if (
        this.validate.matchesIdWithString(
          part.id,
          this.constants.CURRENT_DISEASE_RADIO_STRING
        )
      ) {
        this.partsValueMapperSet.push({
          part_value: this.sanitize.validateValue(
            part.part_value,
            part.part_value_return_type
          ),
          part_id: part.id,
        })
      }

      if (part.child_nodes !== null) {
        if (part.id) {
          this.partsValueMapperSet.push({
            part_value: this.sanitize.validateValue(
              part.part_value,
              part.part_value_return_type
            ),
            part_id: part.id,
          })
        }
        Object.entries(part.child_nodes).forEach(([_, child]) => {
          if (child.id) {
            const val = this.getProfileEditComponentValueById(child.id)
            this.partsValueMapperSet.push({
              part_value: this.sanitize.validateValue(
                val,
                child.part_value_return_type
              ),
              part_id: child.id,
            })
          }
        })
      }
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
                this.constants.BUTTON_COMPONENT_NAME,
                this.constants.BUTTON_NEXT_COMPONENT_NAME,
                this.constants.BUTTON_PREV_COMPONENT_NAME,
              ].includes(part.part_type_component_name)
            ) {
              if (part.kind === this.constants.SPECIAL) {
                this.getUpdatedDataForSpecialStructure(part)
              } else {
                if (
                  part.part_type_component_name ===
                  this.constants.RADIO_GROUP_COMPONENT_NAME
                ) {
                  part.part_value = this.sanitize.defaultRadioButtonValue(
                    this.radioAnswers,
                    part.part_value
                  )
                }
                this.partsValueMapperSet.push({
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

    updateConfirmationComponentList() {
      Object.entries(this.screenStructures).forEach(([_, ss]) => {
        if (ss.parts) {
          Object.entries(ss.parts).forEach(([_, part]) => {
            if (
              part.id &&
              ![
                this.constants.NATIVE_LINK_COMPONENT_NAME,
                this.constants.BUTTON_COMPONENT_NAME,
                this.constants.BUTTON_NEXT_COMPONENT_NAME,
                this.constants.BUTTON_CONFIRMATION_COMPONENT_NAME,
                this.constants.BUTTON_PREV_COMPONENT_NAME,
              ].includes(part.part_type_component_name)
            ) {
              this.confirmationComponentList.push(part)
            }
          })
        }
      })
    },
    async submit(e, part) {
      if (
        part.part_type_component_name ===
          this.constants.BUTTON_NEXT_COMPONENT_NAME ||
        part.part_type_component_name ===
          this.constants.BUTTON_CONFIRMATION_COMPONENT_NAME
      ) {
        await this.$store.dispatch('error/updateSubmitRequested')
        if (!this.isValid()) {
          window.scrollTo(0, 0)
          console.log('not valid')
          return
        }
        if (this.isConfirmationButtonExist) {
          this.confirmationComponentList = []
          this.updateConfirmationComponentList()
        }

        await this.$store.dispatch('theme/incrementPageIndex')
        await this.$store.dispatch('error/setSubmitRequestToFalse')
      }

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

        const resp = await WCUP1003(this.$axios, this.currentHeader, {
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
            message: JSON.stringify(resp.error) + ' ' + CONSTANTS.WCUP1003_API,
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
      }
    },
  },
}
</script>

<style lang="scss">
.profile-edit {
  &__title {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #edf8fd;
  }

  &__parts {
    padding: 16px !important;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__parts label {
    padding: 0 16px;
    margin-left: -16px;
    margin-right: -16px;
  }

  &__btn {
    color: #009edb;
    text-decoration-line: underline;
    text-align: right;
  }

  &__special-component {
    &__w-checkbox {
      &__label {
        font-size: 16px;
        font-weight: normal;
        color: black;
      }

      &__label--required {
        position: relative;
      }

      &__label--required::after {
        content: '必須';
        position: relative;
        bottom: 2px;
        border-radius: 2px;
        text-align: center;
        line-height: 1;
        padding: 4px 8px;
        color: white;
        font-size: 12px;
        font-weight: 600;
        background-color: #00bfff;
      }
    }
  }

  &__content {
    padding: 15px;

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
