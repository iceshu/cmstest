import { EggAppInfo } from 'midway'

import { DefaultConfig } from './config.modal'


export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1592710093666_4865';

  // add your config here
  config.middleware = []

  config.welcomeMsg = 'Hello midwayjs!'
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/blog',
      options: {
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
    },
  };
  config.validatePlus = {
    resolveError(ctx: any, errors: any) {
      if (errors.length) {
        ctx.type = 'json';
        ctx.status = 400;
        ctx.body = {
          code: 400,
          error: errors,
          message: '参数错误',
        };
      }
    }
  };
  config.jwt = {
    secret: '21312314154',
    expiresIn: '24h',
  }
  return config
}
