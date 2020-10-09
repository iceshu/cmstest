import * as fs from "fs";
import * as path from "path";
const pump = require("mz-modules/pump");

export const uploadStreamFn = (ctx: any, stream: any, key: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const target = path.join(ctx.baseDir, "src/app/public", key);
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
      resolve(`/public/${key}`);
    } catch (e) {
      reject(e);
    }
  });
};
