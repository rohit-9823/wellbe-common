<template>
  <div :id="id" class="w-step" :class="classInner" :style="{ width }">
    <div class="w-step__content" :style="customizeStyle">
      <div
        v-for="index in lengthInner"
        :key="index"
        style="display: flex; flex: 1"
      >
        <div v-if="valueInner > index" class="w-step__content__item">
          <div class="w-step__content__circle w-step__content__circle--done">
            <font-awesome-icon :icon="['fa', 'check']" />
          </div>
          <div class="w-step__content__item__text">{{ items[index - 1] }}</div>
        </div>
        <div v-if="valueInner === index" class="w-step__content__item">
          <div
            class="w-step__content__circle w-step__content__circle--active"
          ></div>
          <div class="w-step__content__item__text">{{ items[index - 1] }}</div>
        </div>
        <div v-if="valueInner < index" class="w-step__content__item">
          <div class="w-step__content__circle"></div>
          <div class="w-step__content__item__text">{{ items[index - 1] }}</div>
        </div>
        <div
          v-if="valueInner > index"
          class="w-step__content__line w-step__content__line--done"
        ></div>
        <div v-if="valueInner <= index" class="w-step__content__line"></div>
      </div>
      <div class="w-step__content__item">
        <div
          class="w-step__content__circle"
          :class="{ 'w-step__content__circle--active': value >= length }"
        ></div>
        <div class="w-step__content__item__text">{{ items[length - 1] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WStep',
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
      type: Number,
      default: 1,
    },
    length: {
      type: Number,
      default: 3,
    },
    items: {
      type: Array,
      default: () => [],
    },
    color: {
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
    }
  },
  computed: {
    lengthInner() {
      return this.length <= 3 ? 2 : this.length - 1
    },
    customizeStyle() {
      return {
        '--color': this.color,
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
}
</script>

<style lang="scss" scoped>
.w-step {
  &__content {
    display: flex;
    justify-content: space-between;
    &__item {
      width: 70px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      text-align: center;
      &__text {
        height: 48px;
        font-size: 0.5em;
        width: 6em;
        overflow: hidden;
        margin-top: 10px;
        white-space: pre-wrap;
      }
    }
    &__circle {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #ebecf0;
      z-index: 1;
      &--done {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        background-color: var(--color);
        filter: brightness(1.2);
        opacity: 0.7;
      }
      &--active {
        background-color: var(--color);
      }
    }
    &__line {
      height: 2px;
      width: 100%;
      flex: 1;
      background-color: #ebecf0;
      margin: 12px -24px;
      &--done {
        background-color: var(--color);
        filter: brightness(1.2);
        opacity: 0.75;
      }
      &--active {
        background-color: var(--color);
      }
    }
  }
}
</style>
