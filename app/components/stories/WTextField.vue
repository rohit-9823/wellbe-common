<template>
  <div :id="id" class="w-text-field" :class="classInner" :style="{ width }">
    <label
      for="w-text-field"
      :style="customizeStyle"
      class="w-text-field__label"
      :class="{ 'w-text-field__label--required': required }"
      >{{ label }}</label
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <input
      type="text"
      class="w-text-field__input"
      :class="{ 'w-text-field__input--error': errorMessageDisplay === 'unset' }"
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
    <div class="w-text-field__customize">
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
export default {
  name: 'WTextField',
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
    errorMessagesColor: {
      type: String,
      default: '#ff0000',
    },
    required: {
      type: Boolean,
      default: false,
    },
    requiredBackgroundColor: {
      type: String,
      default: 'black',
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
        '--requiredBackgroundColor': this.requiredBackgroundColor,
        '--focusColor': this.focusColor,
        '--errorMessagesColor': this.errorMessagesColor,
        '--height': this.height,
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
.w-text-field {
  display: flex;
  flex-direction: column;

  &__label {
    font-weight: 600;
    color: #4c5163;
  }

  &__label--required {
    position: relative;

    &::after {
      content: '必須';
      position: absolute;
      margin-left: 8px;
      bottom: 3px;
      border-radius: 2px;
      background-color: var(--requiredBackgroundColor);
      font-size: 12px;
      text-align: center;
      color: white;
      line-height: 1;
      padding: 4px 8px;
      font-weight: 400;
    }
  }

  &__input {
    height: var(--height);
    border: 1px solid #9d9ea2;
    border-radius: 5px;
    padding: 0 16px;
    font-size: 16px;
    color: #4c5163;
    font-weight: 400;

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
