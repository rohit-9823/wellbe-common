<template>
  <w-special-child-component
    :part="part"
    :error="getErrorForComponentById(part.id)"
    :error-messages="getErrorMessageById(part.id)"
  />
</template>
<script>
import { mapGetters } from 'vuex'
import WSpecialChildComponent from '@/components/symptoms-record/WSpecialChildComponent'
import { CONSTANTS } from '@/utils/constants'

export default {
  name: 'WSpecialComponent',
  components: {
    WSpecialChildComponent,
  },
  props: {
    part: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      constants: CONSTANTS,
      error: false,
      errorMessages: undefined,
    }
  },
  computed: {
    ...mapGetters({
      getErrorMessageById: 'error/getErrorMessageById',
      getErrorForComponentById: 'error/getErrorForComponentById',
    }),
  },
}
</script>
