import {
  Context,
  controller,
  get,
  inject,
  post,
  del,
  put,
  provide,
} from "midway";
import * as _ from "lodash";

import BaseController from "../../core/base.controller";

import { PostService } from "./post.service";
import { TagService } from "../tag/tag.service";

import { TagObj, TagInfo } from "./post.model";
import { postRule } from "./rules";
import * as shortid from "shortid";

@provide()
@controller("/api/post")
export class PostApiController extends BaseController {
  constructor(
    @inject() private postService: PostService,
    @inject() private tagService: TagService
  ) {
    super();
  }

  @inject()
  ctx!: Context;

  @get("/list")
  public async getList() {
    const { ctx } = this;
    try {
      const {
        current,
        pageSize,
        model,
        sort = "{}",
        searchkey = "",
        isPaging = 1,
        searchkeys = "title",
        filter = "{}",
        tagName,
        ...otherSearch
      } = ctx.query;
      const payload = { current, pageSize, searchkey, isPaging };

      const queryObj: any = {
        state: "0",
        ...otherSearch,
      };
      let sortObj: any = {
        date: -1,
      };

      if (_.isObject(sort)) {
        sortObj = Object.assign({}, sortObj, sort);
      }

      const populate = [
        {
          path: "categories",
          select: "name _id defaultUrl",
        },
        {
          path: "tags",
          select: "name _id",
        },
      ];

      if (model == "1") {
        queryObj.isTop = 1;
      }

      if (tagName) {
        const targetTag = await this.tagService.item({
          query: {
            name: tagName,
          },
        });

        if (!_.isEmpty(targetTag)) {
          queryObj.tags = targetTag._id;
          delete queryObj.categories;
        }
      }
      const searchKeys = searchkeys.split(",") || ["title"];
      //current=1&pageSize=20&title=fetch%20body&sort=%7B%7D&filter=%7B%7D&searchkey=body&searchKeys=title
      const contentList = await this.postService.find(payload, {
        sort: sortObj,
        query: queryObj,
        searchKeys,
        populate,
        files: "_id title sImg date updateDate  roofPlacementstate",
      });

      this.success(contentList);
    } catch (err) {
      console.log(err);
      this.failed(err);
    }
  }

  @get("/getOne")
  public async getItem() {
    const { ctx } = this;

    try {
      const query = ctx.query;

      const postInfo: TagObj = await this.postService.item({
        query,
      });
      this.success(postInfo);
    } catch (err) {
      this.failed(err);
    }
  }

  @get("/getPostNearBy")
  public async getPostNearBy() {
    const { ctx } = this;

    try {
      const { _id: contentId } = ctx.query;

      if (!contentId || !shortid.isValid(contentId)) {
        this.failed("validate_error_params");
        return;
      }

      let postInfo = await this.postService.item({
        query: {
          _id: contentId,
        },
        files: "title _id id data updateDate",
      });
      let preContent = await this.postService.item({
        query: {
          _id: {
            $ne: postInfo._id,
          },
          updateDate: {
            $lte: new Date(postInfo.updateDate),
          },
        },
        files: "title _id id data updateDate sImg discription",
      });

      let nextContent = await this.postService.item({
        query: {
          _id: {
            $ne: postInfo._id,
          },
          updateDate: {
            $gte: new Date(postInfo.updateDate),
          },
        },
        files: "title _id id data updateDate sImg discription",
      });

      this.success([preContent, nextContent]);
    } catch (err) {
      this.failed(err);
    }
  }
}

@provide()
@controller("/manage/post", { middleware: ["AuthMiddleware"] })
export class PostManageController extends BaseController {
  constructor(@inject() private postService: PostService) {
    super();
  }

  @inject()
  ctx!: Context;

  @post("/")
  public async create() {
    const { ctx } = this;
    try {
      const fields: any = ctx.request.body || {};

      const validateResult = await this.ctx.validate(postRule, fields);

      if (!validateResult) {
        return;
      }
      await this.postService.create(fields);
      this.success("success");
    } catch (err) {
      this.success(err);
    }
  }

  @del("/")
  public async delete() {
    const { ctx } = this;
    try {
      const ids = ctx.query.ids || {};

      await this.postService.removes(ids);
      this.success("success");
    } catch (err) {
      this.success(err);
    }
  }

  @put("/")
  public async update() {
    const { ctx } = this;
    try {
      const _id = ctx.query.id || {};
      const data: TagInfo = ctx.request.body;

      await this.postService.update(_id, data);
      this.success("success");
    } catch (err) {
      this.success(err);
    }
  }
}
