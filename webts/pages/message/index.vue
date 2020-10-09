<template>
  <mainLayout menu-name="留言">
    <template v-slot:main>
      <Disqus shortname="da-xi-gua" lang="zh_cn" :page-config="pageConfig" />
    </template>
  </mainLayout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import mainLayout from '@/components/common/mainLayout/index.vue'
import { Disqus } from 'vue-disqus'

@Component({
  components: { mainLayout, Disqus },
})
export default class Home extends Vue {
  pageConfig: any = {
    title: '留言',
    category_id: 'messages',
  }

  mounted() {
    // this.init()
  }

  head() {
    return {
      title: '留言',
    }
  }
}
</script>

<style></style>
