<template>
  <div :id="id" class="w-rating" :class="classInner" :style="{ width }">
    <label
      for="w-rating"
      :class="{ 'w-rating__title--required': required }"
      :style="customizeStyle"
    >
      <span class="weight_600">{{ title }}</span>
      <span v-show="!isModelDisplay" class="w-rating__value">{{ value }}</span>
      <span class="weight_400 font-size_14">{{ unit }}</span>
    </label>
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <div v-if="icon" class="w-rating__icon">
      <img src="@/assets/img/icon_face_bad.svg" alt="bad" />
      <img src="@/assets/img/icon_face_Usually.svg" alt="normal" />
      <img src="@/assets/img/icon_face_Good.svg" alt="Good" />
    </div>
    <div class="w-rating__item" :style="customizeStyle">
      <button
        :disabled="disabled"
        class="w-rating__item__button w-rating__item__button__minus"
        @click="minusClick($event)"
      >
        <i class="icon-Icon_Minus"></i>
      </button>
      <div
        :id="constants.SYMPTOMS_MODEL_ID"
        ref="elem"
        class="w-rating__item__slider"
      >
        <div
          class="w-rating__item__slider__bar w-rating__item__slider__bar--left"
          :style="{ width: `${sliderValue}%`, opacity: disabled ? 0.5 : 1 }"
        ></div>
        <div
          class="w-rating__item__slider__bar w-rating__item__slider__bar--right"
          :style="{ width: `${100 - sliderValue}%` }"
        ></div>
        <div v-for="(item, index) in ticks" :key="index">
          <div
            class="w-rating__item__slider__ticks"
            :style="{ left: item }"
          ></div>
        </div>
        <div
          class="w-rating__item__slider__thumb"
          :style="{ left: `${sliderValue}%` }"
          @mousedown="dragStart($event)"
          @touchstart="dragStart($event)"
        ></div>
      </div>
      <button
        :disabled="disabled"
        class="w-rating__item__button w-rating__item__button__plus"
        @click="plusClick($event)"
      >
        <i class="icon-Icon_Plus"></i>
      </button>
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
import { sharedProps, CONSTANTS } from '@/utils/constants'

export default {
  name: 'WIndicator',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    classInner: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
    unit: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: 'black',
    },
    icon: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 1,
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
    isModelDisplay: {
      type: Boolean,
      default: false,
    },
    modelOffsetWidth: {
      type: Number,
      default: undefined,
    },
    modelOffset: {
      type: Number,
      default: undefined,
    },
    indicatorColor: {
      type: String,
      default: '#c5ea9a',
    },
    indicatorPointerColor: {
      type: String,
      default: '#69c400',
    },
    ...sharedProps,
  },
  data() {
    return {
      valueInner: this.value,
      isDragging: false,
      dragWidth: null,
      offset: null,
      constants: CONSTANTS,
    }
  },
  computed: {
    customizeStyle() {
      return {
        '--color': this.color,
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
        '--indicatorColor': this.indicatorColor,
        '--indicatorPointerColor': this.indicatorPointerColor,
      }
    },
    sliderValue() {
      if (this.valueInner > this.length) return 100
      if (this.valueInner < 0) return 0
      const point = this.valueInner / this.length
      const percent = Number(point * 100).toFixed(1)
      return Math.round(percent * 10) / 10
    },
    ticks() {
      const result = []
      for (let i = 0; i < this.length; i++) {
        const point = i / this.length
        const percent = Number(point * 100).toFixed(1)
        result.push(Math.round(percent * 10) / 10 + '%')
      }
      result.push('100%')
      return result
    },
    errorMessagesStyle() {
      return {
        color: this.errorMessagesColor,
      }
    },
    tickDistance() {
      return this.dragWidth / this.length
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.valueInner = newValue
      },
      deep: true,
    },
    // set dragWidth from prop if component is displayed inside model
    modelOffsetWidth: {
      handler(newValue) {
        this.dragWidth = newValue
      },
      deep: true,
    },
    // set offset from prop if component is displayed inside model
    modelOffset: {
      handler(newValue) {
        this.offset = newValue
      },
      deep: true,
    },
  },
  mounted() {
    this.setDragWidth()
    this.offset = this.$refs.elem.getBoundingClientRect().left
    this.bindListener()
  },
  methods: {
    minusClick($event) {
      if (!this.readOnly) {
        this.valueInner = this.valueInner - 1
        if (this.valueInner < 0) this.valueInner = 0
        this.$emit('click', $event)
        this.$emit('input', this.valueInner)
      }
    },
    plusClick($event) {
      if (!this.readOnly) {
        this.valueInner = this.valueInner + 1
        if (this.valueInner > this.length) this.valueInner = this.length
        this.$emit('click', $event)
        this.$emit('input', this.valueInner)
      }
    },
    bindListener() {
      document.addEventListener('mousemove', this.drag)
      document.addEventListener('mouseup', this.dragEnd)
      document.addEventListener('touchmove', this.drag)
      document.addEventListener('touchend', this.dragEnd)
      window.addEventListener('resize', this.setDragWidth)
    },
    setDragWidth() {
      this.dragWidth = this.$refs.elem.offsetWidth
    },
    convertPosToInnerVal(pos) {
      let innerVal = Math.floor(pos / this.tickDistance)
      innerVal =
        pos % this.tickDistance > this.tickDistance / 2
          ? innerVal + 1
          : innerVal

      return innerVal
    },
    getPosition(e) {
      let clientX = e.clientX
      if (e.touches) {
        clientX = e.touches[0].clientX
      }
      return clientX - this.offset
    },
    setPosition(pos) {
      this.valueInner = this.convertPosToInnerVal(pos)
    },
    dragStart($event) {
      this.isDragging = true
    },
    drag(e) {
      if (!this.isDragging) {
        return
      }
      const pos = this.getPosition(e)
      if (pos > 0 && pos < this.dragWidth) {
        this.setPosition(pos)
        this.$emit('mousemove', e)
        this.$emit('input', this.valueInner)
      }
    },
    dragEnd(e) {
      if (!this.isDragging) {
        return
      }

      this.isDragging = false
      this.$emit('mouseup', e)
      this.$emit('input', this.valueInner)
    },
  },
}
</script>

