<template>
  <div>
    <w-radio-group
      :id="part.id"
      v-model="isAnotherHospitalRadioModel"
      :name="part.id"
      :items="part.answers"
      :label="part.label"
      :is-state-store="true"
      :label-display="part.label_display"
      :title="getLabel(part.label_display, part.label)"
      :component-return-type="part.part_value_return_type"
      :label-bold="labelStyle?.[constants.BOLD]"
      :label-font-size="labelStyle?.[constants.FONT_SIZE]"
      :label-font-color="labelStyle?.[constants.FONT_COLOR]"
      :label-background-color="labelStyle?.[constants.BACKGROUND_COLOR]"
      :selected-button-color="custom_style?.[constants.CHECK_COLOR]"
      :selected-unchecked-color="custom_style?.[constants.UNCHECKED_COLOR]"
    />
    <w-text
      :id="part.child_nodes[0].id"
      v-model="textAnotherHospitalModel"
      :placeholder="part.child_nodes[0].placeholder"
      :is-state-store="true"
      :component-return-type="part.part_value_return_type"
      :disabled="
        isTextNextHospitalDisable(
          part.child_nodes[0].id,
          part.child_nodes[0].part_value_return_type
        )
      "
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { sanitizer } from '@/utils/sanitizer'
import { CONSTANTS } from '@/utils/constants'
import WRadioGroup from '@/components/stories/WRadioGroup.vue'
import WText from '@/components/stories/WText'

export default {
  name: 'WSpecialNextHospitalRadioComponent',
  components: { WRadioGroup, WText },
  props: {
    part: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      isAnotherHospitalRadioModel: this.part?.part_value,
      textAnotherHospitalModel: this.part?.child_nodes[0]?.part_value,
      labelStyle: {},
      constants: CONSTANTS,
      sanitize: sanitizer,
      custom_style: {},
    }
  },
  computed: {
    ...mapGetters({
      getAttributeValue: 'theme/getAttributeValue',
    }),
  },
  mounted() {
    const newObj = Object.assign({}, this.part.style)
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

    if (this.part.other_style.label) this.mapLabelStyle()
  },
  methods: {
    getLabel(show, label) {
      if (show === 1) {
        return label
      }
      return ''
    },
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
    isTextNextHospitalDisable(childId, returnType) {
      if (Number(this.isAnotherHospitalRadioModel) === 1) return false

      this.textAnotherHospitalModel = null
      this.$store.dispatch(
        'component-value-store/updateCheckboxIconListValueById',
        {
          part_value: sanitizer.validateValue(null, returnType),
          part_id: childId,
        }
      )
      return true
    },
  },
}
</script>
