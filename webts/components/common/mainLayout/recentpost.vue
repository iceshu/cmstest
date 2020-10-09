<template>
  <div class="widget">
    <div class="widget-title">
      <i class="fa fa-file-o">最近文章</i>
    </div>
    <ul class="post-list">
      <li
        v-for="(item, index) in RECENTPOSTS"
        :key="index"
        class="post-list-item"
      >
        <nuxt-link
          class="post-list-link"
          :to="'/post/' + item._id"
          :title="item.title"
        >
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from 'vuex-class'
const commonModule = namespace('common')

@Component({})
export default class Hello extends Vue {
  @commonModule.State('RECENTPOSTS')
  private RECENTPOSTS!: Array<Object>
}
</script>
