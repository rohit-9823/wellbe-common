<template>
  <div :id="id" class="w-number-field" :class="classInner" :style="{ width }">
    <label
      for="w-number-field"
      :style="customizeStyle"
      class="w-number-field__label"
      :class="{ 'w-number-field__label--required': required }"
      >{{ label }}</label
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <div class="w-number-field__wrap">
      <input
        :type="inputType"
        class="w-number-field__input"
        :class="{
          'w-number-field__input--error': errorMessageDisplay === 'unset',
        }"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :style="[customizeStyle, inputWidth]"
        :value="valueInner"
        @paste="preventPaste"
        @blur="blur"
        @change="change"
        @click="click"
        @focus="focus"
        @input="input"
        @keydown="keydown"
        @keyup="keyup"
        @focusout="onFocusOut"
        @mousedown="mousedown"
        @mouseup="mouseup"
      />
      <div v-if="unit" class="w-number-field__unit">{{ unit }}</div>
    </div>

    <div class="w-number-field__customize">
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
import { sharedProps } from '@/utils/constants'

export default {
  name: 'WNumber',
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
      type: [String, Number],
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
    contentWidth: {
      type: String,
      default: undefined,
    },
    unit: {
      type: String,
      default: undefined,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputName: {
      type: String,
      default: undefined,
    },
    indicatorRange: {
      type: Array,
      default: undefined,
    },
    ...sharedProps,
  },
  data() {
    return {
      errorMessageDisplay: 'none',
      valueInner: this.value,
      initialWidth: '50px',
      maxWidth: '300px',
    }
  },
  computed: {
    customizeStyle() {
      return {
        '--focusColor': this.focusColor,
        '--height': this.height,
        '--errorMessagesColor': this.errorMessagesColor,
        '--contentBackgroundColor': this.contentBackgroundColor,
        '--contentFontWeight': this.contentFontWeight,
        '--contentFontColor': this.contentTextColor,
        '--contentFontSize': this.contentFontSize,
        '--contentWidth': this.contentWidth,
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
    inputWidth: function () {
      if (this.inputName === 'flexWidth') {
        const inputLength = this.valueInner?.length
        if (inputLength <= 1) {
          return {
            width: this.initialWidth,
          }
        } else {
          const newWidth = inputLength * 30
          if (newWidth > parseInt(this.maxWidth)) {
            return {
              width: this.maxWidth,
            }
          } else {
            return {
              width: `${newWidth}px`,
            }
          }
        }
      } else {
        return {
          width: 'var(--contentWidth)',
        }
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
    preventPaste($event) {
      if (this.inputType === 'number') $event.preventDefault()
    },
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
      this.valueInner = newValue
      this.$emit('input', newValue, $event)
    },
    keydown($event) {
      if (this.inputType === 'number') {
        if (
          !(
            this.isNumeric($event.key) ||
            $event.key === 'ArrowLeft' ||
            $event.key === 'ArrowRight' ||
            $event.key === 'Backspace'
          )
        ) {
          $event.preventDefault()
        }
      } else {
        ;/^[a-zA-Z]$/.test($event.key) && $event.preventDefault()
      }
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
    isNumeric(val) {
      return Number.isInteger(Number(val))
    },
    onFocusOut($event) {
      if (this.inputType === 'number' && this.isInvalid($event.target.value))
        $event.target.value = 0
    },
    isInvalid(n) {
      const rangeValue = this.indicatorRange[0].extra_data.indicator_range
      if (n === '') {
        return true
      }
      if (
        parseInt(n) > parseInt(rangeValue.max) ||
        parseInt(n) < parseInt(rangeValue.min)
      ) {
        return true
      }

      const parsed = Number(n)
      return Number.isNaN(parsed) || !Number.isInteger(parsed)
    },
  },
}
</script>

<style lang="scss" scoped>
.w-number-field {
  display: flex;
  flex-direction: column;

  &__label {
    font-size: var(--fontSizeLabel);
    font-weight: var(--fontWeightLabel);
    color: var(--fontColorLabel);
    background-color: var(--backgroundColorLabel);
    padding: 0 16px;
    margin-left: -16px;
    margin-right: -16px;
  }

  &__label--required {
    position: relative;

    &::after {
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
  }

  &__wrap {
    display: flex;
    align-items: center;
  }

  &__unit {
    padding-left: 8px;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    display: none;
  }

  &__input {
    height: var(--height);
    border: 1px solid #9d9ea2;
    border-radius: 5px;
    padding: 0 16px;
    background-color: var(--contentBackgroundColor);
    font-size: var(--contentFontSize);
    color: var(--contentFontColor);
    font-weight: var(--contentFontWeight);
    flex: 1;
    width: var(--contentWidth);

    &:focus {
      border: 1px solid var(--focusColor);
      border-radius: 5px;
      outline: none; /* ※ブラウザが標準で付加する線を消したいとき */
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
