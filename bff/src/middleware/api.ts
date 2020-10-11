import { WebMiddleware, provide } from "midway";

@provide()
export class ApiMiddleware implements WebMiddleware {
  public resolve() {
    return async (ctx: any, next: any) => {
      ctx.api = {
        reqTimeStr: new Date().toLocaleString(),
      };
      await next();
    };
  }
}
