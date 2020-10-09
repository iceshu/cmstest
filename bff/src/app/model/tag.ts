
import { Application } from 'midway'
import * as shortid from 'shortid';
import dayjs from 'dayjs'

module.exports = (app: Application) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    var ContentTagSchema = new Schema({
        _id: {
            type: String,
            'default': shortid.generate
        },
        name: String,
        alias: String, //别名
        date: {
            type: Date,
            default: Date.now
        }
    });

    ContentTagSchema.set('toJSON', {
        getters: true,
        virtuals: true
    });
    ContentTagSchema.set('toObject', {
        getters: true,
        virtuals: true
    });

    ContentTagSchema.path('date').get((v: any) => (dayjs(v).format("YYYY-MM-DD HH:mm:ss")));

    return mongoose.model("Tag", ContentTagSchema, 'tag');

}