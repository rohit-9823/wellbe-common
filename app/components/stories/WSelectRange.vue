<template>
  <div :id="id" class="w-select-range" :class="classInner" :style="{ width }">
    <label
      for="w-select"
      :style="customizeStyle"
      class="w-select-range__label"
      :class="{ 'w-select-range__label--required': required }"
      >{{ label }}</label
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <div
      class="w-select-range__content"
      :class="{
        'w-select-range__content--disabled': disabled,
        'w-select-range__content--error': error,
      }"
    >
      <select
        class="w-select-range__content__select"
        :class="{
          'color-gray': value === '-1' || !value,
          'w-select-range__content__select--error': error,
        }"
        :style="customizeStyle"
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
        {{
          valueInner
        }}
        <option
          v-if="placeholder"
          :value="-1"
          :disabled="disabledFirst"
          class="w-select-range__option"
        >
          {{ placeholder }}
        </option>
        <option
          v-for="(item, index) in localItems"
          :key="index"
          :value="item.value"
          class="w-select-range__option"
          :selected="isSelected(item)"
        >
          {{ showItemValue(item) }}
        </option>
      </select>
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
  name: 'WSelectRange',
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
    disabledFirst: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
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
    required: {
      type: Boolean,
      default: false,
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
      default: '48px',
    },
    width: {
      type: String,
      default: undefined,
    },
    dataType: {
      type: Object,
      default: undefined,
    },
    ...sharedProps,
  },
  data() {
    let valueInner
    let localItems
    if (this.placeholder) valueInner = '-1'
    if (this.value) valueInner = this.value + ''

    if (!this.value) valueInner = '-1'

    if (this.items) localItems = this.items
    return {
      valueInner,
      localItems,
    }
  },
  computed: {
    customizeStyle() {
      return {
        '--color': this.color,
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
      }
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.valueInner = newValue + ''
      },
      deep: true,
    },
  },
  mounted() {
    if (this.dataType != null) {
      const range = this.dataType.range
      let start = parseInt(range.start)
      const interval = parseFloat(range.interval)
      const end = parseInt(range.end)

      const item = []

      item.push({
        label: '',
        value: -1,
      })

      while (start <= end) {
        item.push({
          label: start,
          value: start,
        })
        start += interval
      }

      this.localItems = item
    }
  },
  methods: {
    blur($event) {
      this.$emit('blur', $event)
    },
    isSelected(item) {
      return String(item.value) === String(this.valueInner)
    },
    showItemValue(item) {
      return item.name ? item.name : item.label
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
      this.$emit('input', newValue + '', $event)
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
.w-select-range {
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
    margin-left: -16px;
    margin-right: -16px;
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

  &__content {
    height: var(--height);
    align-items: center;
    display: inline-flex;
    position: relative;
    background-color: var(--contentBackgroundColor);
    font-size: var(--contentFontSize);
    color: var(--contentFontColor);
    font-weight: var(--contentFontWeight);
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

    &--disabled {
      background-color: rgba(239, 239, 239, 0.3);
      color: rgb(84, 84, 84);
    }

    &--error {
      border: 1px solid var(--errorMessagesColor);
    }

    &__select {
      appearance: none;
      height: var(--height);
      width: 100%;
      padding: 0 16px;
      outline: none;
      border-color: #9d9ea2;
      font-size: 16px;
      color: #4c5163;
      font-weight: 400;
      background-color: #fff;
      border-radius: 5px;

      &:disabled {
        color: unset;
        opacity: 1;
        border-color: unset;
      }

      &:focus {
        border: 1px solid var(--color);
        border-radius: 5px;
        outline: none;
      }

      &--error {
        border: 1px solid var(--errorMessagesColor);
      }
    }

    //&__select--error:focus + &__focus {
    //  border: 1px solid var(--errorMessagesColor);
    //}
  }
}
</style>
