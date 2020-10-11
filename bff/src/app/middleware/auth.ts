"use strict";
import { provide, plugin, config } from "midway";
import { Context } from "egg";
import { IWebMiddleware, IMidwayWebNext } from "@midwayjs/web";

import * as _ from "lodash";

@provide("AuthMiddleware")
export class AuthMiddleware implements IWebMiddleware {
  @plugin()
  jwt: any;

  @config("jwt")
  jwtconfig!: any;

  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      try {
        const token = ctx.get("Authorization");
        if (_.isEmpty(token)) {
          ctx.status = 401;
          ctx.body = {
            errcode: 886,
            msg: "授权失败，请重新登录",
          };
          return;
        }
        const { secret } = this.jwtconfig;
        const decode = this.jwt.verify(token, secret);
        ctx.state.userId = decode.id;
        await next(); // 这里因为next之后的操作是异步的所以需要加 await
      } catch (err) {
        ctx.status = 401;
        ctx.body = {
          errcode: 886,
          msg: "授权失败，请重新登录",
        };
      }
    };
  }
}
