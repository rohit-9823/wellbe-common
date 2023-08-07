<template>
  <div>
    <div v-for="part in parts" :key="part.id">
      <div class="w-confirmation-label">
        <div class="selection__confirm">
          <w-label
            :id="part.id"
            :w-label="part.label"
            :w-label-value="checkForAnswers(part)"
            :parent-class-name="`selection__confirm`"
            :label-background-color="
              getStyle(
                constants.BACKGROUND_COLOR,
                part.other_style?.['label-confirmation']
              )
            "
            :label-bold="
              getStyle(constants.BOLD, part.other_style?.['label-confirmation'])
            "
            :label-font-color="
              getStyle(
                constants.FONT_COLOR,
                part.other_style?.['label-confirmation']
              )
            "
            :label-font-size="
              getStyle(
                constants.FONT_SIZE,
                part.other_style?.['label-confirmation']
              )
            "
            :content-font-weight="getStyle(constants.BOLD, part.style)"
            :content-font-size="getStyle(constants.FONT_SIZE, part.style)"
            :content-text-color="getStyle(constants.FONT_COLOR, part.style)"
            :content-background-color="
              getStyle(constants.BACKGROUND_COLOR, part.style)
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { validations } from '@/utils/validations'
import { CONSTANTS } from '@/utils/constants'
import { sanitizer } from '@/utils/sanitizer'
import WLabel from '@/components/stories/WLabel'

export default {
  name: 'WConfirmationLabel',
  components: {
    WLabel,
  },
  props: {
    parts: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {
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
    window.scrollTo(0, 0)
  },
  methods: {
    getStyle(label, styleObj) {
      if (!styleObj || Object.keys(styleObj).length === 0) {
        return ''
      }

      const { BACKGROUND_COLOR, BOLD, FONT_COLOR, FONT_SIZE } = this.constants
      let val = ''
      switch (label) {
        case BACKGROUND_COLOR:
          val = this.getStyleValue(styleObj, BACKGROUND_COLOR)
          break
        case BOLD:
          val = this.getStyleValue(styleObj, BOLD)
          break
        case FONT_COLOR:
          val = this.getStyleValue(styleObj, FONT_COLOR)
          break
        case FONT_SIZE:
          val = this.getStyleValue(styleObj, FONT_SIZE)
          break
        default:
          break
      }
      return val
    },
    getStyleValue(styleObj, label) {
      const styleValue = styleObj[label]
      const isStyleValueSanitized = this.sanitize.mapStyleValueWithState(label)
      return isStyleValueSanitized
        ? this.getAttributeValue(styleValue)
        : this.sanitize.mapStyleValue(label, styleValue)
    },
    checkForAnswers(part) {
      if (part.answers) {
        const filteredAnswers = part.answers.filter(
          (answer) => String(part.part_value) === String(answer.value)
        )
        return filteredAnswers.length > 0 ? filteredAnswers[0].label : ''
      }
      return part.part_value
    },
  },
}
</script>
<style lang="scss" scoped>
.w-confirmation-label {
  margin: 5px 10px;
  padding: 5px 10px;
}
</style>
