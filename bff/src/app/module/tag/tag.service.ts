import { provide, inject } from 'midway'
import { Context } from 'egg';

import BaseService from '../../core/base.service'
import * as _ from 'lodash'
@provide('tagService')
export class TagService extends BaseService {
  @inject()
  ctx!: Context;

  public async create(payload: any) {
    return this._create(this.ctx.model.Tag, payload);
  }


  public async createMany(payload: any) {
    return this._createMany(this.ctx.model.Tag, payload);
  }

  public async find(payload: any, {
    query = {},
    searchKeys = [],
    populate = [],
    files = null
  } = {}) {

    let listdata = this._list(this.ctx.model.Tag, payload, {
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
    console.log('query', query)
    return this._item(this.ctx.model.Tag, {
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
    return this._removes(this.ctx.model.Tag, ids)
  }

  public async update(id: any, data: any) {
    return this._update(this.ctx.model.Tag, id, data)
  }

}
