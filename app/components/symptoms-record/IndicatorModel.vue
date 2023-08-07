<template>
  <div class="modal-overlay">
    <div class="modal" @click.stop>
      <div class="modal__label">
        <label>
          {{ getLabelById(value) }}
          <br />
        </label>
        <label> 痛みの強さ </label>
      </div>
      <div class="modal__content">
        <w-number
          :input-type="`number`"
          :value="getValueById(value, constants.STRING)"
          :style="{ 'align-items': 'center' }"
          :content-width="`50px`"
          :input-name="`flexWidth`"
          :indicator-range="rangeValue"
          @input="updatePainPartValue"
        />
        <w-indicator
          :value="getValueById(value, constants.NUMBER)"
          :length="10"
          :show-value="false"
          :model-offset="modelOffset"
          :model-offset-width="modelOffsetWidth"
          :class-inner="'wrating_blue'"
          @input="updatePainPartValue"
        />
        <label class="modal__content__hint-message">
          {{ hintMessage }}
        </label>
        <w-button :text="`閉じる`" @click="$emit('close-modal')" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CONSTANTS } from '@/utils/constants'

import WIndicator from '@/components/stories/WIndicator'
import WNumber from '@/components/stories/WNumber'
import WButton from '@/components/stories/WButton'

export default {
  name: 'IndicatorModel',
  components: { WNumber, WIndicator, WButton },
  props: {
    rangeValue: {
      type: Array,
      default: undefined,
    },
    id: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    modelOffset: {
      type: Number,
      default: undefined,
    },
    modelOffsetWidth: {
      type: Number,
      default: undefined,
    },
    hintMessage: {
      type: String,
      default: undefined,
    },
    indicatorData: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {
      constants: CONSTANTS,
    }
  },
  computed: {
    ...mapGetters({
      getValueById: 'theme/getPartValueById',
      getLabelById: 'theme/getPartLabelById',
    }),
  },
  mounted() {},
  methods: {
    updatePainPartValue(val) {
      const range = this.indicatorData[0]?.extra_data.indicator_range
      if (
        val > parseInt(range.max) ||
        val < parseInt(range.min) ||
        /^\d*\.\d+$/.test(val) ||
        isNaN(val)
      ) {
        val = 0
      }
      this.$store.dispatch('theme/updatePartValueById', {
        id: this.value,
        value: val,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 1;
  justify-content: center;
  align-items: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  width: 90%;
  max-width: 343px;
  padding: 20px;
  border-radius: 20px;

  &__label {
    text-align: left;
    padding-bottom: 20px;
    line-height: 1;
    font-weight: 600;
    color: #222;

    label {
      &:first-child {
        font-size: 22px;
        padding-bottom: 20px;
        display: block;
      }
    }
  }

  &__content {
    &__hint-message {
      display: block;
      padding-bottom: 15px;
    }
  }
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>
