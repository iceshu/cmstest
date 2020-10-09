import { Context, controller, get, inject, post, del, put, provide } from 'midway'

import { CategoryService } from './category.service'
import BaseController from '../../core/base.controller'
import { TagObj, TagInfo } from './category.model'
import { categoryRule } from './rules'


@provide()
@controller('/api/category')
export class CategoryApiController extends BaseController {

  constructor(
    @inject() private categoryService: CategoryService,

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

      let tagList: Array<TagObj> = await this.categoryService.find({ isPaging: "0" }, queryObj);
      this.success(tagList)

    } catch (err) {
      this.failed(err)
    }

  }



  @get('/getOne')
  public async getItem() {
    const { ctx } = this;

    try {

      let payload = ctx.query;

      let queryObj = Object.assign({
        isPaging: '0'
      }, payload)

      let tagItem: TagObj = await this.categoryService.item(queryObj);
      this.success(tagItem)

    } catch (err) {
      this.failed(err)
    }

  }
}

@provide()
@controller('/manage/category', { middleware: ['AuthMiddleware'] })
export class CategoryManageController extends BaseController {

  constructor(
    @inject() private categoryService: CategoryService,
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

      const validateResult = await this.ctx.validate(categoryRule, fields);

      if (!validateResult) return;
      await this.categoryService.create(fields);
      this.success('success')

    } catch (err) {
      this.success(err)
    }
  }

  @del('/')
  public async delete() {
    const { ctx } = this;
    try {
      let ids = ctx.query.ids || {};

      await this.categoryService.removes(ids);
      this.success('success')

    } catch (err) {
      this.success(err)
    }
  }
  @put('/')
  public async update() {
    const { ctx } = this;
    try {
      let _id = ctx.query.id || {};
      let data: TagInfo = ctx.request.body

      await this.categoryService.update(_id, data);
      this.success('success')

    } catch (err) {
      this.success(err)
    }
  }
}
