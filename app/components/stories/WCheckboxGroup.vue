<template>
  <form
    :id="id"
    class="w-checkbox-group"
    :class="classInner"
    :style="{ width }"
  >
    <span
      class="w-checkbox-group__title"
      :class="{ 'w-checkbox-group__title--required': required }"
      :style="customizeStyle"
      >{{ label }}</span
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <div class="w-checkbox-group__content">
      <template v-for="(item, index) in items">
        <label :key="index" class="w-checkbox-group__content__label">
          {{ item.label }}
          <input
            type="checkbox"
            :name="name"
            class="w-checkbox-group__content__input"
            :disabled="disabled"
            :required="required"
            :style="customizeStyle"
            :value="item.value"
            :checked="checked(item.value)"
            @change="change"
            @click="click"
            @input="input($event, item.value)"
            @mousedown="mousedown"
            @mouseup="mouseup"
          />
          <div
            class="w-checkbox-group__content__checkbox"
            :style="customizeStyle"
          ></div>
        </label>
      </template>
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
export default {
  name: 'WCheckboxGroup',
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
    labelFontColor: {
      type: String,
      default: '#4c5163',
    },
    selectedUncheckedColor: {
      type: String,
      default: '#9d9ea3',
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
    width: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      valueInner: this.value,
      name: `w-checkbox-group${new Date().getTime()}`,
    }
  },
  computed: {
    customizeStyle() {
      return {
        '--requiredBackgroundColor': this.requiredBackgroundColor,
        '--selectedButtonColor': this.selectedButtonColor,
        '--selectedUncheckedColor': this.selectedUncheckedColor,
        '--textColor': this.textColor,
        '--fontSize': this.fontSize,
        '--fontColor': this.labelFontColor,
        '--fontWeight': this.fontWeight,
        '--backgroundColor': this.backgroundColor,
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
      if (
        this.valueInner.length > 0 &&
        this.valueInner.findIndex((item) => item === value) !== -1
      ) {
        return true
      }
      return false
    },
    change($event) {
      this.$emit('change', $event)
    },
    click($event) {
      this.$emit('click', $event)
    },
    input($event, checkedValue) {
      let newAry = [...this.valueInner]
      if ($event.target.checked) {
        newAry.push(checkedValue)
      } else {
        newAry = this.valueInner.filter((x) => x !== checkedValue)
      }
      this.valueInner = newAry
      this.$emit('input', this.valueInner, $event)
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
  ::v-deep(.w-checkbox-group__content__label) {
    padding-top: 10px;
    flex-direction: row-reverse;
    justify-content: flex-end;

    .w-checkbox-group__content__checkbox {
      margin-right: 6px;
    }
  }
}

.w-checkbox-group {
  display: flex;
  flex-direction: column;

  &__title {
    font-size: 16px;
    color: var(--fontColor);
    font-weight: 600;
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
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      color: var(--fontColor);
      font-weight: 400;
    }

    &__input {
      accent-color: var(--selectedButtonColor);
      cursor: pointer;
      width: 2em;
      height: 2em;
      display: none;

      + .w-checkbox-group__content__checkbox {
        width: 32px;
        height: 32px;
        border: 1px solid var(--selectedUncheckedColor);
        border-radius: 5px;
        position: relative;
        cursor: pointer;
      }

      &:checked {
        + .w-checkbox-group__content__checkbox {
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
