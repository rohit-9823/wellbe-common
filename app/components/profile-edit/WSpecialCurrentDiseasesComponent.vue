<template>
  <div
    v-if="
      validate.matchesIdWithString(
        part.id,
        constants.CURRENT_DISEASE_RADIO_STRING
      ) && part.kind === constants.SPECIAL
    "
  >
    <w-radio-group
      v-if="
        validate.matchesIdWithString(
          part.id,
          constants.CURRENT_DISEASE_RADIO_STRING
        ) && part.kind === constants.SPECIAL
      "
      v-model="isTreatmentMode"
      :name="part.id"
      :items="part.answers"
      :required="customCurrentDiseaseRadioGroupRequired"
      :error="getErrorForComponentById(part.id)"
      :error-messages="getErrorMessageById(part.id)"
      :label="part.label"
      :label-bold="labelStyle?.[constants.BOLD]"
      :label-required-font-color="labelRequired?.[constants.FONT_COLOR]"
      :label-required-background-color="
        labelRequired?.[constants.BACKGROUND_COLOR]
      "
      :selected-button-color="custom_style?.[constants.CHECK_COLOR]"
      :selected-unchecked-color="custom_style?.[constants.UNCHECKED_COLOR]"
      :label-font-size="labelStyle?.[constants.FONT_SIZE]"
      :label-font-color="labelStyle?.[constants.FONT_COLOR]"
      :label-background-color="labelStyle?.[constants.BACKGROUND_COLOR]"
      @click="unCheckAllDisease()"
      @input="inputEv(part)"
    />
    <div
      v-if="isTreatmentMode"
      class="profile-edit__special-component__w-checkbox"
    >
      <label
        :class="{
          'profile-edit__special-component__w-checkbox__label--required edit-label':
            isCheckboxSelectRequired,
        }"
        :style="`--weight: ${labelStyle.bold}`"
      >
        {{ ucGroupPart.label }}
      </label>

      <div>
        <small v-if="!checkIfCheckBoxGroupHasError()">{{ '\xa0' }}</small>
        <small
          v-if="checkIfCheckBoxGroupHasError()"
          :style="{ color: `red` }"
          >{{
            checkboxErrorMessage ? checkboxErrorMessage : 'Error messages'
          }}</small
        >
      </div>
      <div
        v-if="isTreatmentMode === 2 && ucGroupPart"
        class="special-component"
      >
        <div v-for="c in ucGroupPart.child_nodes" :key="`${c.id}`">
          <w-checkbox
            :label="c.label"
            :selected-button-color="custom_style?.[constants.CHECK_COLOR]"
            :selected-unchecked-color="
              custom_style?.[constants.UNCHECKED_COLOR]
            "
            :class-inner="`labelRight`"
            :value="c.part_value"
            :disabled="!isTreatmentMode"
            @input="updateTreatmentMode(c.id, c, $event)"
          />
        </div>
      </div>
      <div
        v-if="isTreatmentMode === 1 && cdGroupPart"
        class="profile-edit__special-component"
      >
        <div v-for="c in cdGroupPart.child_nodes" :key="`${c.id}`">
          <w-checkbox
            :label="c.label"
            :class-inner="`labelRight`"
            :value="c.part_value"
            :selected-button-color="custom_style?.[constants.CHECK_COLOR]"
            :selected-unchecked-color="
              custom_style?.[constants.UNCHECKED_COLOR]
            "
            :disabled="!isTreatmentMode"
            @input="updateTreatmentMode(c.id, c, $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { sanitizer } from '@/utils/sanitizer'
import { CONSTANTS } from '@/utils/constants'
import { validations } from '@/utils/validations'

import WCheckbox from '@/components/stories/WCheckbox.vue'
import WRadioGroup from '@/components/stories/WRadioGroup.vue'

