<template>
  <mainLayout>
    <template v-slot:main>
      <div class="container">
        <h1>搜索: {{ searchkey }} 的结果</h1>
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
    const { query } = ctx
    const { q: searchkey = '', current = 1 } = query
    const getPostListR: any = getPostList
    const { data }: any = await getPostListR({
      searchkey,
      current,
      isPaging: 0,
      searchkeys: 'simpleComments,title',
    })
    if (data && data.success) {
      const docs = data.data
      return {
        docs,
        searchkey,
      }
    }
    return {
      docs: [],
      searchkey: '',
    }
  },
})
export default class Home extends Vue {
  docs: any = []
  searchkey: string = ''
  mounted() {
    // this.init()
  }

  head() {
    return {
      title: `搜索${this.searchkey}文章列表`,
    }
  }
}
</script>

<style></style>
