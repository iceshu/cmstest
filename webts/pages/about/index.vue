<template>
  <mainLayout menu-name="关于">
    <template v-slot:main>
      <div v-html="postInfo.simpleComments"></div>
    </template>
  </mainLayout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import mainLayout from '@/components/common/mainLayout/index.vue'

import { getPostInfo } from '~/services/index'

@Component({
  components: { mainLayout },
  asyncData: async (ctx: any) => {
    const { data }: any = await getPostInfo({ title: '关于' })
    if (data && data.success) {
      const postInfo = data.data
      return {
        postInfo,
      }
    }
    return {
      postInfo: {},
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
      title: '关于',
    }
  }
}
</script>

<style></style>
