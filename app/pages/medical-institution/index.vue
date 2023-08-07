<template>
  <div class="selection">
    <w-step
      v-model="getCurrentPageIndex"
      class-inner="selection__step"
      :length="7"
      :items="step_items"
      color="#009EDB"
    />
    <div v-for="(ss, screenIndex) in screenStructures" :key="screenIndex">
      <!-- Section -->
      <w-common-section
        v-if="showSection(ss)"
        :section="ss.section"
        :custom-style-obj="ss.section?.style"
        :new-hint-message="ss.section.annotation"
      />

      <!-- Parts -->
      <div v-if="showComponentPart(ss)" class="selection__parts">
        <div
          v-for="(p, partIndex) in ss.parts"
          :key="`${screenIndex}-${partIndex}`"
        >
          {{ setApiIdNumber(p) }}
          <w-prefecture-list
            v-if="
              p.part_type_component_name ===
              constants.PREFECTURE_LIST_COMPONENT_NAME
            "
            :part="p"
            @prefectureSelected="goToCityPage"
          />

          <w-city-list
            v-else-if="
              p.part_type_component_name === constants.CITY_LIST_COMPONENT_NAME
            "
            :x-w-l-b-header="currentHeader"
            :part="p"
            :selected-prefecture="selectedPrefecture"
            @citySelected="goToHospitalPage"
          />

          <w-search-box
            v-else-if="
              p.part_type_component_name === constants.SEARCH_BOX_COMPONENT_NAME
            "
            :x-w-l-b-header="currentHeader"
            :part="p"
            :screen="screen"
            :selected-prefecture="selectedPrefecture"
            :selected-city="selectedCity"
            @skipHospitalSelectStep="skipHospitalSelectStep"
            @searched="updateHospitalList"
          />

          <w-hospital-list
            v-else-if="
              p.part_type_component_name ===
              constants.HOSPITAL_LIST_COMPONENT_NAME
            "
            :x-w-l-b-header="currentHeader"
            :hospitals="hospitals"
            :unavailable-hospital-list="unavailableHospitalList"
            :selected-prefecture="selectedPrefecture"
            :selected-city="selectedCity"
            :screen="screen"
            @hospitalSelected="goToSubjectList"
            @skipHospitalSelectStep="skipHospitalSelectStep"
          />

          <w-subject-list
            v-else-if="
              p.part_type_component_name ===
              constants.SUBJECT_LIST_COMPONENT_NAME
            "
            :subjects="p.answers"
            @subjectSelected="goToAdditionalForm"
          />

          <!--renders common component only on inputForm Page5-->

          <w-common-component
            v-else-if="checkConditionToRender(p)"
            :part="p"
            :style-obj="p.style"
            :label-style-obj="getStyle(constants.LABEL_STYLE, p.other_style)"
            :label-required-style-obj="
              getStyle(constants.LABEL_REQUIRED_STYLE, p.other_style)
            "
            parent-class-name="selection__custom__label"
            @input="updateInputValue($event, p)"
            @click="goToConfirmationPage(p)"
            @updateType="updateReturnType(p.id, p.part_value_return_type)"
          />

          <div
            v-else-if="p.kind === constants.SPECIAL"
            class="selection__confirm"
          >
            <w-confirmation-label
              :id="p.id"
              :confirmation-type="p.part_type"
              :label="p.label"
              :prefecture="selectedPrefecture"
              :city="selectedCity"
              :hospital="selectedHospital"
              :subject="selectedSubject"
              :input-form="inputForm"
              :part="p"
              :style-obj="p.style"
              parent-class-name="selection__confirm"
              :label-style-obj="getStyle(constants.LABEL_STYLE, p.other_style)"
              :label-required-obj="
                getStyle(constants.LABEL_REQUIRED_STYLE, p.other_style)
              "
              @updatePartsValue="updatePartsValue($event, p.id)"
              @confirmationSaved="goToCompletion"
              @gotoBackPage="goToPreviousPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { mapGetters } from 'vuex'

import { sanitizer } from '@/utils/sanitizer'
import { validations } from '@/utils/validations'
import { CONSTANTS } from '@/utils/constants'
import WPrefectureList from '@/components/medical-institution/WPrefectureList'
import WCityList from '@/components/medical-institution/WCityList'
import WSearchBox from '@/components/medical-institution/WSearchBox'
import WHospitalList from '@/components/medical-institution/WHospitalList'
import WSubjectList from '@/components/medical-institution/WSubjectList'
import WCommonComponent from '@/components/common/WCommonComponent'
import WCommonSection from '@/components/common/WCommonSection'
import WConfirmationLabel from '@/components/medical-institution/WConfirmationLabel'
import WStep from '@/components/stories/WStep'

