<template>
  <mainLayout menu-name="关于">
    <template v-slot:main>
      <div class="container">
        <div class="post">
          <div class="post-content">
            <div class="one-tag-list">
              <span class="fa fa-tag tag-name">
                <span class="tag-text">{{ tagname }}</span>
              </span>
              <div
                v-for="(item, index) in docs"
                :key="index"
                class="post-preview"
              >
                <nuxt-link :to="'/post/' + item._id" :title="item.title">
                  {{ item.title }}
                  <span>[{{ item.updateDate }}]</span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </mainLayout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import Pagination from '@/components/common/pagination/index.vue'
import mainLayout from '@/components/common/mainLayout/index.vue'
import { getPostList } from '~/services/index'

@Component({
  components: { Pagination, mainLayout },
  asyncData: async (ctx: any) => {
    const { params } = ctx
    const { tagname } = params
    const getPostListR: any = getPostList
    const { data }: any = await getPostListR({ tagName: tagname, isPaging: 0 })
    if (data && data.success) {
      const docs = data.data
      return {
        docs,
        tagname,
      }
    }
    return {
      docs: [],
      tagname,
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

<style lang="scss" scoped>
.post-preview {
  a {
    font-size: 16px;
    font-weight: bold;
  }
  span {
    font-weight: normal;
    float: right;
  }
}
</style>
