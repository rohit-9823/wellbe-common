<template>
  <div>
    <WSectionLabel
      v-if="section.label != null"
      :section="section"
      :class-name="className"
      :content-font-weight="custom_style?.[constants.BOLD]"
      :content-font-size="custom_style?.[constants.FONT_SIZE]"
      :content-text-color="custom_style?.[constants.FONT_COLOR]"
      :content-background-color="custom_style?.[constants.BACKGROUND_COLOR]"
      :hint-message="newHintMessage"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { sanitizer } from '@/utils/sanitizer'
import { CONSTANTS } from '@/utils/constants'

import WSectionLabel from '@/components/stories/WSectionLabel'

export default {
  name: 'WCommonSection',
  components: {
    WSectionLabel,
  },
  props: {
    section: {
      type: Object,
      default: undefined,
    },
    newHintMessage: {
      type: String,
      default: undefined,
    },
    customStyleObj: {
      type: Object,
      default: undefined,
    },
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      custom_style: {},
      sanitize: sanitizer,
      constants: CONSTANTS,
    }
  },
  computed: {
    ...mapGetters({
      getAttributeValue: 'theme/getAttributeValue',
    }),
  },
  mounted() {
    if (this.customStyleObj) {
      const newObj = this.customStyleObj
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
  },
  methods: {},
}
</script>
