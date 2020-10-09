import { Application } from "midway";
import * as shortid from "shortid";
import dayjs from "dayjs";

module.exports = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var PostSchema = new Schema({
    _id: {
      type: String,
      default: shortid.generate,
    },
    title: String,
    categories: [
      {
        type: String,
        ref: "Category",
      },
    ], //文章类别
    tags: [
      {
        type: String,
        ref: "Tag",
      },
    ], // 标签
    sImg: {
      type: String,
      default: "/upload/images/defaultImg.jpg",
    }, // 文章小图
    sImgType: {
      type: String,
      default: "2",
    }, // 首图类型 1：自动生成 2：本地上传
    cover: String, // 封面id
    discription: String,
    date: {
      type: Date,
      default: Date.now,
    },
    updateDate: {
      type: Date,
      default: Date.now,
    }, // 更新时间
    state: {
      type: String,
      default: "0",
    }, // 0草稿 1待审核 2审核通过 3下架
    draft: {
      type: String,
      default: "0",
    }, // 是否进入回收站 1:是  0:否
    isTop: {
      type: Number,
      default: 0,
    }, // 是否推荐，默认不推荐 0为不推荐，1为推荐
    roofPlacement: {
      type: String,
      default: "0",
    }, // 是否置顶，默认不置顶 0为不置顶，1为置顶
    comments: String,
    simpleComments: "",
  });

  PostSchema.index({
    state: 1,
    uAuthor: 1,
  }); // 添加索引

  PostSchema.set("toJSON", {
    getters: true,
    virtuals: true,
  });
  PostSchema.set("toObject", {
    getters: true,
    virtuals: true,
  });

  PostSchema.path("date").get((v: any) =>
    dayjs(v).format("YYYY-MM-DD HH:mm:ss")
  );
  PostSchema.path("updateDate").get((v: any) =>
    dayjs(v).format("YYYY-MM-DD HH:mm:ss")
  );

  return mongoose.model("Post", PostSchema, "post");
};
