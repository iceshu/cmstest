import { provide, inject } from 'midway'
import { Context } from 'egg';

import { GetUserOpts, UserInfo } from './user.model'
import BaseService from '../../core/base.service'
import * as _ from 'lodash'
@provide('userService')
export class UserService extends BaseService {
  @inject()
  ctx!: Context;

  public async create(payload: any) {
    let { userName, passWord } = payload;
    passWord = await this.ctx.helper.generate(passWord);
    return this._create(this.ctx.model.User, { userName, passWord });
  }
  /**
   * 读取用户信息
   */
  public async getUser(options: GetUserOpts): Promise<UserInfo> {
    return {
      id: options.id,
      user_name: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    }
  }

  public async item({
    query = {},
    populate = [],
    files = undefined,
  } = {}) {
    return this._item(this.ctx.model.User, {
      files: files ? files : {
        passWord: 0,
        email: 0,
      },
      query,
      populate: !_.isEmpty(populate) ? populate : [{
        path: 'group',
        select: 'power _id enable name',
      }],
    });
  }

}
