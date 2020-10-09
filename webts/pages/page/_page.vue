<template>
  <mainLayout>
    <template v-slot:main>
      <div class="container">
        <div v-for="(item, index) in docs" :key="index" class="post">
          <h1 class="post-title">
            <nuxt-link :to="'/post/' + item._id">{{ item.title }}</nuxt-link>
          </h1>
          <div class="post-meta">{{ item.updateDate }}</div>
          <div class="post-content" v-html="item.simpleComments"></div>
          <p class="readmore">
            <nuxt-link :to="'/post/' + item._id">阅读全文</nuxt-link>
          </p>
        </div>
        <Pagination :page-info="pageInfo" />
      </div>
    </template>
  </mainLayout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import Pagination from '@/components/common/pagination/index.vue'
import { getPostList } from '@/services/index'
import mainLayout from '@/components/common/mainLayout/index.vue'

@Component({
  components: { Pagination, mainLayout },
  asyncData: async (ctx: any) => {
    const { params } = ctx
    const { page } = params
    const getPostListR: any = getPostList
    const { data }: any = await getPostListR({
      current: page,
    })
    if (data && data.success) {
      const { docs = [], pageInfo = {} } = data.data
      return {
        docs,
        pageInfo,
      }
    }
    return {
      docs: [],
      pageInfo: {},
    }
  },
})
export default class Home extends Vue {
  docs: any = []
  pageInfo: any = {}
  mounted() {
    // this.init()
  }

  head() {
    return {
      title: '文章列表',
    }
  }
}
</script>

<style></style>
