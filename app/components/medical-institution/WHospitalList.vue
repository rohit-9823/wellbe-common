<template>
  <div v-if="hasHospitals">
    <div
      v-for="(item, index) in hospitals"
      :key="index"
      class="selection__content"
      :class="isAlreadySelected(item) ? 'disabled' : ''"
    >
      <div
        class="selection__content__item-detail"
        @click="hospitalSelected(item)"
      >
        <div class="selection__content__item-detail__name">
          {{ item.name }}
          <span
            v-if="isAlreadySelected(item) === true"
            class="selection__content__item-detail__name__selected-text"
            >選択中</span
          >
        </div>
        <small v-for="(sub, i) in item.subjects" :key="i">
          <!--          todo display subjects here-->
          {{ `${sub.name}${i !== item.subjects.length - 1 ? '、' : ''}` }}
        </small>
        <div>
          <small>{{ item.address }}</small>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="isLoaded && screen.hospital0_action === '0'">
    <w-common-component
      :part="part"
      :style-obj="part.pStyle"
      :label-style-obj="getStyle(constants.LABEL_STYLE, part.otherStyle)"
      :label-required-obj="
        getStyle(constants.LABEL_REQUIRED_STYLE, part.otherStyle)
      "
      @input="$event, WButton"
      @click="goToNextStage"
    ></w-common-component>
  </div>
</template>

<script>
import { CONSTANTS } from '@/utils/constants'
import WCommonComponent from '@/components/common/WCommonComponent.vue'
export default {
  name: 'WHospitalList',
  components: { WCommonComponent },
  props: {
    hospitals: {
      type: Array,
      default: undefined,
    },
    selectedPrefecture: {
      type: Object,
      default: undefined,
    },
    selectedCity: {
      type: Object,
      default: undefined,
    },
    unavailableHospitalList: {
      type: Array,
      default: undefined,
    },
    xWLBHeader: {
      type: Object,
      default: undefined,
    },
    screen: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      cities: null,
      constants: CONSTANTS,
      isLoaded: false,
      part: {
        part_type_component_name: 'WButton',
        label: '新規登録',
        pStyle: {
          bold: true,
          'font-size': 'font_size_middle',
          'font-color': 'color_palette2',
          'error-highlight': '',
          'background-color': 'color_palette6',
        },
        otherStyle: {
          label: {
            bold: false,
            font_size: 'font_size_middle',
            'font-color': 'color_palette1',
            'background-color': 'color_palette3',
          },
          'label-required': {
            bold: false,
            font_size: 'font_size_middle',
            'font-color': 'color_palette4',
            'background-color': 'color_palette2',
          },
        },
      },
    }
  },
  computed: {
    hasHospitals() {
      return this.hospitals?.length > 0
    },
  },
  watch: {
    hospitals: {
      handler() {
        this.isLoaded = true
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
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
      }

      window.isEdited = () => {
        return true
      }
    },
    goToNextStage() {
      this.$emit('skipHospitalSelectStep')
    },
    hospitalSelected(hospital) {
      this.$emit('hospitalSelected', hospital)
    },

    isAlreadySelected(hospital) {
      try {
        const found = this.unavailableHospitalList.find(
          (h) => h.dcf_facility_id === hospital.id
        )
        if (found) return true
        return false
      } catch (e) {
        return false
      }
    },
  },
}
</script>
<style lang="scss">
.selection__content {
  .selection__content__item-detail {
    border-bottom: 1px solid #ebecf0;
  }
}
</style>