import { GetHeaderToken } from '@/api/util'
import { WCMI1001 } from '@/api/collection/WCMI1001'
import { WCMI1002 } from '@/api/collection/WCMI1002'
import { sendEvent, sendEventOnError } from '@/utils/native'

export default {
  name: 'MedicalInstitution',
  components: {
    WCommonComponent,
    WCommonSection,
    WPrefectureList,
    WCityList,
    WSearchBox,
    WHospitalList,
    WSubjectList,
    WConfirmationLabel,
    WStep,
  },
  async asyncData({ $axios, query, error, req }) {
    if (!(req && req.headers)) {
      return {}
    }
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
    const response = await WCMI1001($axios, currentHeader)
    if (
      response.error &&
      [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
        process.env.SERVER_NAME
      )
    ) {
      error({
        statusCode: response.status,
        message: JSON.stringify(response.error) + ' ' + CONSTANTS.WCMI1001_API,
      })
      sendEventOnError(response)
      return {}
    }
    return {
      currentHeader,
      screenStructures: response.data.screen_structures,
      application: response.data.application,
      screen: response.data.screen,
    }
  },
  data: () => ({
    application: [],
    currentHeader: undefined,
    screenStructures: [],
    screen: undefined,
    sanitize: sanitizer,
    validate: validations,
    selectedPrefecture: undefined,
    selectedCity: undefined,
    selectedHospital: undefined,
    selectedSubject: undefined,
    inputForm: {},
    parts: [],
    step_items: [
      '都道府県\n選択',
      '市区町村\n選択',
      '医療機関\n選択',
      '診療科目\n選択',
      '追加入力',
      '確認',
      '完了',
    ],
    hospitals: null,
    unavailableHospitalList: [],
    constants: CONSTANTS,
    apiIdNumber: '',
  }),
  computed: {
    ...mapGetters({
      getIfAnyError: 'error/getIfAnyError',
      getCurrentPageIndex: 'theme/getCurrentPageIndex',
    }),
  },
  created() {
    const clonedApplication = cloneDeep(this.application)
    this.$store.dispatch('theme/updateApplication', clonedApplication)
  },
  // ----------- API for making certain hospital disable ------------------

  // async mounted() {
  //   const response = await WCUSR1001(this.$axios, this.currentHeader)
  //   if (
  //     response.error &&
  //     [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
  //       process.env.SERVER_NAME
  //     )
  //   ) {
  //     this.$nuxt.error({
  //       statusCode: response.status,
  //       message: JSON.stringify(response.error) + ' ' + CONSTANTS.WCUSR1001_API,
  //     })
  //     return {}
  //   }
  //   this.unavailableHospitalList = response.data
  // },

  methods: {
    setApiIdNumber(part = {}) {
      if (part.part_type === this.constants.HIDDEN_TYPE)
        this.apiIdNumber = this.validate.getNumberWithoutStringFromComponentId(
          part.id
        )
      return ''
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
    updateReturnType(id, type) {
      const idString = this.validate.getStringWithoutNumberFromComponentId(id)
      switch (idString) {
        case this.constants.HIDDEN_CITY_STRING:
          if (this.selectedCity) this.selectedCity.type = type
          break
        case this.constants.HIDDEN_DCF_FACILITY_STRING:
          if (this.selectedHospital) this.selectedHospital.type = type
          break
        case this.constants.HIDDEN_PREF_CD_STRING:
          if (this.selectedPrefecture) this.selectedPrefecture.type = type
          break
        case this.constants.HIDDEN_SUBJECT_STRING:
          if (this.selectedSubject) this.selectedSubject.type = type
          break
      }
    },
    goToCityPage(prefecture) {
      window.isEdited = () => {
        return true
      }

      this.selectedPrefecture = prefecture
      this.$store.dispatch('theme/incrementPageIndex')
    },

    goToHospitalPage(city) {
      this.selectedCity = city
      this.$store.dispatch('theme/incrementPageIndex')
    },
    goToSubjectList(hospital) {
      this.selectedHospital = hospital
      this.$store.dispatch('theme/incrementPageIndex')
    },
    goToAdditionalForm(subject) {
      this.selectedSubject = subject
      this.$store.dispatch('theme/incrementPageIndex')
    },
    skipHospitalSelectStep() {
      this.$store.dispatch('theme/incrementPageIndexBySpecificNumber', 2)
    },
    isValid() {
      return this.getIfAnyError
    },
    goToConfirmationPage(part) {
      if (part.part_type && part.part_type === this.constants.BUTTON) {
        this.goToFinishPage()
      }
      if (
        (part.part_type && part.part_type === this.constants.SUBMIT) ||
        (part.part_type && part.part_type === this.constants.GONEXT)
      ) {
        this.$store.dispatch('error/updateSubmitRequested')
        if (!this.isValid()) {
          window.scrollTo(0, 0)
          console.log('not valid')
          // alert(
          //   " { 'title': '', 'message': '医療機関名を入力してください', 'button_name':'閉じる' }"
          // )
          return
        }
        this.$store.dispatch('theme/incrementPageIndex')
      }
    },
    async goToFinishPage() {
      this.setUpPartsDataToSave()
      sendEvent('onProcessing', '{}')
      const resp = await WCMI1002(this.$axios, this.currentHeader, {
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
          message: JSON.stringify(resp.error) + ' ' + CONSTANTS.WCMI1002_API,
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
    },
    goToPreviousPage() {
      this.$store.dispatch('theme/decrementPageIndex')
    },
    setUpPartsDataToSave() {
      this.parts.push({
        part_id: this.apiIdNumber + this.constants.HIDDEN_CITY_STRING,
        part_value: this.sanitize.validateValue(
          this.selectedCity.code,
          this.selectedCity.type
        ),
      })

      this.parts.push({
        part_id: this.apiIdNumber + this.constants.HIDDEN_DCF_FACILITY_STRING,
        part_value: this.selectedHospital
          ? this.sanitize.validateValue(
              this.selectedHospital.id,
              this.selectedHospital.type
            )
          : null,
      })

      this.parts.push({
        part_id: this.apiIdNumber + this.constants.HIDDEN_PREF_CD_STRING,
        part_value: this.selectedPrefecture.value,
      })

      this.parts.push({
        part_id: this.apiIdNumber + this.constants.HIDDEN_SUBJECT_STRING,
        part_value: this.selectedSubject
          ? this.sanitize.validateValue(
              this.selectedSubject.value,
              this.selectedSubject.type
            )
          : null,
      })
      this.parts.push({
        part_id:
          this.apiIdNumber + this.constants.HIDDEN_DCF_FACILITY_CODE_STRING,
        part_value: this.selectedHospital
          ? this.sanitize.validateValue(
              this.selectedHospital.dcf_facility_code,
              this.selectedHospital.type
            )
          : null,
      })
    },

    goToCompletion() {
      this.$store.dispatch('theme/incrementPageIndex')
    },

    updateHospitalList(hospitals) {
      this.hospitals = hospitals
    },

    updateInputValue(value, p) {
      const idString = this.validate.getStringWithoutNumberFromComponentId(p.id)
      switch (idString) {
        case this.constants.DOCTOR_STRING:
          this.inputForm.doctor = value
          p.part_value = value
          break
        case this.constants.PHONE_STRING:
          this.inputForm.phone = value
          p.part_value = value
          break
        case this.constants.HOSPITAL_NAME_STRING:
          this.inputForm.hospital = value
          p.part_value = value
          break
      }
    },

    updatePartsValue(value, id) {
      this.parts.push({
        part_id: id,
        part_value: value,
      })
    },

    checkConditionToRender(part) {
      if (
        this.validate.matchesIdWithString(
          part.id,
          this.constants.HOSPITAL_NAME_STRING
        )
      ) {
        return !this.selectedHospital
      }
      return part.kind !== this.constants.SPECIAL
    },
    getHintMessage(annotation) {
      if (this.getCurrentPageIndex === 5)
        return !this.selectedHospital ? annotation : ''
      else return annotation !== null ? annotation : ''
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
  },
}
</script>

<style lang="scss">
.selection__custom__label {
  margin-bottom: 20px;
  width: 100%;
  display: block;
}
.selection {
  &__step {
    padding: 20px 0;
  }

  &__parts {
    padding: 16px !important;
    word-break: break-all;
    overflow-wrap: break-word;
  }

  &__label {
    background-color: #fff8ca;
    text-align: left;
    padding: 10px;
    font-weight: bolder;
  }

  &__confirm__label {
    padding: 0 16px;
    margin-left: -16px;
    margin-right: -16px;
  }

  &__content {
    &.disabled {
      background: #dcdcdc;
      pointer-events: none;
    }

    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ebecf0;
      padding: 10px;
      cursor: pointer;
    }

    &__item-detail {
      padding: 10px;
      cursor: pointer;

      &__name {
        font-weight: bolder;

        &__selected-text {
          float: right;
          color: #009edb;
          font-size: 12px;
        }
      }
    }
  }

  &__message {
    display: flex;
    align-items: center;
    margin: 0 20px;
    padding: 16px;
    border-radius: 3px;
    background-color: #ebecf0;

    &__icon {
      margin-right: 10px;
    }
  }
}

html,
body {
  margin: 0 !important;
}
</style>
