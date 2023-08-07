<template>
  <div class="w-common-parts">
    <component
      :is="part.part_type_component_name"
      :id="part.id"
      :label-display="part.label_display"
      :title="getLabel(part.label_display, part.label)"
      :name="part.id"
      :placeholder="part.placeholder"
      :items="_loadItems(part)"
      :item="_loadItem(part)"
      :label="part.label"
      :hint-messages="part.annotation"
      :unit="part.part_measurement_unit"
      :w-label="getLabelFor(part, part.part_type_component_name)"
      :w-label-value="checkForAnswers()"
      :text="part.label"
      :first-day-of-week="1"
      :child-nodes="part.child_nodes"
      :length="getRange(part.extra_data, part.part_type_component_name)"
      :counter="validate.addCounterValidation(part.validations)"
      :error="getErrorForComponentById(part.id)"
      :error-messages="getErrorMessageById(part.id)"
      :required="required"
      :parent-class-name="parentClassName"
      :part-value="checkArrayInPartValue()"
      :value="assignValue(part.part_value, part.part_type_component_name)"
      :answered="answered"
      :redirect-url="getRedirectURL(part.extra_data)"
      :content-font-weight="custom_style?.[constants.BOLD]"
      :content-font-size="custom_style?.[constants.FONT_SIZE]"
      :content-text-color="custom_style?.[constants.FONT_COLOR]"
      :content-background-color="custom_style?.[constants.BACKGROUND_COLOR]"
      :indicator-color="custom_style?.[constants.INDICATOR_COLOR]"
      :indicator-pointer-color="
        custom_style?.[constants.INDICATOR_POINTER_COLOR]
      "
      :selected-button-color="custom_style?.[constants.CHECK_COLOR]"
      :selected-unchecked-color="custom_style?.[constants.UNCHECKED_COLOR]"
      :error-messages-color="custom_style?.[constants.ERROR_HIGHLIGHT]"
      :label-required-bold="label_required_style?.[constants.BOLD]"
      :label-required-font-size="label_required_style?.[constants.FONT_SIZE]"
      :label-required-font-color="label_required_style?.[constants.FONT_COLOR]"
      :label-required-background-color="
        label_required_style?.[constants.BACKGROUND_COLOR]
      "
      :label-bold="label_style?.[constants.BOLD]"
      :label-font-size="label_style?.[constants.FONT_SIZE]"
      :label-font-color="label_style?.[constants.FONT_COLOR]"
      :label-background-color="label_style?.[constants.BACKGROUND_COLOR]"
      :rows="custom_style?.[constants.ROWS]"
      :require-string="part.require_string"
      :class-inner="
        loadDefaultInnerClass(
          part.class_inner,
          part.part_type_component_name,
          part.id
        )
      "
      block
      :data-type="part.extra_data"
      :return-type="part.part_value_return_type"
      icon
      @input="inputEv($event, part)"
      @click="clickEv($event)"
      @updateReturnType="updateReturnType"
    ></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validations } from '@/utils/validations'
import { sanitizer } from '@/utils/sanitizer'
import { CONSTANTS } from '@/utils/constants'

