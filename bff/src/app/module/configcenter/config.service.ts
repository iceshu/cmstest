import { provide, inject } from 'midway'
import { Context } from 'egg';

import BaseService from '../../core/base.service'
import * as _ from 'lodash'
@provide('configService')
export class ConfigService extends BaseService {
  @inject()
  ctx!: Context;

  public async create(payload: any) {
    return this._create(this.ctx.model.Config, payload);
  }

  public async find(payload: any, {
    query = {},
    searchKeys = [],
    populate = [],
    files = null
  } = {}) {

    let listdata = this._list(this.ctx.model.Config, payload, {
      query: query,
      searchKeys: searchKeys,
      populate: populate,
      files
    });
    return listdata;

  }

  public async item({
    query = {},
    populate = [],
    files = undefined,
  } = {}) {
    return this._item(this.ctx.model.Config, {
      files: files ? files : {

      },
      query,
      populate: !_.isEmpty(populate) ? populate : [{
        path: 'group',
        select: 'power _id enable name',
      }],
    });
  }

  public async removes(ids: any) {
    return this._removes(this.ctx.model.Config, ids)
  }

  public async update(id: any, data: any) {
    return this._update(this.ctx.model.Config, id, data)
  }

}
