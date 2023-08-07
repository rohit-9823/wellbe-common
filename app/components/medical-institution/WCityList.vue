<template>
  <div>
    <div
      v-for="(item, index) in cities"
      :key="index"
      class="selection__content"
    >
      <div class="selection__content__item" @click="citySelected(item)">
        <div>{{ item.name }}</div>
        <font-awesome-icon :icon="['fa', 'angle-right']" />
      </div>
    </div>
  </div>
</template>

<script>
import { WCMI1004 } from '@/api/collection/WCMI1004'
import { CONSTANTS } from '@/utils/constants'
export default {
  name: 'WCityList',
  props: {
    part: {
      type: Object,
      default: undefined,
    },
    selectedPrefecture: {
      type: Object,
      default: undefined,
    },
    xWLBHeader: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      cities: null,
    }
  },
  computed: {},
  async mounted() {
    const res = await WCMI1004(
      this.$axios,
      this.xWLBHeader,
      this.selectedPrefecture.value
    )
    if (res && res.data) {
      this.cities = res.data
    }
    if (
      res.error &&
      [CONSTANTS.SERVER_NAME_DEV, CONSTANTS.SERVER_NAME_LOCAL].includes(
        process.env.SERVER_NAME
      )
    ) {
      this.$nuxt.error({
        statusCode: res.status,
        message: JSON.stringify(res.error) + ' ' + CONSTANTS.WCMI1004_API,
      })
      return {}
    }
  },
  methods: {
    citySelected(city) {
      this.$emit('citySelected', city)
    },
  },
}
</script>

<style lang="scss">
.selection {
  &__step {
    padding: 20px 0;
  }

  &__label {
    background-color: #fff8ca;
    text-align: left;
    padding: 10px;
    font-weight: bolder;
  }

  &__content {
    &.disabled {
      background: #dcdcdc;
      pointer-events: none;
    }
    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ebecf0;
      padding: 10px;
      cursor: pointer;
    }

    &__item-detail {
      padding: 10px;
      cursor: pointer;

      &__name {
        font-weight: bolder;
        &__selected-text {
          float: right;
          color: #009edb;
          font-size: 12px;
        }
      }
    }
  }

  &__confirm {
    &__label {
      font-size: 0.8em;
      font-weight: bolder;
      background-color: #ebecf0;
      padding: 5px 10px;
    }

    &__content {
      padding: 10px;
      border-bottom: 1px solid #ebecf0;
    }
  }

  &__message {
    display: flex;
    align-items: center;
    margin: 0 20px;
    padding: 16px;
    border-radius: 3px;
    background-color: #ebecf0;

    &__icon {
      margin-right: 10px;
    }
  }
}
</style>
