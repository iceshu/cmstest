import { inject, provide, Context } from 'midway';
@provide()
export default class BaseController {
    @inject()
    ctx!: Context;

    public success(data: any) {
        this.ctx.body = {
            success: true,
            data
        }
    }
    public notFound(msg: string) {
        msg = msg || 'not found';
        this.ctx.throw(404, msg);
    }

    public failed(msg: string) {
        msg = msg || 'not found';
        this.ctx.body = {
            success: false,
            msg,
        };
        return;
    }
    public error(msg: any) {
        msg = msg || 'not found';
        this.ctx.logger.error(msg)
        this.ctx.body = {
            success: false,
            msg,
        };
        return;
    }
}
