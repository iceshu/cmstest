import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { getConfigInfoByQuery, getConfigInfoR } from '~/services/index'
import { objToArry } from '~/utils/helper'

@Module({
  name: 'common',
  stateFactory: true,
  namespaced: true,
})
export default class CommonModule extends VuexModule {
  WEBINFO = {
    title: '我的网站',
    description: '我的描述',
  }

  filled = false

  SERVERLISTS = []

  @Mutation
  setObjData(payload: any) {
    const { KEY, VALUE } = payload
    const that: any = this
    that[KEY] = VALUE
  }

  @Action
  public async getWebInfo() {
    const { data } = await getConfigInfoR({ label: 'WEBINFO' })
    if (data && data.success) {
      console.log('ddddd', data)
      this.context.commit('setObjData', { KEY: 'WEBINFO', VALUE: data.data })
    }
  }
}
interface PAYLOAD {
  KEY: String
  VALUE: Object
}