export default {
  name: 'WSpecialComponent',
  components: {
    WRadioGroup,
    WCheckbox,
    // WCommonComponent
  },
  props: {
    part: {
      type: Object,
      default: undefined,
    },
    ucGroupPart: {
      type: Object,
      default: undefined,
    },
    cdGroupPart: {
      type: Object,
      default: undefined,
    },
    isTreatmentModeProp: {
      type: Number,
      default: undefined,
    },
    error: {
      type: Boolean,
      default: false,
    },
    checkboxErrorMessage: {
      type: String,
      default: undefined,
    },
    isCheckboxSelectRequired: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sanitize: sanitizer,
      constants: CONSTANTS,
      validate: validations,
      customCurrentDiseaseRadioGroupRequired: false,
      treatmentModeList: [],
      isTreatmentMode: this.isTreatmentModeProp,
      labelStyle: {},
      labelRequired: {},
      custom_style: {},
    }
  },
  computed: {
    customizeStyle() {
      return {
        '--selectedButtonColor': this.selectedButtonColor,
        '--selectedUncheckedColor': this.selectedUncheckedColor,
        '--errorMessagesColor': this.errorMessagesColor,
        '--contentBackgroundColor': this.contentBackgroundColor,
        '--contentFontWeight': this.contentFontWeight,
        '--contentFontColor': this.contentTextColor,
        '--contentFontSize': this.contentFontSize,
        '--fontColorLabel': this.labelFontColor,
        '--fontSizeLabel': this.labelFontSize,
        '--fontWeightLabel': this.labelStyle.bold,
        '--backgroundColorLabel': this.labelBackgroundColor,
        '--fontColorRequiredLabel': this.labelRequiredFontColor,
        '--fontSizeRequiredLabel': this.labelRequiredFontSize,
        '--fontWeightRequiredLabel': this.labelRequiredBold,
        '--backgroundColorRequiredLabel': this.labelRequiredBackgroundColor,
      }
    },
    ...mapGetters({
      getAttributeValue: 'theme/getAttributeValue',
      getErrorMessageById: 'error/getErrorMessageById',
      getErrorForComponentById: 'error/getErrorForComponentById',
      getErrorIfNoneCheckBoxSelectedForProfileEdit:
        'theme/getErrorIfNoneCheckBoxSelectedForProfileEdit',
      getIfIsSubmitted: 'error/getIfIsSubmitted',
    }),
  },
  watch: {
    isTreatmentMode: {
      handler() {
        this.updateComponentToState()
      },
      deep: true,
    },
  },
  mounted() {
    const newObjs = Object.assign({}, this.part.other_style['label-required'])
    for (const key in newObjs) {
      const val = this.sanitize.mapStyleValueWithState(key)
        ? this.getAttributeValue(newObjs[key])
        : this.sanitize.mapStyleValue(key, newObjs[key])

      newObjs[key] = this.constants.PX_NEEDED_KEYS.includes(key)
        ? val + 'px'
        : val

      if (newObjs[key] === '' || newObjs[key] === null) delete newObjs[key]
    }
    this.labelRequired = newObjs

    if (this.ucGroupPart.child_nodes) {
      this.ucGroupPart.child_nodes.map((value) => {
        const newObj = Object.assign({}, value.style)
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
        return this.custom_style
      })
    }

    this.updateComponentToState()
    if (this.part.validations) {
      this.updateValidationState(
        this.part.part_value,
        this.part,
        'error/updateErrorsForComponent'
      )
    }
    if (this.part.other_style.label) this.mapLabelStyle('label')
  },
  methods: {
    mapLabelStyle() {
      const newObj = Object.assign({}, this.part.other_style.label)

      for (const key in newObj) {
        const val = this.sanitize.mapStyleValueWithState(key)
          ? this.getAttributeValue(newObj[key])
          : this.sanitize.mapStyleValue(key, newObj[key])

        newObj[key] = this.constants.PX_NEEDED_KEYS.includes(key)
          ? val + 'px'
          : val

        if (newObj[key] === '' || newObj[key] === null) delete newObj[key]
      }

      this.labelStyle = newObj
    },
    unCheckAllDisease() {
      this.$emit('unCheckAllDisease')
    },
    checkIfCheckBoxGroupHasError() {
      return (
        this.getIfIsSubmitted &&
        this.getErrorIfNoneCheckBoxSelectedForProfileEdit
      )
    },
    inputEv(part) {
      part.part_value = this.isTreatmentMode
      this.updateValidationState(
        this.isTreatmentMode,
        part,
        'error/updateErrorStateForComponentById'
      )
    },
    getLabel(show, label) {
      if (show === 1) {
        return label
      }
      return ''
    },
    updateValidationState(value, part, commit) {
      const validations = part.validations
      let errorType = ''
      // let errorObject = {}
      let errorStatus = false

      if (validations && validations.length > 0) {
        try {
          validations.forEach((obj) => {
            switch (obj.label) {
              case this.constants.REQUIRED:
                this.customCurrentDiseaseRadioGroupRequired = true
                errorStatus = this.constants.IS_EMPTY_VALUE.includes(value)

                errorType = this.constants.REQUIRED
                this.$store.dispatch(commit, {
                  id: part.id,
                  error_type: errorType,
                  error_message: obj.message,
                  error_status: errorStatus,
                })
                break
            }
          })
        } catch (e) {
          console.warn('Validation Adding state error', e)
        }
      }
    },
    updateComponentToState() {
      if (this.part) {
        this.$store.dispatch('theme/setProfileEditSpecialComponentToState', {
          id: this.part.id,
          value: this.part.part_value,
        })
      }

      if (this.ucGroupPart) {
        Object.entries(this.ucGroupPart.child_nodes).forEach(([_, child]) => {
          this.$store.dispatch('theme/setProfileEditSpecialComponentToState', {
            id: child.id,
            value: child.part_value,
            type: child.part_type_component_name,
          })
        })
      }

      if (this.cdGroupPart) {
        Object.entries(this.cdGroupPart.child_nodes).forEach(([_, child]) => {
          this.$store.dispatch('theme/setProfileEditSpecialComponentToState', {
            id: child.id,
            value: child.part_value,
            type: child.part_type_component_name,
          })
        })
      }
    },
    updateTreatmentMode(id, part, value) {
      part.part_value = value
      this.$store.dispatch('theme/updateProfileEditSpecialComponentValue', {
        id,
        value,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.edit-label {
  font-weight: var(--weight);
}
</style>
