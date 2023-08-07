<template>
  <div v-if="annotation">
    {{ annotation }}
  </div>
</template>

<script>
export default {
  name: 'WAnnotation',
  props: {
    annotation: {
      type: String,
      default: undefined,
    },
  },
}
</script>

<style lang="scss" scoped></style>
