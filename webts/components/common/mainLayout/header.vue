<template>
  <div id="nav-menu">
    <a class="current" href="/.">
      <i class="fa fa-home">首页</i>
    </a>
    <a href="/archives/">
      <i class="fa fa-archive">归档</i>
    </a>
    <a href="/tags/">
      <i class="fa fa-tag">标签</i>
    </a>
    <a href="/about/">
      <i class="fa fa-user">关于</i>
    </a>
    <a href="/history/">
      <i class="fa fa-book">历史</i>
    </a>
    <a href="/guestbook/">
      <i class="fa fa-comments">留言</i>
    </a>
    <a href="/atom.xml">
      <i class="fa fa-rss">订阅</i>
    </a>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from 'vuex-class'
import Header from './header'
const commonModule = namespace('common')

@Component({ Header })
export default class Hello extends Vue {
  @commonModule.State('WEBINFO')
  private WEBINFO!: Object
}
</script>
