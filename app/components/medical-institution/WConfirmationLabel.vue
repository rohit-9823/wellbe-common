<template>
  <div>
    <div v-if="confirmationType === constants.SUBMIT">
      <component
        :is="constants.BUTTON_COMPONENT_NAME"
        :id="part.id"
        class="special-button"
        :text="part.label"
        :label="part.label"
        :content-font-weight="custom_style?.[constants.BOLD]"
        :content-font-size="custom_style?.[constants.FONT_SIZE]"
        :content-text-color="custom_style?.[constants.FONT_COLOR]"
        :content-background-color="custom_style?.[constants.BACKGROUND_COLOR]"
        :error-messages-color="custom_style?.[constants.ERROR_HIGHLIGHT]"
        :label-required-bold="label_required_style?.[constants.BOLD]"
        :label-required-font-size="label_required_style?.[constants.FONT_SIZE]"
        :label-required-font-color="
          label_required_style?.[constants.FONT_COLOR]
        "
        :label-required-background-color="
          label_required_style?.[constants.BACKGROUND_COLOR]
        "
        :label-bold="label_style?.[constants.BOLD]"
        :label-font-size="label_style?.[constants.FONT_SIZE]"
        :label-font-color="label_style?.[constants.FONT_COLOR]"
        :label-background-color="label_style?.[constants.BACKGROUND_COLOR]"
        block
        @click="save"
      />
    </div>
    <div v-else-if="confirmationType === constants.GOBACK">
      <component
        :is="constants.BUTTON_COMPONENT_NAME"
        :id="part.id"
        class="special-button"
        :text="part.label"
        :label="part.label"
        :content-font-weight="custom_style?.[constants.BOLD]"
        :content-font-size="custom_style?.[constants.FONT_SIZE]"
        :content-text-color="custom_style?.[constants.FONT_COLOR]"
        :content-background-color="custom_style?.[constants.BACKGROUND_COLOR]"
        :error-messages-color="custom_style?.[constants.ERROR_HIGHLIGHT]"
        :label-required-bold="label_required_style?.[constants.BOLD]"
        :label-required-font-size="label_required_style?.[constants.FONT_SIZE]"
        :label-required-font-color="
          label_required_style?.[constants.FONT_COLOR]
        "
        :label-required-background-color="
          label_required_style?.[constants.BACKGROUND_COLOR]
        "
        :label-bold="label_style?.[constants.BOLD]"
        :label-font-size="label_style?.[constants.FONT_SIZE]"
        :label-font-color="label_style?.[constants.FONT_COLOR]"
        :label-background-color="label_style?.[constants.BACKGROUND_COLOR]"
        block
        @click="gotoBack"
      />
    </div>
    <div v-else>
      <div v-if="isLabel">
        <component
          :is="constants.LABEL_COMPONENT_NAME"
          :id="part.id"
          :text="part.label"
          :label="part.label"
          :label-display="part.label_display"
          :title="getLabel(part.label_display, part.label)"
          :w-label="label"
          :w-label-value="value"
          :parent-class-name="parentClassName"
          :content-font-weight="custom_style?.[constants.BOLD]"
          :content-font-size="custom_style?.[constants.FONT_SIZE]"
          :content-text-color="custom_style?.[constants.FONT_COLOR]"
          :content-background-color="custom_style?.[constants.BACKGROUND_COLOR]"
          :error-messages-color="custom_style?.[constants.ERROR_HIGHLIGHT]"
          :label-required-bold="label_required_style?.[constants.BOLD]"
          :label-required-font-size="
            label_required_style?.[constants.FONT_SIZE]
          "
          :label-required-font-color="
            label_required_style?.[constants.FONT_COLOR]
          "
          :label-required-background-color="
            label_required_style?.[constants.BACKGROUND_COLOR]
          "
          :label-bold="label_style?.[constants.BOLD]"
          :label-font-size="label_style?.[constants.FONT_SIZE]"
          :label-font-color="label_style?.[constants.FONT_COLOR]"
          :label-background-color="label_style?.[constants.BACKGROUND_COLOR]"
          block
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { validations } from '@/utils/validations'
import { CONSTANTS } from '@/utils/constants'
import { sanitizer } from '@/utils/sanitizer'

import WButton from '@/components/stories/WButton'
import WLabel from '@/components/stories/WLabel'

export default {
  name: 'WConfirmationLabel',
  components: {
    WButton,
    WLabel,
  },
  props: {
    label: {
      type: String,
      default: undefined,
    },
    prefecture: {
      type: Object,
      default: undefined,
    },
    id: {
      type: String,
      required: true,
    },
    city: {
      type: Object,
      default: undefined,
    },
    hospital: {
      type: Object,
      default: undefined,
    },
    subject: {
      type: Object,
      default: undefined,
    },
    inputForm: {
      type: Object,
      default: undefined,
    },
    saveForm: {
      type: Object,
      default: undefined,
    },
    confirmationType: {
      type: String,
      default: undefined,
    },
    part: {
      type: Object,
      default: undefined,
    },
    styleObj: {
      type: Object,
      default: undefined,
    },
    parentClassName: {
      type: String,
      default: '',
    },
    labelStyleObj: {
      type: Object,
      default: undefined,
    },
    labelRequiredStyleObj: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      value: '',
      validate: validations,
      constants: CONSTANTS,
      sanitize: sanitizer,
      custom_style: {},
      label_style: {},
      label_required_style: {},
    }
  },
  computed: {
    ...mapGetters({
      getAttributeValue: 'theme/getAttributeValue',
    }),
  },
  mounted() {
    window.webviewCanGoBack = () => {
      return false
    }

    const idString = this.validate.getStringWithoutNumberFromComponentId(
      this.id
    )
    switch (idString) {
      case CONSTANTS.CITY_LABEL_STRING:
        this.value = this.city.name
        break
      case CONSTANTS.PREFECTURE_LABEL_STRING:
        this.value = this.prefecture.label
        break
      case CONSTANTS.HOSPITAL_NAME_LABEL_STRING:
        this.value = this.hospital
          ? this.hospital.name
          : this.inputForm.hospital
        break
      case CONSTANTS.SUBJECTS_LABEL_STRING:
        this.value = this.subject ? this.subject.label : null
        break
      case CONSTANTS.DOCTOR_LABEL_STRING:
        this.value = this.inputForm.doctor
        break
      case CONSTANTS.PHONE_NO_LABEL_STRING:
        this.value = this.inputForm.phone
        break
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

    this.$emit('updatePartsValue', this.value)
  },
  methods: {
    getLabel(show, label) {
      if (show === 1) {
        return label
      }
      return ''
    },
    isLabel() {
      return this.confirmationType.includes(this.constants.label)
    },
    save() {
      this.$emit('confirmationSaved')
    },
    gotoBack() {
      this.$emit('gotoBackPage')
    },
    mapLabelRequiredStyle() {
      const newObj = this.labelRequiredStyleObj
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
      const newObj = this.labelStyleObj
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
  },
}
</script>
<style lang="scss" scoped>
.special-button:first-child {
  margin-bottom: 15px !important;
}
</style>
