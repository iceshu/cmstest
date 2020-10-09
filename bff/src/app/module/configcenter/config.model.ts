/**
 * 查询用户信息参数
 */
export interface GetUserOpts {
  id: number
}

/**
 * 用户信息
 */
export interface TagInfo {
  name: string
}

export interface configObj {
  _id: string,
  label: string,
  value: object,
  remark: string
}