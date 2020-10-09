<template>
  <mainLayout menu-name="标签">
    <template v-slot:main>
      <div class="container">
        <div class="post">
          <div class="post-content">
            <div class="tagcloud">
              <nuxt-link
                v-for="(item, index) in tagList"
                :key="index"
                :to="'/tags/' + item.name"
                :title="item.name"
                >{{ item.name }}</nuxt-link
              >
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
import { getTagsR } from '@/services/index'
import mainLayout from '@/components/common/mainLayout/index.vue'

@Component({
  components: { Pagination, mainLayout },
  asyncData: async (ctx: any) => {
    const { data }: any = await getTagsR()

    if (data && data.success) {
      const tagList = data.data
      return {
        tagList,
      }
    }
    return {
      tagList: [],
    }
  },
})
export default class Home extends Vue {
  tagList: any = []
  mounted() {}

  head() {
    return {
      title: '标签',
    }
  }
}
</script>

<style></style>
