<template>
  <div class="widget">
    <div class="widget-title">
      <i class="fa fa-external-link">友情链接</i>
    </div>
    <template v-for="(item, index) in WEBINFO.FRIENDLINKS">
      <ul></ul>
      <a :href="item.link" :title="item.name" target="_blank">{{
        item.name
      }}</a>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from 'vuex-class'
const commonModule = namespace('common')

@Component({})
export default class Hello extends Vue {
  @commonModule.State('WEBINFO')
  private WEBINFO!: Object
}
</script>
