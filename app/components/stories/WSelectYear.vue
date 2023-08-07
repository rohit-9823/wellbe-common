<template>
  <div :id="id" class="w-select-year" :class="classInner" :style="{ width }">
    <label
      for="w-select-year"
      :style="customizeStyle"
      class="w-select-year__label"
      :class="{ 'w-select-year__label--required': required }"
      >{{ label }}</label
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <div
      class="w-select-year__content"
      :class="{
        'w-select-year__content--disabled': disabled,
        'w-select-year__content--error': error,
      }"
      :style="customizeStyle"
      @click="handleDialog"
    >
      <select
        class="w-select-year__content__select"
        :class="{
          'color-gray': value === -1 || !value,
          'w-select-year__content__select--error': error,
        }"
        :disabled="disabled"
        :required="required"
        :value="valueInner"
        @blur="blur"
        @change="change"
        @click="click"
        @focus="focus"
        @input="input"
        @mousedown="mousedown"
        @mouseup="mouseup"
      >
        <option
          v-if="placeholder"
          :value="-1"
          disabled
          class="w-select-year__option"
        >
          {{ placeholder }}
        </option>
        <option
          v-for="item in items"
          :key="item"
          :value="item * 1"
          class="w-select-year__option"
        >
          {{ `${item}年` }}
        </option>
      </select>
      <span class="w-select-year__content__focus"></span>
    </div>
    <div>
      <small v-if="!error">{{ '\xa0' }}</small>
      <small v-if="error" :style="errorMessagesStyle">{{
        errorMessages ? errorMessages : 'Error messages'
      }}</small>
    </div>
    <div
      v-show="isOpen"
      class="w-select-year__dialog"
      :style="customizeStyle"
      @click="handleDialog"
    >
      <div class="w-select-year__dialog__list">
        <div
          v-if="placeholder"
          :value="-1"
          class="w-select-year__dialog__list__option w-select-year__dialog__list__option--disabled"
          :class="{
            'w-select-year__dialog__list__option--disabled--checked':
              -1 === valueInner,
          }"
        >
          {{ placeholder }}
        </div>
        <div
          v-for="(item, index) in items"
          :key="index"
          :value="item * 1"
          class="w-select-year__dialog__list__option"
          :class="{
            'w-select-year__dialog__list__option--checked': item === valueInner,
          }"
          @click.stop="handleDialog($event, item * 1)"
        >
          {{ `${item}年` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WSelectYear',
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
    min: {
      type: [Number, String],
      default: new Date('1900').getFullYear(),
    },
    max: {
      type: [Number, String],
      default: new Date().getFullYear(),
    },
    value: {
      type: [Number, String],
      default: undefined,
    },
    placeholder: {
      type: String,
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
    textColor: {
      type: String,
      default: '#ffffff',
    },
    fontSize: {
      type: String,
      default: undefined,
    },
    fontWeight: {
      type: String,
      default: undefined,
    },
    backgroundColor: {
      type: String,
      default: 'black',
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
    color: {
      type: String,
      default: 'black',
    },
    closeDialogOnClickOutside: {
      type: Boolean,
      default: true,
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
    let valueInner
    if (this.placeholder) valueInner = -1
    if (this.value) valueInner = this.value * 1
    return {
      valueInner,
      isOpen: false,
    }
  },
  computed: {
    items() {
      return this.creatItems()
    },
    customizeStyle() {
      return {
        '--textColor': this.textColor,
        '--fontSize': this.fontSize,
        '--fontWeight': this.fontWeight,
        '--backgroundColor': this.backgroundColor,
        '--requiredBackgroundColor': this.requiredBackgroundColor,
        '--color': this.color,
        '--errorMessagesColor': this.errorMessagesColor,
        '--height': this.height,
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
        this.valueInner = newValue * 1
      },
      deep: true,
    },
  },
  methods: {
    handleDialog($event, newValue) {
      if (this.closeDialogOnClickOutside) {
        this.isOpen = !this.isOpen
        if (newValue) {
          this.input($event, newValue)
        }
      } else {
        this.isOpen = true
        if (newValue) {
          this.input($event, newValue)
          this.isOpen = false
        }
      }
    },
    creatItems() {
      const length = this.max * 1 - this.min * 1
      const allYear = []
      let baseYear = this.min * 1
      allYear.push(baseYear)
      for (let i = 0; i < length; i++) {
        baseYear++
        allYear.push(baseYear)
      }
      return allYear
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
    input($event, newValue) {
      if (!newValue) {
        newValue = $event.target.value
      }
      this.valueInner = newValue
      this.$emit('input', newValue * 1, $event)
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
.color-gray {
  color: #757575;
}
.w-select-year {
  display: flex;
  flex-direction: column;
  &__label {
    display: flex;
    align-items: center;
    font-weight: bolder;
  }
  &__label--required {
    position: relative;
  }
  &__label--required::after {
    content: '必須';
    margin-left: 8px;
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
    height: var(--height);
    border: 1px solid black;
    border-radius: 2px;
    padding: 0 5px;
    position: relative;
    background-color: var(--backgroundColor);
    align-items: center;
    display: inline-flex;
    &--disabled {
      background-color: rgba(239, 239, 239, 0.3);
      color: rgb(84, 84, 84);
    }
    &--error {
      border: 1px solid var(--errorMessagesColor);
    }
    &__select {
      height: var(--height);
      appearance: none;
      background-color: transparent;
      border: none;
      width: 100%;
      cursor: pointer;
      outline: none;
      padding-inline-start: 1px;
      &:disabled {
        color: unset;
        opacity: 1;
        border-color: unset;
      }
    }
    &::after {
      content: '▾';
      font-size: 1rem;
      justify-self: end;
    }
    &__select:focus + &__focus {
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border: 1px solid var(--color);
      border-radius: inherit;
    }
    &__select--error:focus + &__focus {
      border: 1px solid var(--errorMessagesColor);
    }
  }
  &__option {
    display: none;
  }
  &__dialog {
    z-index: 99;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    &__list {
      background-color: #ffffff;
      overflow-y: scroll;
      height: 30vh;
      box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%),
        0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
      border-radius: 4px;
      position: fixed;
      width: 90%;
      bottom: 3%;
      left: 5%;
      &__option {
        background-color: #ffffff;
        height: 48px;
        line-height: 48px;
        padding: 0 16px;
        cursor: pointer;
        &:hover {
          background-color: #ebecf0;
        }
        &--checked {
          background-color: var(--color);
          color: #ffffff;
          &:hover {
            background-color: var(--color);
            color: #ffffff;
          }
          &::before {
            content: '✓︎';
          }
        }
        &--disabled {
          color: #b3b7bd;
          cursor: unset !important;
          &:hover {
            background-color: unset !important;
          }
          &--checked::before {
            content: '✓︎ ';
          }
        }
      }
    }
  }
}
</style>
