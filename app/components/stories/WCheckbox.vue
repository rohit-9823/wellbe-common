<template>
  <form :id="id" class="w-checkbox" :class="classInner" :style="{ width }">
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <label
      :style="customizeStyle"
      :class="{ 'w-checkbox__title--required': required }"
    ></label>
    <div class="w-checkbox__content" :style="customizeStyle">
      <label class="w-checkbox__content__label">
        {{ label }}
        <input
          type="checkbox"
          :name="name"
          class="w-checkbox__content__input"
          :disabled="disabled"
          :required="required"
          :value="value"
          :checked="checked(value)"
          @change="change"
          @click="click"
          @input="input($event)"
          @mousedown="mousedown"
          @mouseup="mouseup"
        />
        <div class="w-checkbox__content__checkbox"></div>
      </label>
    </div>
    <div>
      <small v-if="!error">{{ '\xa0' }}</small>
      <small v-if="error" :style="errorMessagesStyle">{{
        errorMessages ? errorMessages : 'Error messages'
      }}</small>
    </div>
  </form>
</template>

<script>
import { sharedProps } from '@/utils/constants'

export default {
  name: 'WCheckbox',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    label: {
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
    item: {
      type: Object,
      default: () => {},
    },
    value: {
      type: String,
      default: () => null,
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
    selectedButtonColor: {
      type: String,
      default: 'black',
    },
    selectedUncheckedColor: {
      type: String,
      default: '#9d9ea3',
    },
    width: {
      type: String,
      default: undefined,
    },
    ...sharedProps,
  },
  data() {
    return {
      valueInner: this.value,
      name: `w-checkbox${new Date().getTime()}`,
    }
  },
  computed: {
    customizeStyle() {
      return {
        '--selectedButtonColor': this.selectedButtonColor,
        '--selectedUncheckedColor': this.selectedUncheckedColor,
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
    checked(value) {
      const v = !this.valueIsNullOrEmpty(value) ? parseInt(value) : 0
      if (v === 0) {
        return false
      } else {
        return true
      }
    },
    valueIsNullOrEmpty(value) {
      return value === null || value === ''
    },
    change($event) {
      this.$emit('change', $event)
    },
    click($event) {
      this.$emit('click', $event)
    },
    input($event) {
      if ($event.target.checked) {
        this.valueInner = '1'
      } else {
        this.valueInner = '0'
      }
      this.$emit('input', this.valueInner)
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
.labelRight {
  ::v-deep(.w-checkbox__content__label) {
    flex-direction: row-reverse;
    justify-content: flex-end;

    .w-checkbox__content__checkbox {
      margin-right: 6px;
    }
  }
}

.w-checkbox {
  display: flex;
  flex-direction: column;

  &__title {
    font-size: var(--fontSizeLabel);
    font-weight: var(--fontWeightLabel);
    color: var(--fontColorLabel);
    background-color: var(--backgroundColorLabel);
  }

  &__title--required {
    position: relative;
  }

  &__title--required::after {
    content: '必須';
    position: relative;
    bottom: 3px;
    border-radius: 2px;
    text-align: center;
    line-height: 1;
    padding: 4px 0px;
    color: var(--fontColorRequiredLabel);
    font-size: var(--fontSizeRequiredLabel);
    font-weight: var(--fontWeightRequiredLabel);
    background-color: var(--backgroundColorRequiredLabel);
  }

  &__content {
    display: flex;
    flex-direction: column;
    background-color: var(--contentBackgroundColor);
    font-size: var(--contentFontSize);
    color: var(--contentFontColor);
    font-weight: var(--contentFontWeight);

    &__label {
      margin: 0.5em 0px;
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--contentFontSize);
      color: var(--contentFontColor);
      font-weight: var(--contentFontWeight);
    }

    &__input {
      accent-color: var(--selectedButtonColor);
      cursor: pointer;
      width: 2em;
      height: 2em;
      display: none;

      + .w-checkbox__content__checkbox {
        width: 32px;
        height: 32px;
        border: 1px solid var(--selectedUncheckedColor);
        border-radius: 5px;
        position: relative;
        cursor: pointer;
      }

      &:checked {
        + .w-checkbox__content__checkbox {
          border-color: var(--selectedButtonColor);
          background-color: var(--selectedButtonColor);

          &::before {
            content: '';
            width: 2px;
            height: 10px;
            background: #fff;
            border-radius: 10px;
            position: absolute;
            top: 13px;
            left: 8px;
            transform: rotate(-45deg);
          }

          &::after {
            content: '';
            width: 2px;
            height: 20px;
            background: #fff;
            border-radius: 10px;
            position: absolute;
            top: 5px;
            left: 18px;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
}
</style>
