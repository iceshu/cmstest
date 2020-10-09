<template>
  <mainLayout menu-name="历史">
    <template v-slot:main>
      <section id="process">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
              <div class="timeline-centered">
                <div class="line"></div>
                <div class="present">Past</div>
                <div class="dot_tp"></div>
                <div class="born">Now</div>
                <div class="dot_bt"></div>
                <div
                  v-for="(item, index) in historyList"
                  :key="index"
                  class="timeline-entry"
                >
                  <div class="timeline-entry-inner">
                    <div
                      class="timeline-icon wow fadeInUp"
                      data-wow-delay="0.2s"
                    >
                      <span class="number">{{ index + 1 }}</span>
                    </div>
                    <div
                      class="timeline-label wow fadeInUp"
                      data-wow-delay="0.2s"
                    >
                      <span class="word">{{ item }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </mainLayout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import mainLayout from '@/components/common/mainLayout/index.vue'

import { getConfigInfoR } from '~/services/index'

@Component({
  components: { mainLayout },
  asyncData: async (ctx: any) => {
    const { data }: any = await getConfigInfoR({ label: 'history' })
    if (data && data.success) {
      const historyList = data.data.value.history
      return {
        historyList,
      }
    }
    return {
      historyList: [],
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
