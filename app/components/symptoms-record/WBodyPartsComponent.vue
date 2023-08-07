<template>
  <div class="w-body-parts">
    <div class="text-center">
      <div class="w-body-parts__toggle-content">
        <button :class="{ on: isFront }" @click="isFront = !isFront">
          前面
        </button>
        <button :class="{ on: !isFront }" @click="isFront = !isFront">
          背面
        </button>
      </div>
    </div>
    <div class="w-body-parts__content">
      <div v-show="isFront" class="w-body-parts__content__front">
        <body-and-line-front
          :component-list="frontComponentList"
          @openIndicatorDialog="toggleDialog"
        />
      </div>
      <div v-show="!isFront" class="w-body-parts__content__back">
        <body-and-line-back
          :component-list="backComponentList"
          @openIndicatorDialog="toggleDialog"
        />
      </div>

      <IndicatorModel
        v-show="showModel"
        v-model="currentModelId"
        :model-offset-width="modelOffsetWidth"
        :model-offset="modelOffset"
        :indicator-data="indicatorModelData"
        :hint-message="part.child_nodes[0]?.placeholder"
        :range-value="rangeValue"
        @close-modal="showModel = false"
      />
    </div>
  </div>
</template>
<script>
import { CONSTANTS } from '@/utils/constants'

import BodyAndLineBack from '@/components/symptoms-record/BodyAndLineBack'
import BodyAndLineFront from '@/components/symptoms-record/BodyAndLineFront'
import IndicatorModel from '@/components/symptoms-record/IndicatorModel'

export default {
  name: 'WBodyPartsComponent',
  components: {
    BodyAndLineBack,
    BodyAndLineFront,
    IndicatorModel,
  },
  props: {
    part: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      indicatorModelData: [],
      isFront: true,
      frontComponentList: [],
      backComponentList: [],
      partComponentListWithValue: [],
      constants: CONSTANTS,
      showModel: false,
      currentModelId: undefined,
      modelOffsetWidth: undefined,
      modelOffset: undefined,
      rangeValue: undefined,
    }
  },
  mounted() {
    if (this.part.child_nodes != null && this.part.child_nodes.length > 0) {
      this.part.child_nodes.forEach((c) => {
        if (c.id.includes(this.constants.PAIN_PARTS_FRONT_STRING)) {
          this.frontComponentList.push(c)
        } else if (c.id.includes(this.constants.PAIN_PARTS_BACK_STRING)) {
          this.backComponentList.push(c)
        }

        this.partComponentListWithValue.push({
          id: c.id,
          label: c.label,
          value: c.part_value,
        })
      })
      this.$store.dispatch(
        'theme/setPartBodyList',
        this.partComponentListWithValue
      )
    }
  },
  methods: {
    toggleDialog(id, value) {
      this.rangeValue = value
      this.currentModelId = id
      this.indicatorModelData = value
      this.showModel = true

      setTimeout(() => {
        this.modelOffsetWidth = document.getElementById(
          this.constants.SYMPTOMS_MODEL_ID
        ).offsetWidth
        this.modelOffset = document
          .getElementById(this.constants.SYMPTOMS_MODEL_ID)
          .getBoundingClientRect().left
      }, 100)
    },
  },
}
</script>
<style lang="scss">
.w-body-parts {
  .text-center {
    text-align: center;
  }

  &__toggle-content {
    display: inline-flex;
    justify-content: center;
    margin-bottom: 20px;
    background: #0e102829;
    padding: 3px 3px;
    border-radius: 6px;

    button {
      font-size: 16px;
      background: transparent;
      appearance: none;
      padding: 12px 20px;
      border-radius: 6px;
      line-height: 1;
      color: #222222;
      border: 0;

      &.on {
        background: #fff;
        font-weight: 600;
        box-shadow: 0 2px 6px #0e102829;
      }
    }
  }

  &__content {
    display: flex;
    justify-content: center;
  }
}
</style>
