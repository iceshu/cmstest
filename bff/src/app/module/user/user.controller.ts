import { Context, controller, post, inject, config, provide, plugin } from 'midway'

import { UserService } from './user.service'
import BaseController from '../../core/base.controller'
import * as _ from 'lodash'
import { userRule } from './rules'
@provide()
@controller('/api/user')
export class UserApiController extends BaseController {

  constructor(
    @inject() private userService: UserService,

  ) {
    super();
  }

  @config('jwt')
  jwtconfig!: any

  @inject()
  ctx!: Context

  @plugin()
  jwt!: any;

  @post('/login')
  async loginAction() {
    const { ctx, userService } = this;
    const { body } = ctx.request;
    const validateResult = await this.ctx.validate(userRule, body);
    if (!validateResult) return;
    const { userName, passWord } = body;
    const files: any = { passWord: 1, userName: 1 }
    const dd = await userService.item({ query: { userName }, files });
    if (dd) {
      const isSuccess = await ctx.helper.compare(dd.passWord, passWord);
      if (!isSuccess) {
        this.failed('用户名或者密码不对');
        return;
      }
    }
    else {
      this.failed('用户名或者密码不对');
      return;
    }
    const { secret, expiresIn } = this.jwtconfig;
    const token = this.jwt.sign({ userName, id: dd._id }, secret, { expiresIn });
    this.success(token);
  }

  @post('/reg')
  public async create() {
    const { userService, ctx } = this;
    const { body } = ctx.request
    const validateResult = await this.ctx.validate(userRule, body)
    if (!validateResult) return
    try {
      const dd = await userService.create(body)
      this.success(dd)
    } catch (e) {
      this.error(e)
    }

  }
}

