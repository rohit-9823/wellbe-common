<template>
  <div :id="id" class="w-radio-group" :class="classInner" :style="{ width }">
    <span
      class="w-radio-group__title"
      :class="{ 'w-radio-group__title--required': required }"
      :style="customizeStyle"
      >{{ label }}</span
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <div class="w-radio-group__content" :style="customizeStyle">
      <template v-for="(item, index) in items">
        <label :key="index" class="w-radio-group__content__label">
          <input
            type="radio"
            :name="name"
            class="w-radio-group__content__input"
            :disabled="disabled"
            :required="required"
            :style="customizeStyle"
            :value="item.value"
            :checked="
              valueInner === item.value || valueInner === parseInt(item.value)
            "
            @change="change"
            @click="click"
            @input="input"
            @mousedown="mousedown"
            @mouseup="mouseup"
          />
          <div class="w-radio-group__content__radio"></div>
          {{ item.label }}
        </label>
      </template>
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
import { sanitizer } from '@/utils/sanitizer'
import { sharedProps } from '@/utils/constants'

export default {
  name: 'WRadioGroup',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    title: {
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
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
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
    labelBold: {
      type: String,
      default: undefined,
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
    width: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: `w-radio-group${new Date().getTime()}` + Math.random(),
    },
    selectedUncheckedColor: {
      type: String,
      default: '#9d9ea3',
    },
    isStateStore: {
      type: Boolean,
      default: false,
    },
    ...sharedProps,
  },
  data() {
    return {
      valueInner: parseInt(this.value),
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
  mounted() {
    if (this.isStateStore)
      this.$store.dispatch('component-value-store/setIdInComponentList', {
        part_value: sanitizer.validateValue(
          this.value,
          this.componentReturnType
        ),
        part_id: this.id,
      })
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

      if (this.isStateStore)
        this.$store.dispatch(
          'component-value-store/updateCheckboxIconListValueById',
          {
            part_value: sanitizer.validateValue(
              newValue * 1,
              this.componentReturnType
            ),
            part_id: this.id,
          }
        )
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
.w-radio-group {
  display: flex;
  flex-direction: column;

  &__title {
    font-size: var(--fontSizeLabel);
    font-weight: var(--fontWeightLabel);
    color: var(--fontColorLabel);
    background-color: var(--backgroundColorLabel);
    padding: 0 16px;
    margin-left: -16px;
    margin-right: -16px;
  }

  &__title--required {
    position: relative;
  }

  &__title--required::after {
    content: '必須';
    position: absolute;
    margin-left: 8px;
    bottom: 0;
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
    display: flex;
    flex-direction: column;
    background-color: var(--contentBackgroundColor);
    font-size: var(--contentFontSize);
    color: var(--contentFontColor);
    font-weight: var(--contentFontWeight);

    &__label {
      margin: 0.5em 0px;
      cursor: pointer;
      font-size: var(--contentFontSize);
      color: var(--contentFontColor);
      font-weight: var(--contentFontWeight);
      display: flex;
    }

    &__input {
      accent-color: var(--selectedButtonColor);
      cursor: pointer;
      display: none;
      + .w-radio-group__content__radio {
        width: 24px;
        height: 24px;
        position: relative;
        margin-right: 10px;
        cursor: pointer;
        &::before {
          content: '';
          width: 24px;
          height: 24px;
          border: 2px solid var(--selectedUncheckedColor);
          border-radius: 50%;
          display: block;
        }
        &::after {
          content: '';
          width: 12px;
          height: 12px;
          background-color: var(--selectedUncheckedColor);
          border-radius: 50%;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      &:checked {
        + .w-radio-group__content__radio {
          &::before {
            border-color: var(--selectedButtonColor);
          }
          &::after {
            background-color: var(--selectedButtonColor);
          }
        }
      }
    }
  }
}
</style>
