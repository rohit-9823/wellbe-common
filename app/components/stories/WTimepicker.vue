<template>
  <div :id="id" class="w-time-picker" :class="classInner" :style="{ width }">
    <label
      for="w-time-picker"
      :style="customizeStyle"
      class="w-time-picker__label"
      :class="{ 'w-time-picker__label--required': required }"
      >{{ label }}</label
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <input
      type="time"
      class="w-time-picker__input"
      :class="{
        'w-time-picker__input--error': errorMessageDisplay === 'unset',
      }"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :style="customizeStyle"
      :value="valueInner"
      @blur="blur"
      @change="change"
      @click="click"
      @focus="focus"
      @input="input"
      @keydown="keydown"
      @keyup="keyup"
      @mousedown="mousedown"
      @mouseup="mouseup"
    />
    <div class="w-time-picker__customize">
      <small v-if="errorMessageDisplay === 'none'">{{ '\xa0' }}</small>
      <small :style="errorMessagesStyle">{{
        errorMessages ? errorMessages : 'Error messages'
      }}</small>
      <small :style="counterStyle">{{
        valueInner ? `${valueInner.length}/${counter}` : `0/${counter}`
      }}</small>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { sharedProps } from '@/utils/constants'

export default {
  name: 'WTimepicker',
  props: {
    id: {
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
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    rules: {
      type: Array,
      default: () => [],
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
    counter: {
      type: Number,
      default: undefined,
    },
    counterErrorColor: {
      type: String,
      default: '#ff0000',
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
      errorMessageDisplay: 'none',
      valueInner: this.value,
    }
  },
  computed: {
    customizeStyle() {
      return {
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
        display: this.errorMessageDisplay,
      }
    },
    counterStyle() {
      return {
        color:
          this.valueInner?.length > this.counter
            ? this.counterErrorColor
            : 'black',
        display: this.counter > 0 ? 'unset' : 'none',
        'margin-left': this.errorMessageDisplay === 'unset' ? '10px' : 'auto',
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
    error: {
      handler(newValue) {
        if (newValue) this.errorMessageDisplay = 'unset'
        else this.errorMessageDisplay = 'none'
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
      const newValue = $event.target.value
      if (this.error) {
        this.errorMessageDisplay = 'unset'
      } else if (newValue) {
        const resultArray = []
        for (let i = 0; i < this.rules.length; i++) {
          const reg = new RegExp(this.rules[i])
          const result = reg.test(newValue)
          resultArray.push(result)
        }
        if (resultArray.includes(false)) {
          this.errorMessageDisplay = 'unset'
        } else {
          this.errorMessageDisplay = 'none'
        }
      } else {
        this.errorMessageDisplay = 'none'
      }
      const timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
      if (newValue.match(timeReg))
        this.valueInner = moment(newValue, [moment.ISO_8601, 'HH:mm']).format(
          'HH:mm:Ss'
        )
      else this.valueInner = null

      this.$emit('input', this.valueInner, $event)
    },
    keydown($event) {
      this.$emit('keydown', $event)
    },
    keyup($event) {
      this.$emit('keyup', $event)
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
.w-time-picker {
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

    &::after {
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
  }

  &__input {
    appearance: none;
    height: var(--height);
    border: 1px solid #9d9ea2;
    border-radius: 5px;
    padding: 0 16px;
    background-color: var(--contentBackgroundColor);
    font-size: var(--contentFontSize);
    color: var(--contentFontColor);
    font-weight: var(--contentFontWeight);
    width: var(--width);
    flex-grow: 1;

    &::-webkit-date-and-time-value {
      text-align: left;
    }

    &:focus {
      border: 1px solid var(--focusColor);
      border-radius: 5px;
      outline: none; /* ※ブラウザが標準で付加する線を消したいとき */
    }

    &::-webkit-clear-button {
      display: none;
    }

    &::-ms-clear {
      display: none;
    }

    &--error {
      border: 1px solid var(--errorMessagesColor);

      &:focus {
        border: 1px solid var(--errorMessagesColor);
      }
    }
  }

  &__customize {
    display: flex;
    justify-content: space-between;
  }
}
</style>