import WTextField from '@/components/stories/WTextField'
import WSelect from '@/components/stories/WSelect'
import WDatepicker from '@/components/stories/WDatepicker'
import WRadioGroup from '@/components/stories/WRadioGroup'
import WCheckboxGroup from '@/components/stories/WCheckboxGroup'
import WDatePickerContainer from '@/components/stories/WDatePickerContainer'
import WButton from '@/components/stories/WButton'
import { prefectures } from '@/utils/const'
import WIndicator from '@/components/stories/WIndicator'
import WCheckboxWeek from '@/components/stories/WCheckboxWeek'
import WAccordingSelection from '@/components/stories/WAccordingSelection'
import WTextarea from '@/components/stories/WTextarea'
import WSwitch from '@/components/stories/WSwitch'
import WLabel from '@/components/stories/WLabel'
import WAnnotation from '@/components/stories/WAnnotation'
import WCheckbox from '@/components/stories/WCheckbox'
import WNativeLink from '@/components/stories/WNativeLink'
import WText from '@/components/stories/WText'
import WRadioIcon from '@/components/stories/WRadioIcon'
import WButtonNext from '@/components/stories/WButtonNext'
import WSelectRange from '@/components/stories/WSelectRange'
import WHidden from '@/components/stories/WHidden'
import WRedirectLink from '@/components/stories/WRedirectLink'
import WButtonLink from '@/components/stories/WButtonLink'
import WTimepicker from '@/components/stories/WTimepicker'
import WNumber from '@/components/stories/WNumber'
import WButtonBack from '@/components/stories/WButtonBack'
import WDatetimeLocal from '@/components/stories/WDatetimeLocal'
import WButtonConfirm from '@/components/stories/WButtonConfirm'

