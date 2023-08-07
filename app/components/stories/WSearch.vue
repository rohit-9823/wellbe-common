<template>
  <div :id="id" class="w-search" :class="classInner" :style="customizeStyle">
    <font-awesome-icon
      class="w-search__icon"
      :style="{ color: searchIconColor }"
      :icon="['fa', 'magnifying-glass']"
      @click="clickSearchIcon"
    />
    <input
      type="text"
      class="w-search__input"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="valueInner"
      @blur="blur"
      @change="change"
      @click="click"
      @focus="focus"
      @input="input"
      @keydown="keydown"
      @keyup="keyup"
      @mousedown="mousedown"
      @mouseup="mouseup"
    />
    <font-awesome-icon
      class="w-search__icon"
      :style="{ color: clearIconColor }"
      :icon="['fa', 'circle-xmark']"
      @click="clickClearIcon"
    />
  </div>
</template>

<script>
export default {
  name: 'WSearch',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    classInner: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    backgroundColor: {
      type: String,
      default: '#ebecf0',
    },
    searchIconColor: {
      type: String,
      default: 'black',
    },
    clearIconColor: {
      type: String,
      default: 'black',
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
    return {
      valueInner: this.value,
    }
  },
  computed: {
    customizeStyle() {
      return {
        '--backgroundColor': this.backgroundColor,
        '--width': this.width,
        '--height': this.height,
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
    input($event) {
      const newValue = $event.target.value
      this.valueInner = newValue
      this.$emit('input', newValue, $event)
    },
    keydown($event) {
      this.$emit('keydown', $event)
    },
    keyup($event) {
      this.$emit('keyup', $event)
    },
    mousedown($event) {
      this.$emit('mousedown', $event)
    },
    mouseup($event) {
      this.$emit('mouseup', $event)
    },
    clickSearchIcon($event) {
      this.$emit('clickSearchIcon', $event)
    },
    clickClearIcon($event) {
      this.$emit('clickClearIcon', $event)
    },
  },
}
</script>

<style lang="scss" scoped>
.w-search {
  background-color: var(--backgroundColor);
  border-radius: 2px;
  display: flex;
  align-items: center;
  width: var(--width);
  &__icon {
    margin: 0 10px;
    cursor: pointer;
  }
  &__input {
    background-color: var(--backgroundColor);
    flex: 1;
    border: unset;
    border-radius: 2px;
    height: var(--height);
    padding: 0 5px;
    &:focus {
      outline: none;
    }
  }
}
</style>
