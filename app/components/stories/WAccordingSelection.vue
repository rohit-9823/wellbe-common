<template>
  <form
    :id="id"
    class="w-according-selection"
    :class="classInner"
    :style="{ width }"
  >
    <span
      class="w-according-selection__title"
      :class="{ 'w-according-selection__title--required': required }"
      :style="customizeStyle"
      >{{ title }}</span
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <div class="w-according-selection__content">
      <template v-for="(item, index) in items">
        <label :key="index" class="w-according-selection__content__label">
          <input
            type="radio"
            :name="name"
            class="w-according-selection__content__input"
            :disabled="disabled"
            :required="required"
            :style="customizeStyle"
            :value="index"
            :checked="valueInner === index"
            @change="change"
            @click="click"
            @input="input"
            @mousedown="mousedown"
            @mouseup="mouseup"
          />
          {{ item }}
        </label>
      </template>
    </div>
    <input
      type="text"
      class="w-according-selection__input"
      :class="{
        'w-according-selection__input--error': errorMessageDisplay === 'unset',
      }"
      :disabled="filterDisabled"
      :required="required"
      :placeholder="placeholder"
      :style="customizeStyle"
      :value="textInner"
      @change="change"
      @click="click"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @blur="blur"
      @focus="focus"
      @keydown="keydown"
      @keyup="keyup"
    />
    <small v-if="errorMessageDisplay === 'none'">{{ '\xa0' }}</small>
    <small :style="errorMessagesStyle">{{
      errorMessages ? errorMessages : 'Error messages'
    }}</small>
  </form>
</template>

<script>
export default {
  name: 'WAccordingSelection',
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
    disabled: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: undefined,
    },
    text: {
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
    selectedButtonColor: {
      type: String,
      default: 'black',
    },
    focusColor: {
      type: String,
      default: 'black',
    },
    height: {
      type: String,
      default: '2.5em',
    },
    width: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      name: `w-according-selection${new Date().getTime()}`,
      valueInner: this.value,
      textInner: this.text,
      errorMessageDisplay: 'none',
    }
  },
  computed: {
    customizeStyle() {
      return {
        '--requiredBackgroundColor': this.requiredBackgroundColor,
        '--selectedButtonColor': this.selectedButtonColor,
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
    filterDisabled() {
      if (this.disabled) return true
      if (this.valueInner !== 0) return true
      return false
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.valueInner = newValue
      },
      deep: true,
    },
    text: {
      handler(newValue) {
        this.textInner = newValue
      },
      deep: true,
    },
  },
  methods: {
    change($event) {
      this.$emit('change', $event)
    },
    click($event) {
      this.$emit('click', $event)
    },
    input($event) {
      const newValue = $event.target.value
      this.valueInner = newValue
      this.$emit('input', newValue * 1, $event)
    },
    mousedown($event) {
      this.$emit('mousedown', $event)
    },
    mouseup($event) {
      this.$emit('mouseup', $event)
    },
    blur($event) {
      this.$emit('blur', $event)
    },
    focus($event) {
      this.$emit('focus', $event)
    },
    keydown($event) {
      this.$emit('keydown', $event)
    },
    keyup($event) {
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
      this.textInner = newValue
      this.$emit('keyup', $event)
    },
  },
}
</script>

<style lang="scss" scoped>
.w-according-selection {
  display: flex;
  flex-direction: column;
  &__title {
    font-weight: bolder;
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
    background-color: var(--requiredBackgroundColor);
    font-size: 12px;
    text-align: center;
    color: white;
    line-height: 1;
    padding: 4px 8px;
    font-weight: 400;
  }
  &__content {
    display: flex;
    flex-direction: column;
    &__label {
      margin: 0.5em 0px;
      cursor: pointer;
    }
    &__input {
      accent-color: var(--selectedButtonColor);
      cursor: pointer;
    }
  }
  &__input {
    height: var(--height);
    border: 1px solid black;
    border-radius: 2px;
    padding: 0 5px;
    &:focus {
      padding: 0 5px;
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
}
</style>
