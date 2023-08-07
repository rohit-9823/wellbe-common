<template>
  <form :id="id" class="w-checkbox-week" :class="classInner" :style="{ width }">
    <span
      class="w-checkbox-week__title"
      :class="{ 'w-checkbox-week__title--required': required }"
      :style="customizeStyle"
      >{{ title }}</span
    >
    <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
      hintMessages
    }}</small>
    <div class="w-checkbox-week__content">
      <template v-for="item in items">
        <label :key="item.value" class="w-checkbox-week__content__label">
          <input
            type="checkbox"
            :name="name"
            class="w-checkbox-week__content__input"
            :disabled="disabled"
            :required="required"
            :style="customizeStyle"
            :value="item.value"
            :checked="checked(item.value)"
            @change="change"
            @click="click"
            @input="input"
            @mousedown="mousedown"
            @mouseup="mouseup"
          />
          <div
            class="w-checkbox-week__content__checkbox"
            :style="customizeStyle"
          ></div>
          <div style="line-height: 1">{{ item.text }}</div>
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
  name: 'WCheckboxWeek',
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
    firstDayOfWeek: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    width: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      valueInner: this.value,
      name: `w-checkbox-week${new Date().getTime()}`,
    }
  },
  computed: {
    items() {
      const items = []
      const weekDays = ['日', '月', '火', '水', '木', '金', '土']
      for (let i = this.firstDayOfWeek; i < this.firstDayOfWeek + 7; i++) {
        const weekDay = weekDays[i % 7]
        items.push({
          value: i % 7,
          text: weekDay,
        })
      }
      return items
    },
    customizeStyle() {
      return {
        '--requiredBackgroundColor': this.requiredBackgroundColor,
        '--selectedButtonColor': this.selectedButtonColor,
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
      if (this.valueInner.findIndex((item) => item === value) !== -1) {
        return true
      } else {
        return false
      }
    },
    change($event) {
      this.$emit('change', $event)
    },
    click($event) {
      this.$emit('click', $event)
    },
    input($event) {
      let newAry = [...this.valueInner]
      if ($event.target.checked) {
        newAry.push($event.target.value * 1)
      } else {
        newAry = this.valueInner.filter((v) => v !== $event.target.value * 1)
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
.w-checkbox-week {
  display: flex;
  flex-direction: column;
  &__title {
    font-size: 16px;
    color: #4c5163;
    font-weight: 600;
    margin-bottom: 10px;
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
    justify-content: space-between;
    &__label {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      color: #4c5163;
    }
    &__input {
      accent-color: var(--selectedButtonColor);
      cursor: pointer;
      display: none;
      + .w-checkbox-week__content__checkbox {
        width: 32px;
        height: 32px;
        border: 1px solid #9d9ea3;
        border-radius: 5px;
        position: relative;
        cursor: pointer;
        margin-bottom: 8px;
      }
      &:checked {
        + .w-checkbox-week__content__checkbox {
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
