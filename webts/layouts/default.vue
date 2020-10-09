<template>
  <div class="body_container">
    <Nuxt />
  </div>
</template>

<style lang="css">
@import '~assets/css/style.css';
</style>

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
