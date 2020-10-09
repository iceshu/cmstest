import { Plugin } from '@nuxt/types'
import { getConfigInfoR, getPostList } from '~/services/index'

const getWebInfo = async (commit: any) => {
  const { data } = await getConfigInfoR({ label: 'WEBINFO' })
  if (data && data.success) {
    commit('common/setObjData', { KEY: 'WEBINFO', VALUE: data.data.value })
  }
}
const recentPost = async (commit: any) => {
  const { data } = await getPostList({ current: 1, pageSize: 10 })
  if (data && data.success) {
    commit('common/setObjData', { KEY: 'RECENTPOSTS', VALUE: data.data.docs })
  }
}
const initStore: Plugin = async ({ store: { commit, state } }) => {
  if (state.common.filled) {
    return
  }
  await getWebInfo(commit)
  await recentPost(commit)
  if (state.common.WEBINFO.length > 0) {
    commit('common/setObjData', { KEY: 'filled', VALUE: true })
  }
}
export default initStore
