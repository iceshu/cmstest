<template>
  <mainLayout menu-name="首页">
    <template v-slot:main>
      <div class="post">
        <h1 class="post-title">{{ title }}</h1>
        <div class="post-meta">
          {{ updateDate }}
          <span>|</span>
          <span class="category">
            <a href="#">{{ categoryName }}</a>
          </span>
        </div>
        <a href="#disqus_thread">
          <DisqusCount shortname="da-xi-gua" :identifier="'/post/' + id" />
        </a>
        <div class="post-content" v-html="simpleComments"></div>
        <div class="post-copyright">
          <p>
            <span>本文标题：</span>
            {{ title }}
          </p>
          <p><span>文章作者：</span>我爱大西瓜</p>
          <p>
            <span>发布时间：</span>
            {{ date }}
          </p>
          <p>
            <span>最后更新：</span>
            {{ updateDate }}
          </p>
        </div>
        <br />
        <div class="tags">
          <a
            v-for="(item, index) in tags"
            :key="index"
            :href="'/tags/' + item.name"
          >
            <i class="fa fa-tag"></i>
            {{ item.name }}
          </a>
        </div>
        <div class="post-nav">
          <nuxt-link v-if="prePost" class="pre" :to="'/post/' + prePost.id">{{
            prePost.title
          }}</nuxt-link>
          <nuxt-link
            v-if="nextPost"
            class="next"
            :to="'/post/' + nextPost.id"
            >{{ nextPost.title }}</nuxt-link
          >
        </div>
        <div v-if="pageConfig.title" id="disqus_thread">
          <Disqus
            shortname="da-xi-gua"
            lang="zh_cn"
            :page-config="pageConfig"
          />
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
import { Disqus, DisqusCount } from 'vue-disqus'
import * as _ from 'lodash'
import { getPostInfo, getPostNearByR } from '~/services/index'
@Component({
  components: { mainLayout, Disqus, DisqusCount },
  asyncData: async (ctx) => {
    const { params } = ctx
    const { id } = params
    let nearPostList: any = []
    const { data }: any = await getPostInfo({ _id: id })
    if (data && data.success) {
      const {
        title = '',
        simpleComments = '',
        updateDate,
        date,
        tags,
        categories,
      } = data.data
      const { data: ndata } = await getPostNearByR({ _id: id })
      if (ndata && ndata.success) {
        nearPostList = ndata.data
      }
      return {
        title,
        simpleComments,
        updateDate,
        date,
        tags,
        categories,
        nearPostList,
        id,
      }
    }
    return {
      title: '查无文章',
      categories: [],
      simpleComments: '查无文章',
      nearPostList: [],
      id: -1,
    }
  },
})
export default class Home extends Vue {
  docs: any = []
  title: string = ''
  pageInfo: any = {}
  nearPostList: any = []
  categories: any = []
  id: number = -1

  mounted() {
    // this.init()
  }

  get pageConfig(): object {
    return {
      title: this.title,
      category_id: this.id,
    }
  }

  get prePost(): object {
    return _.get(this, 'nearPostList[0]', '')
  }

  get nextPost(): object {
    return _.get(this, 'nearPostList[1]', '')
  }

  get categoryName(): string {
    return _.get(this, 'categories[0].name', '')
  }

  head() {
    return {
      title: this.title,
    }
  }
}
</script>

<style></style>
