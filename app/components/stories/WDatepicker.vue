<template>
  <div :id="id" class="w-select-date" :class="classInner" :style="{ width }">
    <label
      for="w-select-date"
      :style="customizeStyle"
      class="w-select-date__label"
      :class="{ 'w-select-date__label--required': required }"
      >{{ label }}</label
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <input
      type="date"
      class="w-select-date__input"
      :class="{ 'w-select-date__input--error': error }"
      :disabled="disabled"
      :required="required"
      :style="customizeStyle"
      :value="valueInner"
      :min="minValue"
      :max="maxValue"
      @blur="blur"
      @change="change"
      @click="click"
      @focus="focus"
      @input="input"
      @mousedown="mousedown"
      @mouseup="mouseup"
    />
    <div>
      <small v-if="!error">{{ '\xa0' }}</small>
      <small v-if="error" :style="errorMessagesStyle">{{
        errorMessages ? errorMessages : 'Error messages'
      }}</small>
    </div>
  </div>
</template>

<script>
import { formatValidateDate } from '~/utils/const'
import { sharedProps } from '@/utils/constants'

export default {
  name: 'WDatepicker',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    minValue: {
      type: String,
      default: undefined,
    },
    maxValue: {
      type: String,
      default: undefined,
    },
    classInner: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Date],
      default: undefined,
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
    focusColor: {
      type: String,
      default: 'black',
    },
    height: {
      type: String,
      default: '48px',
    },
    width: {
      type: String,
      default: undefined,
    },
    ...sharedProps,
  },
  data() {
    return {
      valueInner: formatValidateDate(this.value),
    }
  },
  computed: {
    customizeStyle() {
      return {
        '--color': this.color,
        '--focusColor': this.focusColor,
        '--height': this.height,
        '--width': 'auto',
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
  },
  watch: {
    value: {
      handler(newValue) {
        this.valueInner = newValue
      },
      deep: true,
    },
  },
  methods: {
    blur($event) {
      this.$emit('blur', $event)
    },
    change($event) {
      this.$emit('change', $event)
    },
    click($event) {
      this.$emit('click', $event)
    },
    focus($event) {
      this.$emit('focus', $event)
    },
    input($event) {
      console.log('Debugging Date picker reset event', $event)
      const newValue = formatValidateDate($event.target.value)
      this.valueInner = newValue
      this.$emit('input', newValue, $event)
    },
    mousedown($event) {
      this.$emit('mousedown', $event)
    },
    mouseup($event) {
      this.$emit('mouseup', $event)
    },
  },
}
</script>

<style lang="scss" scoped>
.w-select-date {
  display: flex;
  flex-direction: column;

  &__label {
    display: flex;
    align-items: center;
    font-size: var(--fontSizeLabel);
    font-weight: var(--fontWeightLabel);
    color: var(--fontColorLabel);
    background-color: var(--backgroundColorLabel);
    padding: 0 16px;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
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

  &__input {
    appearance: none;
    height: var(--height);
    border: 1px solid #9d9ea2;
    border-radius: 5px;
    padding: 0 16px;
    position: relative;
    cursor: pointer;
    background-color: var(--contentBackgroundColor);
    font-size: var(--contentFontSize);
    color: var(--contentFontColor);
    font-weight: var(--contentFontWeight);
    width: var(--width);

    &:focus {
      border: 1px solid var(--focusColor);
      border-radius: 5px;
      outline: none;
    }

    &--error {
      border: 1px solid var(--errorMessagesColor);

      &:focus {
        border: 1px solid var(--errorMessagesColor);
      }
    }

    &::before {
      content: '';
      position: absolute;
      right: 16px;
      top: 50%;
      width: 2px;
      height: 7px;
      background-color: #4d5163;
      transform: rotate(45deg) translateY(-50%);
      border-radius: 50px;
    }

    &::after {
      content: '';
      position: absolute;
      right: 15px;
      top: 50%;
      width: 2px;
      height: 7px;
      background-color: #4d5163;
      transform: rotate(-45deg) translateY(-50%);
      border-radius: 50px;
    }

    &::-webkit-date-and-time-value {
      text-align: left;
    }

    &::-webkit-calendar-picker-indicator {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      height: auto;
      color: transparent;
      background: transparent;
      z-index: 100;
      cursor: pointer;
    }

    &::-webkit-inner-spin-button {
      z-index: 1;
    }

    &::-webkit-clear-button {
      z-index: 1;
    }
  }
}
</style>
