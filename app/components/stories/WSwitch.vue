<template>
  <div :id="id" class="w-switch" :class="classInner" :style="{ width }">
    <div>{{ title }}</div>
    <label class="w-switch__item" for="switch">
      <input
        type="checkbox"
        :name="name"
        class="w-switch__item__input"
        :checked="valueInner"
        :disabled="disabled"
      />
      <div
        class="w-switch__item__base"
        :style="customizeStyle"
        @click="click($event)"
      >
        <div class="w-switch__item__base__circle"></div>
      </div>
    </label>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'WSwitch',
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
    value: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'black',
    },
    width: {
      type: String,
      default: undefined,
    },
    uncheckedColor: {
      type: String,
      default: undefined,
    },
    checkedColor: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      valueInner: this.value,
      name: `w-switch${new Date().getTime()}`,
    }
  },
  computed: {
    ...mapGetters({
      getAttributeValue: 'theme/getAttributeValue',
    }),
    customizeStyle() {
      return {
        '--color__circle': this.checkedColor,
        '--color__base': this.checkedColor + '33',
        '--unselect-color__circle': this.uncheckedColor,
        '--unselect-base': this.uncheckedColor + '33',
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
    click($event) {
      if (this.disabled) {
        this.$emit('click', $event)
        this.$emit('input', this.valueInner)
      } else {
        this.valueInner = !this.valueInner
        this.$emit('click', $event)
        this.$emit('input', this.valueInner)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.w-switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0px;
  &__item {
    cursor: pointer;
    display: block;
    &__input {
      display: none;
    }
    &__base {
      position: relative;
      width: 60px;
      height: 1em;
      border-radius: 50px;
      position: relative;
      background: var(--unselect-base);
      &__circle {
        position: absolute;
        top: 50%;
        left: 0px;
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
        width: 30px;
        height: 30px;
        display: block;
        border-radius: 50px;
        background: var(--unselect-color__circle);
        box-shadow: 0 3px 12px -4px rgba(0, 0, 0, 0.3);
        -webkit-transition: 0.2s ease-out;
        transition: 0.2s ease-out;
        cursor: pointer;
      }
    }
    &__input:checked + &__base {
      background: var(--color__base);
      div {
        -webkit-transform: translate(100%, -50%);
        transform: translate(100%, -50%);
        left: auto;
        background: var(--color__circle);
      }
    }
    &__input:disabled + &__base {
      opacity: 0.5 !important;
    }
  }
}
</style>
