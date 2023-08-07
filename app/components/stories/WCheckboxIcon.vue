<template>
  <div :id="id" class="w-checkbox-icon" :class="classInner" :style="{ width }">
    <label
      for="w-checkbox-icon-icon"
      :class="{ 'w-checkbox-icon__label--required': required }"
      :style="customizeStyle"
    />
    <div v-if="label" class="w-checkbox-icon__container">
      <button
        class="w-checkbox-icon__container__button"
        :class="{ 'w-checkbox-icon__container__active': isSelected }"
        @click="onClick()"
      >
        {{ label }}
      </button>
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
  name: 'WCheckboxIcon',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    classInner: {
      type: String,
      default: undefined,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '1',
    },
    label: {
      type: String,
      default: undefined,
    },
    length: {
      type: Number,
      default: 5,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    width: {
      type: String,
      default: undefined,
    },
    ...sharedProps,
  },
  data() {
    return {
      valueInner: this.value != null ? parseInt(this.value) : 0,
      isDragging: false,
      dragWidth: null,
      offset: null,
      isSelected: this.value === '1',
    }
  },
  computed: {
    customizeStyle() {
      return {
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
        this.valueInner = newValue != null ? parseInt(newValue) : 0
      },
      deep: true,
    },
  },
  mounted() {
    this.bindListener()
    this.$store.dispatch('component-value-store/setIdInComponentList', {
      part_value: this.value,
      part_id: this.id,
    })
  },
  methods: {
    onClick() {
      this.isSelected = !this.isSelected

      this.$store.dispatch(
        'component-value-store/updateCheckboxIconListValueById',
        {
          part_value: this.isSelected ? '1' : '0',
          part_id: this.id,
        }
      )

      this.$emit('checkboxIconClicked')
    },
    bindListener() {
      document.addEventListener('mousemove', this.drag)
      document.addEventListener('mouseup', this.dragEnd)
      document.addEventListener('touchmove', this.drag)
      document.addEventListener('touchend', this.dragEnd)
      window.addEventListener('resize', this.setDragWidth)
    },
  },
}
</script>

<style lang="scss" scoped>
.w-checkbox-icon {
  display: flex;
  flex-direction: column;

  &__container {
    font-size: var(--fontSizeLabel);
    font-weight: var(--fontWeightLabel);
    color: var(--fontColorLabel);
    padding: 0 0 2px 2px;

    &__button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      height: 50px;
      width: 110px;
      border-radius: 10px;
      background-color: white;
      border: 1px solid #66b7d2;
      color: black;
      font-size: 14px;
    }

    &__active {
      background-color: #00bfff !important;
      color: white;
    }
  }

  &__label {
    display: flex;
    align-items: center;
    font-size: var(--fontSizeLabel);
    font-weight: var(--fontWeightLabel);
    color: var(--fontColorLabel);
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

  &__btn {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer / Edge */
    user-select: none;
    /* Non-prefixed version */
  }
}
</style>
