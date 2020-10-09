import { Context, controller, post, get, del, put, inject, provide } from 'midway'

import { TagService } from './tag.service'
import BaseController from '../../core/base.controller'
import { tagRule } from './rules'
import { TagInfo, TagObj } from './tag.model'
@provide()
@controller('/api/tag')
export class TgaApiController extends BaseController {

  constructor(
    @inject() private tagService: TagService,

  ) {
    super();
  }

  @inject()
  ctx!: Context

  @get('/list')
  public async getList() {
    const { ctx } = this;

    try {

      let payload = ctx.query;

      let queryObj = Object.assign({
        isPaging: '0'
      }, payload)

      let tagList: Array<TagObj> = await this.tagService.find(queryObj);
      this.success(tagList)

    } catch (err) {
      this.failed(err)
    }

  }


  @get('/getOne')
  public async getItem() {
    const { ctx } = this;

    try {

      let query = ctx.query;

      let queryObj = Object.assign({
        isPaging: '0'
      }, { query })
      let tagItem: TagObj = await this.tagService.item(queryObj);
      this.success(tagItem)

    } catch (err) {
      this.failed(err)
    }

  }
}
@provide()
@controller('/manage/tag', { middleware: ['AuthMiddleware'] })
export class TgaManageController extends BaseController {

  constructor(
    @inject() private tagService: TagService,
  ) {
    super();
  }

  @inject()
  ctx!: Context

  @post('/')
  public async create() {
    const { ctx } = this;
    try {
      let fields: TagInfo = ctx.request.body || {};
      let tags: [TagInfo] = (ctx.request.body || {}).tags;
      if (tags) {
        const data = await this.tagService.createMany(tags);
        this.success(data)
        return
      }
      if (fields) {
        const validateResult = await this.ctx.validate(tagRule, fields);

        if (!validateResult) return;

        const data = await this.tagService.create(fields);
        this.success(data)
      }

    } catch (err) {
      this.success(err)
    }
  }

  @del('/')
  public async delete() {
    const { ctx } = this;
    try {
      let ids = ctx.query.ids || {};

      await this.tagService.removes(ids);
      this.success('success')

    } catch (err) {
      this.success(err)
    }
  }
  @put('/')
  public async update() {
    const { ctx } = this;
    try {
      let _id = ctx.query._id || {};
      let data: TagInfo = ctx.request.body

      await this.tagService.update(_id, data);
      this.success('success')

    } catch (err) {
      this.success(err)
    }
  }
}
