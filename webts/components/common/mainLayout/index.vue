<template>
  <div>
    <div id="header">
      <div class="site-name">
        <h1 class="hidden">{{ WEBINFO.WEBNAME }}</h1>
        <nuxt-link id="logo" to="/">{{ WEBINFO.WEBNAME }}</nuxt-link>
        <p class="description">{{ WEBINFO.SUBTITLE }}</p>
      </div>
      <Headermenu :name="menuName" />
    </div>
    <div id="layout" class="pure-g">
      <div class="pure-u-1 pure-u-md-3-4">
        <div class="content_container">
          <slot name="main" />
        </div>
      </div>
      <div class="pure-u-1-4 hidden_mid_and_down">
        <div id="sidebar">
          <div class="widget">
            <form
              class="search-form"
              action="/search"
              method="get"
              accept-charset="utf-8"
              target="_blank"
            >
              <input type="text" name="q" maxlength="20" placeholder="Search" />
            </form>
          </div>
          <Recentpost />
          <Friendlinks />
        </div>
      </div>
      <Footer />
    </div>
    <a id="rocket" class="show" href="#"></a>
    <div id="disqus_thread"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { namespace } from 'vuex-class'
import Headermenu from './menu.vue'
import Friendlinks from './friendlinks.vue'
import Footer from './footer.vue'
import Recentpost from './recentpost.vue'

const commonModule = namespace('common')

@Component({ components: { Headermenu, Friendlinks, Footer, Recentpost } })
export default class Hello extends Vue {
  @Prop(String) readonly menuName: String | undefined
  @commonModule.State('WEBINFO')
  private WEBINFO!: Object
}
</script>
