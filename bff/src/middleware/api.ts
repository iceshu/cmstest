import { WebMiddleware, Middleware, provide } from 'midway'


@provide()
export class ApiMiddleware implements WebMiddleware {

  public resolve(): Middleware {
    return async (ctx: any, next: any) => {
      ctx.api = {
        reqTimeStr: new Date().toLocaleString(),
      }
      await next()
    }
  }

}
