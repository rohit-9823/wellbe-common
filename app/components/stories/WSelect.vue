<template>
  <div :id="id" class="w-select" :class="classInner" :style="{ width }">
    <label
      for="w-select"
      :style="customizeStyle"
      class="w-select__label"
      :class="{ 'w-select__label--required': required }"
      >{{ label }}</label
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <div
      class="w-select__content"
      :class="{
        'w-select__content--disabled': disabled,
        'w-select__content--error': error,
      }"
    >
      <select
        class="w-select__content__select"
        :class="{
          'color-gray': value === '-1' || !value,
          'w-select__content__select--error': error,
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
        <option
          v-if="placeholder"
          :value="-1"
          :disabled="disabledFirst"
          class="w-select__option"
        >
          {{ placeholder }}
        </option>
        <option
          v-for="(item, index) in localItems"
          :key="index"
          :value="item.value"
          class="w-select__option"
          :selected="valueInner === item.value"
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
import moment from 'moment'
import { sharedProps } from '@/utils/constants'

export default {
  name: 'WSelect',
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
    if (this.items) localItems = this.items
    return {
      valueInner,
      localItems,
    }
  },
  computed: {
    customizeStyle() {
      return {
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
      const timeRange = this.dataType.time_range
      const item = []
      let data = {}

      item.push({
        label: '',
        value: -1,
      })

      for (let i = 0; i <= 26; i++) {
        data =
          moment('1991-01-01 ' + timeRange.start_time)
            .add(timeRange.interval_in_minutes * i, 'minutes')
            .format('HH:mm') + ''
        item.push({
          label: data,
          value: data + ':00',
        })
      }
      this.localItems = item
    }
  },
  methods: {
    blur($event) {
      this.$emit('blur', $event)
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
.w-select {
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
      padding: 0 26px 0 16px;
      outline: none;
      border-color: #9d9ea2;
      font-size: 16px;
      color: #4c5163;
      font-weight: 400;
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;
      flex: 1;
      width: 100%;

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
