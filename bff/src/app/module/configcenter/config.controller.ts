import { Context, controller, get, inject, post, del, put, provide } from 'midway'

import { ConfigService } from './config.service'
import BaseController from '../../core/base.controller'
import { configObj, TagInfo } from './config.model'
import { configRule } from './rules'


@provide()
@controller('/api/config')
export class ConfigApiController extends BaseController {

  constructor(
    @inject() private configService: ConfigService,

  ) {
    super();
  }

  @inject()
  ctx!: Context

  @get('/list')
  public async getList() {
    const { ctx } = this;

    try {

      let queryObj = ctx.query;

      let list: Array<configObj> = await this.configService.find({ isPaging: "0" }, queryObj);
      this.success(list)

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
      let Item: configObj = await this.configService.item(queryObj);
      this.success(Item)

    } catch (err) {
      this.failed(err)
    }

  }
}

@provide()
@controller('/manage/config', { middleware: ['AuthMiddleware'] })
export class ConfigManageController extends BaseController {

  constructor(
    @inject() private configService: ConfigService,
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

      const validateResult = await this.ctx.validate(configRule, fields);

      if (!validateResult) return;
      await this.configService.create(fields);
      this.success('success')

    } catch (err) {
      this.failed(err)
    }
  }

  @del('/')
  public async delete() {
    const { ctx } = this;
    try {
      let ids = ctx.query.ids || {};

      await this.configService.removes(ids);
      this.success('success')

    } catch (err) {
      this.failed(err)
    }
  }
  @put('/')
  public async update() {
    const { ctx } = this;
    try {
      let _id = ctx.query.id || {};
      let data: TagInfo = ctx.request.body

      await this.configService.update(_id, data);
      this.success('success')

    } catch (err) {
      this.failed(err)
    }
  }
}
