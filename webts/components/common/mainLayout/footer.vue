<template>
  <div class="pure-u-1 pure-u-md-3-4">
    <div id="footer">
      Copyright © {{ YEAR }}
      <nuxt-link to="/" rel="nofollow">{{ WEBINFO.WEBNAME }}</nuxt-link
      >|
      <a rel="nofollow" target="_blank" href="http://www.beian.miit.gov.cn/">{{
        WEBINFO.BEIAN
      }}</a>
      |&nbsp;
      <img
        class="nofancybox"
        src="../../../assets/images/beian.png"
        style="margin-bottom: -4px"
      />
      <a rel="nofollow" target="_blank" href="http://www.beian.gov.cn/">{{
        WEBINFO.BEIAN
      }}</a>
      <br />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from 'vuex-class'
import dayjs from 'dayjs'
const commonModule = namespace('common')
@Component({})
export default class Hello extends Vue {
  @commonModule.State('WEBINFO')
  private WEBINFO!: Object

  private YEAR: String = dayjs().format('YYYY')
}
</script>
