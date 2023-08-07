<template>
  <div :id="id" class="w-date-picker" :class="classInner" :style="{ width }">
    <button
      class="w-date-picker__button"
      :style="customizeStyle"
      :disabled="preBtnDisabled"
      @click="preDate($event)"
    >
      <span> &lt; </span>
      <!--      todo : add font awesome icons later-->
      <!--      <font-awesome-icon :icon="['fas', 'angle-left']" />-->
    </button>
    <div class="w-date-picker__date">
      <span>{{ addBeforeText }}</span
      >{{ '\xa0\xa0' }}{{ displayDate }}{{ '\xa0\xa0'
      }}<span>{{ addAfterText }}</span>
    </div>
    <button
      class="w-date-picker__button"
      :style="customizeStyle"
      :disabled="nextBtnDisabled"
      @click="nextDate($event)"
    >
      <span> &gt; </span>
      <!--      todo : add font awesome icons later-->
      <!--      <font-awesome-icon :icon="['fas', 'angle-right']" />-->
    </button>
  </div>
</template>

<script>
import { formatDate, formatDateToYmd } from '~/utils/const'

export default {
  name: 'WDatePickerContainer',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    classInner: {
      type: String,
      default: undefined,
    },
    value: {
      type: [String, Number, Date],
      default: undefined,
    },
    showWeekDay: {
      type: Boolean,
      default: false,
    },
    addBeforeText: {
      type: String,
      default: undefined,
    },
    addAfterText: {
      type: String,
      default: undefined,
    },
    preBtnDisabled: {
      type: Boolean,
      default: false,
    },
    nextBtnDisabled: {
      type: Boolean,
      default: false,
    },
    backgroundFocusColor: {
      type: String,
      default: '#dddddd',
    },
    textFocusColor: {
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
      valueInner: new Date(this.value),
    }
  },
  computed: {
    customizeStyle() {
      return {
        '--backgroundFocusColor': this.backgroundFocusColor,
        '--textFocusColor': this.textFocusColor,
      }
    },
    displayDate() {
      return formatDate(this.valueInner, this.showWeekDay)
    },
  },
  watch: {
    value: {
      handler(value) {
        this.valueInner = new Date(value)
      },
      deep: true,
    },
  },
  methods: {
    preDate($event) {
      const newDate = new Date(new Date(this.valueInner).getTime() - 86400000)
      this.valueInner = newDate
      this.$emit('click', $event)
      this.$emit('input', formatDateToYmd(newDate))
    },
    nextDate($event) {
      const newDate = new Date(new Date(this.valueInner).getTime() + 86400000)
      this.valueInner = newDate
      this.$emit('click', $event)
      this.$emit('input', formatDateToYmd(newDate))
    },
  },
}
</script>

<style lang="scss" scoped>
.w-date-picker {
  display: flex;
  align-items: center;

  &__button {
    width: 36px;
    height: 36px;
    background-color: transparent;
    border-style: none;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: var(--backgroundFocusColor);
      color: var(--textFocusColor);
    }
  }

  &__date {
    flex: 1;
    text-align: center;
  }
}
</style>
