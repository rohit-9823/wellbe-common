<template>
  <div v-if="section && section.display === '1'" :style="customizeStyle">
    <div class="section" :class="className">
      {{ section.label }}
    </div>
    <small
      v-if="hintMessage"
      class="section-hint-message"
      :style="{ color: hintMessagesColor }"
      >{{ hintMessage }}</small
    >
  </div>
</template>

<script>
export default {
  name: 'WSectionLabel',
  props: {
    section: {
      type: Object,
      default: undefined,
    },
    className: {
      type: String,
      default: 'section-label',
    },
    contentBackgroundColor: {
      type: String,
      default: '#fff8ca',
    },
    contentFontWeight: {
      type: String,
      default: '600',
    },
    contentFontSize: {
      type: String,
      default: '16px',
    },
    contentTextColor: {
      type: String,
      default: 'black',
    },
    hintMessage: {
      type: String,
      default: undefined,
    },
    hintMessagesColor: {
      type: String,
      default: 'black',
    },
  },
  computed: {
    customizeStyle() {
      return {
        '--contentBackgroundColor': this.contentBackgroundColor,
        '--contentFontWeight': this.contentFontWeight,
        '--contentFontColor': this.contentTextColor,
        '--contentFontSize': this.contentFontSize,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  padding: 11px 16px;
  background-color: var(--contentBackgroundColor);
  font-size: var(--contentFontSize);
  color: var(--contentFontColor);
  font-weight: var(--contentFontWeight);
  line-height: 1;
}

.section-hint-message {
  padding: 11px 16px;
}
</style>
