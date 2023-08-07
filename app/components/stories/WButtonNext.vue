<template>
  <div :id="id" class="w-button" :class="classInner" ontouchstart="">
    <div v-if="showOverlay" class="overlay"></div>
    <button
      v-if="!loading"
      class="w-button__button"
      :disabled="disabled"
      :style="customizeStyle"
      :class="{
        'w-button__button--border': border,
        'w-button__button--block': block,
      }"
      @click="click"
    >
      {{ text }}
    </button>
    <button
      v-else
      class="w-button__button"
      :disabled="disabled"
      :style="customizeStyle"
      :class="{
        'w-button__button--border': border,
        'w-button__button--block': block,
      }"
      @click="click"
    >
      <div>
        <div style="color: transparent">{{ text }}</div>
        <div class="w-button__button--loading" style="margin: -31px auto"></div>
      </div>
    </button>
  </div>
</template>

<script>
import { sharedProps } from '@/utils/constants'

export default {
  name: 'WButtonNext',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    classInner: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },
    border: {
      type: Boolean,
      default: false,
    },
    borderWidth: {
      type: String,
      default: '1px',
    },
    borderColor: {
      type: String,
      default: 'black',
    },
    borderStyle: {
      type: String,
      default: 'solid',
    },
    borderRadius: {
      type: String,
      default: '20px',
    },
    block: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '48px',
    },
    paddingTop: {
      type: String,
      default: '0',
    },
    paddingRight: {
      type: String,
      default: '16px',
    },
    paddingBottom: {
      type: String,
      default: '0',
    },
    paddingLeft: {
      type: String,
      default: '16px',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showOverlay: {
      type: Boolean,
      default: false,
    },
    ...sharedProps,
  },
  computed: {
    customizeStyle() {
      return {
        '--borderWidth': this.borderWidth,
        '--borderColor': this.borderColor,
        '--borderStyle': this.borderStyle,
        '--borderRadius': this.borderRadius,
        '--paddingTop': this.paddingTop,
        '--paddingRight': this.paddingRight,
        '--paddingBottom': this.paddingBottom,
        '--paddingLeft': this.paddingLeft,
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
  },
  methods: {
    click($event) {
      this.$emit('click', $event)
    },
  },
}
</script>

<style lang="scss" scoped>
.w-button {
  position: relative;

  &__button {
    cursor: pointer;
    border: none;
    min-height: 36px;
    border-radius: var(--borderRadius);
    background-color: var(--contentBackgroundColor);
    font-size: var(--contentFontSize);
    color: var(--contentFontColor);
    font-weight: var(--contentFontWeight);
    padding: var(--paddingTop) var(--paddingRight) var(--paddingBottom)
      var(--paddingLeft);
    height: var(--height);
    box-shadow: 0 2px 2px #2d303929;

    &:disabled {
      opacity: 0.5;
      box-shadow: none;
    }

    &:active {
      box-shadow: none;
    }

    &--border {
      border-width: var(--borderWidth);
      border-color: var(--borderColor);
      border-style: var(--borderStyle);
    }

    &--block {
      width: 100%;
    }

    &--loading {
      border: 2px solid var(--textColor);
      border-top: 2px solid transparent;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      background-color: transparent;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
