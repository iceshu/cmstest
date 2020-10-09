<template>
  <div id="nav-menu">
    <nuxt-link
      v-for="(item, index) in menus"
      :key="index"
      :class="item.name === name ? 'current' : ''"
      :to="item.href"
    >
      <i :class="['fa', item.icon]">{{ item.name }}</i>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { namespace } from 'vuex-class'
const commonModule = namespace('common')

@Component({})
export default class HeaderMeun extends Vue {
  @Prop({ default: '首页' }) readonly name: string | undefined
  @commonModule.State('WEBINFO')
  private WEBINFO!: Object

  private menus = [
    {
      name: '首页',
      href: '/',
      icon: 'fa-home',
    },
    {
      name: '标签',
      href: '/tags',
      icon: 'fa-tag',
    },
    {
      name: '关于',
      href: '/about',
      icon: 'fa-user',
    },
    {
      name: '历史',
      href: '/history',
      icon: 'fa-book',
    },
    {
      name: '留言',
      href: '/message',
      icon: 'fa-comments',
    },
  ]
}
</script>
