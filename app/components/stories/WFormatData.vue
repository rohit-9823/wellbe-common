<template>
  <div>
    <div class="profile__content__label">{{ label }}</div>
    <div class="profile__content__input">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WFormatData',
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
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
  },
  computed: {
    customizeStyle() {
      return {
        '--color': this.color,
        '--textColor': this.textColor,
        '--fontSize': this.fontSize,
        '--fontWeight': this.fontWeight,
        '--backgroundColor': this.backgroundColor,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.w-common-parts-label {
  white-space: pre-line;
}
</style>
