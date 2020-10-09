import { provide, inject } from "midway";
import { Context } from "egg";
import * as _ from "lodash";

import BaseService from "../../core/base.service";

@provide("postService")
export class PostService extends BaseService {
  @inject()
  ctx!: Context;

  public async create(payload: any) {
    return this._create(this.ctx.model.Post, payload);
  }

  public async find(
    payload: any,
    { sort, query = {}, searchKeys = [], populate = [], files = null }: any
  ) {
    const listdata = this._list(this.ctx.model.Post, payload, {
      query,
      searchKeys,
      populate,
      files,
      sort,
    });
    return listdata;
  }

  public async item({ query = {}, populate = [], files = "" } = {}) {
    return this._item(this.ctx.model.Post, {
      files: files ? files : {},
      query,
      populate: !_.isEmpty(populate)
        ? populate
        : [
            {
              path: "tags",
              select: "name _id",
            },
            {
              path: "categories",
              select: "name _id ",
            },
          ],
    });
  }

  public async removes(ids: any) {
    return this._removes(this.ctx.model.Post, ids);
  }

  public async update(id: any, data: any) {
    return this._update(this.ctx.model.Post, id, data);
  }
}
