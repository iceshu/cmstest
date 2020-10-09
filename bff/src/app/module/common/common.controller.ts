import {
  Context,
  config,
  controller,
  get,
  provide,
  post,
  inject,
} from "midway";
import BaseController from "../../core/base.controller";
import * as path from "path";
import { uploadStreamFn } from "../../../lib/utils";
import dayjs from "dayjs";
import fs from "fs";

const archiver = require("archiver");
var muri = require("muri");
const child = require("child_process");
const isDev = process.env.NODE_ENV == "development";

@provide()
@controller("/")
export class HomeController extends BaseController {
  constructor(@config() private readonly qiniuConfig: object) {
    super();
  }

  @config("mongoose")
  mongooseConfig!: any;

  @inject()
  baseDir!: any; // 当前项目基础目录 src 或者 dist，绝对路径

  @get("/", { middleware: ["apiMiddleware"] })
  public async index(ctx: Context) {
    const dd = await ctx.model.User.create({
      userName: "admin",
      passWord: "admin",
    });
    //     const dd=await ctx.model.User.find({})
    console.log("1111111111", dd);
    // ctx.body = `${this.welcomeMsg} - ${ctx.api.reqTimeStr}`
    this.success(this.qiniuConfig);
  }

  @get("/checkLogin")
  public ping(ctx: Context): void {
    ctx.body = "OK";
  }

  @post("/manage/upload", { middleware: ["AuthMiddleware"] })
  public async upload() {
    const config: any = { autoFields: true };
    const parts = this.ctx.multipart(config);
    const files = [];

    let stream;
    while ((stream = await parts()) != null) {
      const filename =
        Math.random().toString(36).substr(2) +
        path.extname(stream.filename).toLowerCase();
      const reply = await uploadStreamFn(this, stream, filename);
      files.push(reply);
    }
    this.success(files);

    // const stream = await this.ctx.getFileStream();
    // const filename =
    //   Math.random().toString(36).substr(2) +
    //   path.extname(stream.filename).toLowerCase();
    // const reply = await uploadStreamFn(stream, filename);
    // this.success(reply);
  }

  @post("/manage/backupdata", { middleware: ["AuthMiddleware"] })
  public async backUpData() {
    const ms = dayjs().format("YYYYMMDDHHmmss").toString();
    // console.log('--systemConfigs--', systemConfigs);

    const databackforder = "/databak/";
    const mongoBinPath = "";
    const dataPath = databackforder + ms;

    const parsedUri = muri(this.mongooseConfig.client.url);
    console.log("parsedUri", parsedUri);
    const parameters = [];
    if (parsedUri.auth) {
      parameters.push(
        `-u "${parsedUri.auth.user}"`,
        `-p "${parsedUri.auth.pass}"`
      );
    }
    if (parsedUri.db) {
      parameters.push(`-d "${parsedUri.db}"`);
    }
    const dataPathLast = path.join(this.baseDir, dataPath);
    const cmdstr =
      (isDev ? "" : mongoBinPath) +
      `mongodump ${parameters.join(" ")} -o "${dataPathLast}"`;
    console.log("cmdstr", dataPathLast);
    if (!fs.existsSync(databackforder)) {
      fs.mkdirSync(databackforder);
    }
    if (fs.existsSync(dataPath)) {
      console.log("已经创建过备份了");
    } else {
      fs.mkdirSync(dataPath);

      try {
        child.execSync(cmdstr);
        const doArchive = () => {
          return new Promise((resolve) => {
            const output = fs.createWriteStream(dataPath + ".zip");
            const archive = archiver("zip");

            output.on("close", async () => {
              console.log("back up data success");

              resolve();
            });

            output.on("end", function () {
              console.log("Data has been drained");
            });

            archive.on("error", function (err: RangeError) {
              throw err;
            });

            archive.pipe(output);
            archive.directory(dataPath + "/", false);
            archive.finalize();
          });
        };
        await doArchive();
        this.success("备份成功");
      } catch (error) {
        this.failed(error);
      }
    }
  }
}
