<template>
  <div :id="id" class="w-textarea" :class="classInner">
    <label
      for="w-textarea"
      :style="customizeStyle"
      class="w-textarea__label"
      :class="{ 'w-textarea__label--required': required }"
      >{{ label }}</label
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <textarea
      class="w-textarea__area"
      :class="{ 'w-textarea__area--error': errorMessageDisplay === 'unset' }"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :style="customizeStyle"
      :value="valueInner"
      :rows="computedRows"
      @blur="blur"
      @change="change"
      @click="click"
      @focus="focus"
      @input="input"
      @keydown="keydown"
      @keyup="keyup"
      @mousedown="mousedown"
      @mouseup="mouseup"
    ></textarea>
    <small :style="counterStyle">{{
      valueInner ? `${valueInner.length}/${counter}` : `0/${counter}`
    }}</small>
    <div class="w-textarea__customize">
      <small v-if="errorMessageDisplay === 'none'">{{ '\xa0' }}</small>
      <small :style="errorMessagesStyle">{{
        errorMessages ? errorMessages : 'Error messages'
      }}</small>
    </div>
  </div>
</template>

<script>
import { sharedProps } from '@/utils/constants'

export default {
  name: 'WTextarea',
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
    rows: {
      type: Number,
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
    computedRows() {
      return Math.ceil(this.counter / 23) + 1
    },
    customizeStyle() {
      return {
        '--focusColor': this.focusColor,
        '--height': this.height,
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
        color: 'black',
        display: this.counter > 0 ? 'unset' : 'none',
        'margin-left': 'auto',
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
      handler() {
        if (this.error) {
          this.errorMessageDisplay = 'unset'
        } else {
          this.errorMessageDisplay = 'none'
        }
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
      if (this.rules.length > 0) {
        if (newValue) {
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
      }
      this.valueInner = newValue
      this.$emit('input', newValue, $event)
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
.w-textarea {
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

  &__area {
    border: 1px solid #9d9ea3;
    border-radius: 5px;
    padding: 5px;
    resize: none;
    background-color: var(--contentBackgroundColor);
    font-size: var(--contentFontSize);
    color: var(--contentFontColor);
    font-weight: var(--contentFontWeight);

    &::placeholder {
      color: #9397a1;
      font-weight: 400;
    }

    &:focus {
      padding: 5px;
      border: 1px solid var(--focusColor);
      border-radius: 2px;
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
