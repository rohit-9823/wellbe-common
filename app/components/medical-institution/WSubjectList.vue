<template>
  <div>
    <div
      v-for="(item, index) in subjects"
      :key="index"
      class="selection__content"
    >
      <div class="selection__content__item" @click="setSubject(item)">
        <div>{{ item.label }}</div>
        <font-awesome-icon :icon="['fa', 'angle-right']" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WSubjectList',
  props: {
    subjects: {
      type: Array,
      default: undefined,
    },
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    setSubject(subject) {
      this.$emit('subjectSelected', subject)
    },
  },
}
</script>
