<template>
  <div v-if="pageInfo.total > 0">
    <nav class="page-navigator">
      <nuxt-link
        v-if="pageInfo.current !== 1"
        :to="`/page/${pageInfo.current}`"
        class="extend prev"
        rel="prev"
        >上一页</nuxt-link
      >
      <span v-if="pageStart > 1" class="space">…</span>
      <template v-for="(liite, pindex) in range(pageStart, pageEnd + 1)">
        <span
          v-if="liite === pageInfo.current"
          :key="pindex"
          class="page-number current"
          >{{ liite }}</span
        >
        <nuxt-link v-else class="page-number" :to="'/page/' + liite">
          {{ liite }}
        </nuxt-link>
      </template>
      <span v-if="pageEnd < pageInfo.totalPage" class="space">…</span>
      <nuxt-link
        v-if="pageInfo.current !== pageInfo.totalPage"
        class="extend next"
        rel="next"
        :to="`/page/${pageInfo.current + 1}`"
        >下一页</nuxt-link
      >
    </nav>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import _ from 'lodash'
import { PageInfo } from '@/types/common'

@Component({})
export default class Pagination extends Vue {
  @Prop({
    default: {
      total: 50,
      pageSize: 10,
      current: 5,
      searchkey: '',
      totalPage: 5,
    },
  })
  readonly pageInfo: PageInfo | undefined

  pageStart: any = 0
  pageEnd = 0
  mounted() {
    this.paginfn(this.pageInfo)
  }

  range(start: number, end: number, step = 1) {
    return _.range(start, end, step)
  }

  @Watch('pageInfo')
  paginfn(pageInfo: any) {
    let pagestart = 0
    let pageend = 0
    const { current, totalPage } = pageInfo
    if (current - 2 > 0) {
      pagestart = current - 2
    } else {
      pagestart = 1
    }
    if (pagestart + 4 > totalPage) {
      pageend = totalPage
    } else {
      pageend = pagestart + 4
    }
    this.pageStart = pagestart
    this.pageEnd = pageend
  }
}
</script>