<style lang="scss" scoped>
.weight_400 {
  font-weight: 400;
}

.weight_600 {
  font-weight: 600;
}

.wrating_blue {
  .w-rating__item__button {
    border: 2px solid #61becd !important;
    color: #61becd !important;

    i {
      &:before {
        color: #61becd !important;
      }
    }

    &:active {
      background-color: #ebf7f9 !important;
      border-color: #38a6b4 !important;

      i {
        &:before {
          color: #38a6b4 !important;
        }
      }
    }
  }

  .w-rating__item__slider__thumb {
    background-color: #61becd !important;
  }

  .w-rating__item__slider__bar--left {
    background-color: #a2d7dd !important;
  }
}

.wrating_orange {
  .w-rating__item__button {
    border: 2px solid #f08400 !important;
    color: #f08400 !important;

    i {
      &:before {
        color: #f08400 !important;
      }
    }

    &:active {
      background-color: #fff1e2 !important;
      border-color: #df7a2b !important;

      i {
        &:before {
          color: #df7a2b !important;
        }
      }
    }
  }

  .w-rating__item__slider__thumb {
    background-color: #f08400 !important;
  }

  .w-rating__item__slider__bar--left {
    background-color: #fac88e !important;
  }
}

.wrating_default {
  .w-rating__item__button {
    border: 2px solid var(--indicatorPointerColor) !important;
    color: var(--indicatorPointerColor) !important;

    i {
      &:before {
        color: var(--indicatorPointerColor) !important;
      }
    }

    &:active {
      background-color: var(--indicatorColor) !important;
      border-color: var(--indicatorPointerColor) !important;

      i {
        &:before {
          color: var(--indicatorPointerColor) !important;
        }
      }
    }
  }

  .w-rating__item__slider__thumb {
    background-color: var(--indicatorPointerColor) !important;
  }

  .w-rating__item__slider__bar--left {
    background-color: var(--indicatorColor) !important;
  }
}

.wrating_green {
  .w-rating__item__button {
    border: 2px solid #69c400 !important;
    color: #69c400 !important;

    i {
      &:before {
        color: #69c400 !important;
      }
    }

    &:active {
      background-color: #ecf7e2 !important;
      border-color: #45a925 !important;

      i {
        &:before {
          color: #45a925 !important;
        }
      }
    }
  }

  .w-rating__item__slider__thumb {
    background-color: #69c400 !important;
  }

  .w-rating__item__slider__bar--left {
    background-color: #c5ea9a !important;
  }
}

.font-size_14 {
  font-size: 14px;
}

.w-rating {
  display: flex;
  flex-direction: column;

  &__title {
    font-size: var(--fontSizeLabel);
    font-weight: var(--fontWeightLabel);
    color: var(--fontColorLabel);
  }

  &__title--required {
    position: relative;
  }

  &__title--required::after {
    content: '必須';
    position: absolute;
    margin-left: 8px;
    bottom: 3px;
    border-radius: 2px;
    text-align: center;
    line-height: 1;
    padding: 4px 8px;
    color: var(--fontColorRequiredLabel);
    font-size: var(--fontSizeRequiredLabel);
    font-weight: var(--fontWeightRequiredLabel);
    background-color: var(--backgroundColorRequiredLabel);
  }

  &__value {
    font-weight: bolder;
    margin-left: 10px;
    font-size: 24px;
  }

  &__icon {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    font-size: 20px;
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

  &__item {
    display: flex;
    margin-top: 10px;

    &__button {
      background-color: transparent;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid var(--color);
      color: var(--color);
      width: 30px;
      height: 30px;
      position: relative;

      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        &.icon-Icon_Plus {
          font-size: 17px;
        }

        &.icon-Icon_Minus {
          font-size: 16px;
        }

        &:before {
          color: var(--color);
        }
      }

      //&:hover {
      //  opacity: 0.9;
      //  color: #fff;
      //  background-color: var(--color);
      //  i {
      //    &:before{
      //      color: #fff;
      //    }
      //  }
      //}
      &:disabled {
        opacity: 0.5;

        &:hover {
          opacity: 0.5;
          color: var(--color);
          background-color: transparent;
        }
      }

      &__minus {
        margin-right: 20px;
      }

      &__plus {
        margin-left: 20px;
      }
    }

    &__slider {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;

      &__bar {
        background-color: #ebecf0;
        border-color: #ebecf0;
        height: 10px;
        border-radius: 10px;

        &--left {
          right: 0px;
          background-color: var(--color);
          z-index: 1;
        }

        &--right {
          left: 0px;
          right: auto;
        }
      }

      &__thumb {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--color);
        z-index: 2;
      }

      &__ticks {
        position: absolute;
        width: 1px;
        height: 20px;
        top: calc(50% - 10px);
        background-color: #ebecf0;
      }
    }
  }
}
</style>
