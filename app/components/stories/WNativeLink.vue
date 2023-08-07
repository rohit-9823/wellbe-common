<template>
  <div style="display: flex">
    <span class="next-visit-date__btn" @click="addHospital"> {{ label }} </span>
  </div>
</template>

<script>
export default {
  name: 'WNativeLink',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    addHospital() {
      // sendEvent("tapAddHospital", "{}")
      console.log('send native event request')
    },
  },
}
</script>

<style lang="scss" scoped></style>
