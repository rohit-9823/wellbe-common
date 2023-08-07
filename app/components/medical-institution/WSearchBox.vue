<template>
  <div>
    <div style="margin: 0 10px 20px 10px">
      <w-search
        v-model="keyword"
        placeholder="絞り込み検索"
        @keyup.enter="getMIByKey"
        @clickClearIcon="keyword = null"
      />
    </div>
    <small style="margin: 0 10px">
      {{ selectedPrefecture.label }}
      <font-awesome-icon :icon="['fa', 'angle-right']" />
      {{ selectedCity.name }}</small
    >
    <span> {{ getTotalInFormat(pageInfo.total) }}件 </span>
  </div>
</template>

<script>
import _ from 'lodash'

import { WCMI1003 } from '@/api/collection/WCMI1003'
import WSearch from '@/components/stories/WSearch.vue'

const SIZE = 50

export default {
  name: 'WSearchBox',
  components: { WSearch },
  props: {
    part: {
      type: Object,
      default: undefined,
    },
    selectedPrefecture: {
      type: Object,
      default: undefined,
    },
    selectedCity: {
      type: Object,
      default: undefined,
    },
    xWLBHeader: {
      type: Object,
      default: undefined,
    },
    screen: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      hospitals: null,
      pageInfo: {
        total: 0,
      },
      keyword: '',
    }
  },
  computed: {},
  async mounted() {
    const res = await this.getMIApiData()
    if (res && res.data && res.data.data) {
      this.hospitals = res.data.data
      this.pageInfo = res.data.page
      this.$emit('searched', this.hospitals)
    }

    window.onscroll = _.debounce(() => {
      const isBottom =
        Math.abs(
          document.documentElement.scrollTop +
            window.innerHeight -
            document.documentElement.offsetHeight
        ) < 1
      if (isBottom) {
        this.getNextPage()
      }
    }, 400)
  },
  methods: {
    citySelected(cityId) {
      this.$emit('citySelected', cityId)
    },
    getTotalInFormat(total) {
      const newTotal = parseInt(total)
      return newTotal.toLocaleString('en-IN')
    },
    async getMIApiData(page = 1) {
      const payload = {
        data: {
          address_prefecture_code: [this.selectedPrefecture.value],
          address_city_code: [this.selectedCity.code],
        },
        page: {
          offset: 1,
          page,
          size: SIZE,
        },
      }
      payload.data.keyword = this.keyword

      return await WCMI1003(this.$axios, this.xWLBHeader, payload)
    },

    async getMIByKey() {
      this.hospitals = null
      const res = await this.getMIApiData(1)
      this.pageInfo = res.data.page ? res.data.page : this.pageInfo
      if (res.data.data.length > 0) {
        this.hospitals = res.data.data
      } else {
        this.hospitals = []
        if (this.screen.hospital0_action === '1') {
          const confirmDialog = confirm(
            JSON.stringify({
              title: '医療機関検索',
              message:
                '該当する病院、クリニックが見つかりませんでした。エリア、 診療科目、 検索ワードの条件を変えて検索するか、キーボードから医療機関名を入力してください。',
              button_name_ok: 'キーボードから入力',
              button_name_cancel: 'OK',
            })
          )
          if (confirmDialog) {
            this.$emit('skipHospitalSelectStep')
          }
          return false
        }
      }
      this.$emit('searched', this.hospitals)
    },

    async getNextPage(keyword = null) {
      if (SIZE * this.pageInfo.page >= this.pageInfo.total) return

      const res = await this.getMIApiData(this.pageInfo.page + 1)
      if (res && res.data && res.data.data) {
        this.hospitals.push(...res.data.data)
        this.$emit('searched', this.hospitals)
      }
      this.pageInfo = res.data.page ? res.data.page : this.pageInfo
    },
  },
}
</script>