export default {
  name: 'WCommonComponent',
  components: {
    WLabel,
    WAnnotation,
    WTextField,
    WSelect,
    WDatepicker,
    WRadioGroup,
    WCheckboxGroup,
    WDatePickerContainer,
    WButton,
    WIndicator,
    WCheckboxWeek,
    WAccordingSelection,
    WTextarea,
    WSwitch,
    WCheckbox,
    WNativeLink,
    WText,
    WRadioIcon,
    WButtonNext,
    WSelectRange,
    WHidden,
    WRedirectLink,
    WButtonLink,
    WTimepicker,
    WNumber,
    WButtonBack,
    WDatetimeLocal,
    WButtonConfirm,
  },
  props: {
    part: {
      style: {},
      type: Object,
      default: undefined,
    },
    styleObj: {
      type: Object,
      default: undefined,
    },
    parentClassName: {
      type: String,
      default: undefined,
    },
    labelStyleObj: {
      type: Object,
      default: undefined,
    },
    labelRequiredStyleObj: {
      type: Object,
      default: undefined,
    },
    answered: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      error_message: '',
      error_object: {},
      required: false,
      required_error: false,
      validate: validations,
      sanitize: sanitizer,
      constants: CONSTANTS,
      custom_style: {},
      label_style: {},
      label_required_style: {},
    }
  },
  computed: {
    ...mapGetters({
      getAttributeValue: 'theme/getAttributeValue',
      getSubColor: 'theme/getSubColor',
      getErrorStateById: 'error/getErrorStateById',
      getErrorMessageById: 'error/getErrorMessageById',
      getErrorForComponentById: 'error/getErrorForComponentById',
    }),
  },
  watch: {
    part: {
      deep: true,
      handler: function (updatedObj) {
        if (updatedObj !== undefined)
          this.updateValidationState(
            updatedObj.part_value,
            updatedObj,
            'error/updateErrorsForComponent'
          )
      },
    },
  },
  mounted() {
    // check if the component is indicator and if the value is null then set the value to 0
    if (
      this.part.part_type_component_name === CONSTANTS.INDICATOR_COMPONENT_NAME
    ) {
      this.part.part_value === null && this.inputEv(0, this.part)
    }

    if (this.styleObj) {
      const newObj = Object.assign({}, this.styleObj)
      for (const key in newObj) {
        const val = this.sanitize.mapStyleValueWithState(key)
          ? this.getAttributeValue(newObj[key])
          : this.sanitize.mapStyleValue(key, newObj[key])

        newObj[key] = this.constants.PX_NEEDED_KEYS.includes(key)
          ? val + 'px'
          : val

        if (newObj[key] === '' || newObj[key] === null) delete newObj[key]
      }
      this.custom_style = newObj
    }

    if (this.labelRequiredStyleObj) this.mapLabelRequiredStyle()

    if (this.labelStyleObj) this.mapLabelStyle()

    if (this.part.validations) {
      this.updateValidationState(
        this.part.part_value,
        this.part,
        'error/updateErrorsForComponent'
      )
    }
  },
  methods: {
    checkArrayInPartValue() {
      if (Array.isArray(this.part.part_value)) {
        const mappedDays = this.part.part_value.map((id) => {
          const dayObj = this.part.answers.find((obj) => obj.value === id)
          return dayObj ? dayObj.label : ''
        })
        return mappedDays.toString()
      }
    },

    checkForAnswers() {
      if (this.part.answers != null) {
        const newVal = this.part.answers.filter(
          (answer) =>
            this.part.part_value?.toString() === answer.value?.toString()
        )
        return newVal.length > 0 ? newVal[0].label : ''
      } else {
        return this.part.part_value
      }
    },
    updateReturnType() {
      this.$emit('updateType')
    },
    mapLabelRequiredStyle() {
      const newObj = Object.assign({}, this.labelRequiredStyleObj)
      for (const key in newObj) {
        const val = this.sanitize.mapStyleValueWithState(key)
          ? this.getAttributeValue(newObj[key])
          : this.sanitize.mapStyleValue(key, newObj[key])

        newObj[key] = this.constants.PX_NEEDED_KEYS.includes(key)
          ? val + 'px'
          : val

        if (newObj[key] === '' || newObj[key] === null) delete newObj[key]
      }

      this.label_required_style = newObj
    },
    mapLabelStyle() {
      const newObj = Object.assign({}, this.labelStyleObj)
      for (const key in newObj) {
        const val = this.sanitize.mapStyleValueWithState(key)
          ? this.getAttributeValue(newObj[key])
          : this.sanitize.mapStyleValue(key, newObj[key])

        newObj[key] = this.constants.PX_NEEDED_KEYS.includes(key)
          ? val + 'px'
          : val

        if (newObj[key] === '' || newObj[key] === null) delete newObj[key]
      }

      this.label_style = newObj
    },
    updateValidationState(value, part, commit) {
      const validations = part.validations
      let errorType = ''
      let errorObject = {}
      let errorStatus = false

      if (validations && validations.length > 0) {
        try {
          validations.forEach((obj) => {
            switch (obj.label) {
              case this.constants.REQUIRED:
                this.required = true
                errorStatus = this.constants.IS_EMPTY_VALUE.includes(value)

                errorType = this.constants.REQUIRED
                this.$store.dispatch(commit, {
                  id: part.id,
                  error_type: errorType,
                  error_message: obj.message,
                  error_status: errorStatus,
                })
                break
              case this.constants.VALIDATION_DIGIT_DECIMAL_COUNT_X_Y:
                errorType = this.constants.VALIDATION_DIGIT_DECIMAL_COUNT_X_Y
                errorObject = this.validate.validateDigitDecimalCountXnY(
                  value,
                  obj
                )
                this.$store.dispatch(commit, {
                  id: part.id,
                  error_type: errorType,
                  error_message: errorObject.errorMessage,
                  error_status: errorObject.error,
                })
                break
              case this.constants.VALIDATION_STRING_LENGTH:
                errorType = this.constants.VALIDATION_STRING_LENGTH
                errorObject = this.validate.validateStringLength(obj, value)
                this.$store.dispatch(commit, {
                  id: part.id,
                  error_type: errorType,
                  error_message: errorObject.errorMessage,
                  error_status: errorObject.error,
                })
                break
              case this.constants.VALIDATION_DIGIT_COUNT_UPTO_X:
                errorType = this.constants.VALIDATION_DIGIT_COUNT_UPTO_X

                errorObject = this.validate.validateDigitCountUptoX(obj, value)
                this.$store.dispatch(commit, {
                  id: part.id,
                  error_type: errorType,
                  error_message: errorObject.errorMessage,
                  error_status: errorObject.error,
                })
                break
              case this.constants.VALIDATION_DATE_TODAY_OR_AFTER:
                errorType = this.constants.VALIDATION_DATE_TODAY_OR_AFTER

                errorObject = this.validate.validateIfOldDateSelected(
                  obj,
                  value
                )

                this.$store.dispatch(commit, {
                  id: part.id,
                  error_type: errorType,
                  error_message: errorObject.errorMessage,
                  error_status: errorObject.error,
                })
                break

              case this.constants.VALIDATION_DATE_TODAY_OR_BEFORE:
                errorType = this.constants.VALIDATION_DATE_TODAY_OR_BEFORE

                errorObject = this.validate.validateIfAfterDateSelected(
                  obj,
                  value
                )

                this.$store.dispatch(commit, {
                  id: part.id,
                  error_type: errorType,
                  error_message: errorObject.errorMessage,
                  error_status: errorObject.error,
                })
                break

              case this.constants.VALIDATION_NUMBER_ONLY:
                errorType = this.constants.VALIDATION_NUMBER_ONLY
                errorObject = this.validate.validateNumberOnly(obj, value)
                this.$store.dispatch(commit, {
                  id: part.id,
                  error_type: errorType,
                  error_message: errorObject.errorMessage,
                  error_status: errorObject.error,
                })
                break

              case this.constants.VALIDATION_DECIMAL_ONLY:
                errorType = this.constants.VALIDATION_DECIMAL_ONLY
                errorObject = this.validate.validateDecimalOnly(obj, value)
                this.$store.dispatch(commit, {
                  id: part.id,
                  error_type: errorType,
                  error_message: errorObject.errorMessage,
                  error_status: errorObject.error,
                })
                break
            }
          })
        } catch (e) {
          console.warn('Validation Adding state error', e)
        }
      }
    },
    _loadItems(part) {
      if (part.column_name === this.constants.PREFECTURE_CODE)
        return prefectures
      if (part.column_name === this.constants.HOSPITAL_VISIT) {
        return part.answers.map((v) => ({ name: v.label, value: v.value }))
      }
      return part.answers
    },

    _loadItem(part) {
      if (
        part.part_type_component_name === this.constants.CHECKBOX_COMPONENT_NAME
      ) {
        return part.answers
      }
    },

    getRedirectURL(obj) {
      if (obj && 'destination' in obj) {
        try {
          return obj.destination
        } catch (e) {
          console.warn('failing retrieving redirect link')
        }
      }
    },

    assignValue(value, component) {
      if (this.required) {
        if (value === null || value === '') {
          this.required_error = true
        } else {
          this.required_error = false
        }
      }

      return this.sanitize.mapComponentValue(value, component)
    },

    getRange(v, component) {
      if (component === this.constants.INDICATOR_COMPONENT_NAME && v != null) {
        try {
          return parseInt(v.indicator_range.max)
        } catch (error) {
          console.error('getRange error:', error)
        }
      }
    },
    getLabel(show, label) {
      if (show === 1) {
        return label
      }
      return ''
    },
    getLabelFor(part, component) {
      if (component === this.constants.LABEL_COMPONENT_NAME) {
        return part.label
      }
    },

    loadDefaultInnerClass(className, componentType, id) {
      if (className != null) return className

      switch (componentType) {
        case this.constants.CHECKBOX_COMPONENT_NAME:
          className = 'labelRight'
          break
        case this.constants.CHECKBOX_GROUP_COMPONENT_NAME:
          className = 'labelRight'
          break
        case this.constants.INDICATOR_COMPONENT_NAME:
          if (this.constants.SYMPTOMS_TOTAL_HEALTH_ID === id)
            className = 'wrating_default'
          break
      }
      return className
    },
    inputEv($event, part) {
      this.updateValidationState(
        $event,
        part,
        'error/updateErrorStateForComponentById'
      )
      this.$emit('input', $event)
    },
    clickEv($event) {
      this.$emit('click', $event)
    },
  },
}
</script>

<style lang="scss" scoped></style>
