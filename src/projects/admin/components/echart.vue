<template>
  <div class="chart-page">
    <ve-histogram :data="chartData" :loading="true"></ve-histogram>
  </div>
</template>

<script>
import VeHistogram from 'v-charts/lib/histogram.common'

export default {
  components: {
    [VeHistogram.name]: VeHistogram
  },
  data () {
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '7月', '访问用户': 1393, '下单用户': 1093, '下单率': 3434 },
          { '日期': '8月', '访问用户': 3530, '下单用户': 3230, '下单率': 4343 },
          { '日期': '9月', '访问用户': 2923, '下单用户': 2623, '下单率': 4343 },
          { '日期': '10月', '访问用户': 1723, '下单用户': 1423, '下单率': 4334 },
          { '日期': '11月', '访问用户': 3792, '下单用户': 3492, '下单率': 4345 },
          { '日期': '12月', '访问用户': 4593, '下单用户': 4293, '下单率': 4345 }
        ]
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
