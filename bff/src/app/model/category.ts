import { Application } from 'midway'
import * as shortid from 'shortid';
import dayjs from 'dayjs'

module.exports = (app: Application) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema;

    var ContentCategorySchema = new Schema({
        _id: {
            type: String,
            'default': shortid.generate
        },
        name: String,
        keywords: String,
        sortId: {
            type: Number,
            default: 1
        }, // 排序 正整数
        parentId: {
            type: String,
            default: "0"
        },
        enable: {
            type: Boolean,
            default: true
        }, //是否公开 默认公开
        date: {
            type: Date,
            default: Date.now
        },
        sImg: {
            type: String
        },
    });

    ContentCategorySchema.index({
        creator: 1
    }); // 添加索引

    ContentCategorySchema.set('toJSON', {
        getters: true,
        virtuals: true
    });
    ContentCategorySchema.set('toObject', {
        getters: true,
        virtuals: true
    });

    ContentCategorySchema.path('date').get((v: any) => (dayjs(v).format("YYYY-MM-DD HH:mm:ss")));


    return mongoose.model("Category", ContentCategorySchema, 'category');

}