<template>
  <div :id="id" class="w-radio-icon" :class="classInner" :style="{ width }">
    <label
      for="w-radio-icon"
      :class="{ 'w-radio-icon__label--required': required }"
      :style="customizeStyle"
    />
    <div v-if="icon" class="w-radio-icon__btn">
      <div
        v-for="ans in items"
        :key="ans.label"
        @mousedown="mouseDownIcon(ans)"
        @touchstart="mouseDownIcon(ans)"
        @touchend="onClick(ans)"
        @click="onClick(ans)"
      >
        <img :src="getImagePath(ans)" alt="bad" />
      </div>
    </div>
    <div>
      <small v-if="!error">{{ '\xa0' }}</small>
      <small v-if="error" :style="errorMessagesStyle">{{
        errorMessages ? errorMessages : 'Error messages'
      }}</small>
    </div>
  </div>
</template>
<script>
import { sharedProps } from '@/utils/constants'

export default {
  name: 'WRadioIcon',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    classInner: {
      type: String,
      default: undefined,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '1',
    },
    length: {
      type: Number,
      default: 5,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hintMessages: {
      type: String,
      default: undefined,
    },
    hintMessagesColor: {
      type: String,
      default: 'black',
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: String,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: undefined,
    },
    items: {
      type: Array,
      default: undefined,
    },
    ...sharedProps,
  },
  data() {
    return {
      valueInner: this.value != null ? parseInt(this.value) : 0,
      isDragging: false,
      dragWidth: null,
      offset: null,
      activeBtn: '',
      isMouseDown: false,
    }
  },
  computed: {
    customizeStyle() {
      return {
        '--errorMessagesColor': this.errorMessagesColor,
        '--contentBackgroundColor': this.contentBackgroundColor,
        '--contentFontWeight': this.contentFontWeight,
        '--contentFontColor': this.contentTextColor,
        '--contentFontSize': this.contentFontSize,
        '--fontColorLabel': this.labelFontColor,
        '--fontSizeLabel': this.labelFontSize,
        '--fontWeightLabel': this.labelBold,
        '--backgroundColorLabel': this.labelBackgroundColor,
        '--fontColorRequiredLabel': this.labelRequiredFontColor,
        '--fontSizeRequiredLabel': this.labelRequiredFontSize,
        '--fontWeightRequiredLabel': this.labelRequiredBold,
        '--backgroundColorRequiredLabel': this.labelRequiredBackgroundColor,
      }
    },
    errorMessagesStyle() {
      return {
        color: this.errorMessagesColor,
      }
    },
    activeImg() {
      const activeAns = this.items.find((ans) => ans.label === this.activeBtn)
      return activeAns ? activeAns.extra_data.ex_text_2 : ''
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.valueInner = newValue != null ? parseInt(newValue) : 0
      },
      deep: true,
    },
  },
  mounted() {
    this.bindListener()
    this.activeBtn = this.value
  },
  methods: {
    getImagePath(ans) {
      if (ans.label === this.activeBtn && this.isMouseDown) {
        return require('@/assets/img/' + ans.extra_data.ex_text_3)
      } else if (ans.label === this.activeBtn) {
        return require('@/assets/img/' + this.activeImg)
      } else {
        return require('@/assets/img/' + ans.extra_data.ex_text_1)
      }
    },

    onClick(v) {
      this.isMouseDown = false
      this.activeBtn = v.label
      this.$emit('input', v.value)
    },
    mouseDownIcon(v) {
      this.isMouseDown = true
      this.activeBtn = v.label
    },
    bindListener() {
      document.addEventListener('mousemove', this.drag)
      document.addEventListener('mouseup', this.dragEnd)
      document.addEventListener('touchmove', this.drag)
      document.addEventListener('touchend', this.dragEnd)
      window.addEventListener('resize', this.setDragWidth)
    },
  },
}
</script>

<style lang="scss" scoped>
.active {
  background-color: #00abff38;
}

.w-radio-icon {
  display: flex;
  flex-direction: column;

  &__label {
    display: flex;
    align-items: center;
    font-size: var(--fontSizeLabel);
    font-weight: var(--fontWeightLabel);
    color: var(--fontColorLabel);
  }

  &__label--required {
    position: relative;
  }

  &__label--required::after {
    content: '必須';
    margin-left: 8px;
    border-radius: 2px;
    text-align: center;
    line-height: 1;
    padding: 4px 8px;
    color: var(--fontColorRequiredLabel);
    font-size: var(--fontSizeRequiredLabel);
    font-weight: var(--fontWeightRequiredLabel);
    background-color: var(--backgroundColorRequiredLabel);
  }

  &__btn {
    display: flex;
    flex-wrap: wrap;
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer / Edge */
    user-select: none;
    /* Non-prefixed version */
  }
}
</style>
