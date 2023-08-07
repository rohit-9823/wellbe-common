<template>
  <div style="display: flex">
    <input type="hidden" :value="value" />
  </div>
</template>

<script>
export default {
  name: 'WHidden',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    returnType: {
      type: String,
      default: undefined,
    },
  },
  computed: {},
  mounted() {
    this.$emit('updateReturnType')
  },
}
</script>
