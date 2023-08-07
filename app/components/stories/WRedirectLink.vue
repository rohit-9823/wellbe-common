<template>
  <div class="w-redirect-link" :style="customizeStyle">
    <span
      class="w-redirect-link__span"
      :class="parentClassName + '__btn'"
      @click="addHospital"
    >
      {{ label }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { sharedProps } from '@/utils/constants'

export default {
  name: 'WRedirectLink',
  props: {
    label: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
      default: '/medical-institution',
    },
    parentClassName: {
      type: String,
      default: '',
    },
    ...sharedProps,
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
    ...mapGetters({
      getXWLBHeader: 'theme/getXWLBHeader',
    }),
  },
  methods: {
    addHospital() {
      const xWLBHeaders = this.getXWLBHeader
      let uri = this.redirectUrl
      if (Object.keys(xWLBHeaders).length > 0) {
        const params =
          '?xWLBAuthorization=' +
          xWLBHeaders.xWLBAuthorization +
          '&xWLBApplicationId=' +
          xWLBHeaders.xWLBApplicationId
        uri += params
      }
      console.log('Going to new url')
      window.location.href = uri
    },
  },
}
</script>

<style lang="scss" scoped>
.w-redirect-link {
  display: flex;

  &__span {
    background-color: var(--contentBackgroundColor);
    font-size: var(--contentFontSize);
    color: var(--contentFontColor);
    font-weight: var(--contentFontWeight);
  }
}
</style>
