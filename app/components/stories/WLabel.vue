<template>
  <div :class="parentClassName" :style="customizeStyle">
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="wLabel === null"
      :style="{ padding: getPaddingValue('profile__content') }"
    >
      <label
        :for="id"
        class="w-label__content"
        :style="{
          padding: getPaddingValue('selection__custom__label'),
        }"
        :class="parentClassName"
        v-html="wLabelValue"
      />
    </div>
    <div v-else :style="customizeStyle">
      <label v-if="labelDisplay" :class="parentClassName + '__label'">
        {{ wLabel }}
      </label>
      <div style="margin-bottom: 1em" :class="parentClassName + '__content'">
        <span v-if="newVal" v-html="newVal"></span>
        <span v-else>-</span>
      </div>
    </div>
  </div>
</template>

<script>
import { sharedProps } from '@/utils/constants'

export default {
  name: 'WLabel',
  props: {
    id: {
      type: String,
      required: true,
    },
    wLabel: {
      type: String,
      default: undefined,
    },
    labelDisplay: {
      type: Number,
      default: undefined,
    },
    wLabelValue: {
      type: [String, Number],
      default: undefined,
    },
    parentClassName: {
      type: String,
      default: 'w-label',
    },
    title: {
      type: String,
      default: undefined,
    },
    childNodes: {
      type: Array,
      default: undefined,
    },
    partValue: {
      type: String,
      default: undefined,
    },
    ...sharedProps,
  },
  data() {
    return {
      newVal: this.wLabelValue,
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
  },
  watch: {
    wLabelValue() {
      this.newVal = this.wLabelValue
      // check if value has new line and replace it with <br>
      this.checkIfValueHasNewLine()
      // check if value is date and replace - with /
      if (this.isValidDate(this.wLabelValue)) {
        this.newVal = this.wLabelValue.split('-').join('/')
      }
    },
  },
  mounted() {
    if (this.childNodes?.length > 0) {
      this.newVal = this.childNodes.reduce((arr, val) => {
        if (val.part_value === '1') {
          if (arr.length > 0) {
            arr += '<br/>'
          }
          arr += val.label
        }
        return arr
      }, '')
    }
    if (this.partValue !== undefined) {
      this.newVal = this.partValue
    }

    // check if value has new line and replace it with <br>
    this.checkIfValueHasNewLine()
    // check if value is date and replace - with /
    if (this.isValidDate(this.wLabelValue)) {
      this.newVal = this.wLabelValue.split('-').join('/')
    }
  },

  methods: {
    getPaddingValue(parentClassName) {
      if (this.parentClassName === parentClassName) {
        return '10px'
      }
      return '0'
    },
    isValidDate(dateString) {
      if (!dateString) return false
      const regEx = /^\d{4}-\d{2}-\d{2}$/
      if (!dateString.toString().match(regEx)) return false // Invalid format
      const d = new Date(dateString)
      const dNum = d.getTime()
      if (!dNum && dNum !== 0) return false // NaN value, Invalid date
      return d.toISOString().slice(0, 10) === dateString
    },
    checkIfValueHasNewLine() {
      if (this.wLabelValue?.toString().includes('\n')) {
        this.newVal = this.wLabelValue.replace('\n', '<br>')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.w-label {
  display: flex;
  flex-direction: column;

  &__content {
    background-color: var(--contentBackgroundColor);
    font-size: var(--contentFontSize);
    color: var(--contentFontColor);
    font-weight: var(--contentFontWeight);
    white-space: pre-line;
  }

  &__label {
    font-size: var(--fontSizeLabel);
    font-weight: var(--fontWeightLabel);
    color: var(--fontColorLabel);
    background-color: var(--backgroundColorLabel);
    padding: 0 16px;
    margin-left: -16px;
    margin-right: -16px;
    display: block;
  }
}

.profile {
  &__content {
    &__label {
      background-color: var(--backgroundColorLabel);
      padding: 6px 16px;
      font-size: var(--fontSizeLabel);
      font-weight: var(--fontWeightLabel);
      color: var(--fontColorLabel);
      display: block;
    }

    &__content {
      padding: 10px;
      background-color: var(--contentBackgroundColor);
      font-size: var(--contentFontSize);
      color: var(--contentFontColor);
      font-weight: var(--contentFontWeight);
      min-height: 2.5em;
      line-height: 2.5em;

      &__border {
        border-bottom: 1px solid #ebecf0;
      }
    }
  }
}

.selection {
  &__confirm {
    &__label {
      font-size: var(--fontSizeLabel);
      font-weight: var(--fontWeightLabel);
      color: var(--fontColorLabel);
      background-color: var(--backgroundColorLabel);
      padding: 5px 25px;
      margin-left: calc(50% - 50vw);
      margin-right: calc(50% - 50vw);
      display: block;
    }

    &__content {
      padding: 10px;
      border-bottom: 1px solid #ebecf0;
      background-color: var(--contentBackgroundColor);
      font-size: var(--contentFontSize);
      color: var(--contentFontColor);
      font-weight: var(--contentFontWeight);
    }
  }
}
</style>
