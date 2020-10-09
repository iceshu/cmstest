import store2 from 'store2'
export const objToArry = (obj: Object) => {
  return (
    Object.keys(obj).map((e, index) => {
      const objs: any = obj

      return {
        ...objs[e],
        index,
      }
    }) || []
  )
}
export const isLogin = (fn: Function) => {
  const dd = store2('playerInfo')
  if (!dd) {
    location.href = '/user/login'
    return
  }
  fn && fn(dd)
}
