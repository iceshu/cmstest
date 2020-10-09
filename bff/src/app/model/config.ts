// eslint-disable-next-line strict
import { Application } from 'midway'
import * as shortid from 'shortid';
import dayjs from 'dayjs'

module.exports = (app: Application) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema;

    var ConfigSchema = new Schema({
        _id: {
            type: String,
            default: shortid.generate,
        },
        label: { type: String, required: true, unique: true },
        value: { type: Object },
        remark: { type: String },
        date: {
            type: Date,
            default: Date.now,
        },
        updateDate: {
            type: Date,
            default: Date.now,
        }, // 更新时间
        open: { type: String, default: true },
    });
    ConfigSchema.set('toJSON', {
        getters: true,
        virtuals: true
    });
    ConfigSchema.set('toObject', {
        getters: true,
        virtuals: true
    });


    ConfigSchema.path('date').get(function (v: Date) {
        return dayjs(v).format('YYYY-MM-DD HH:mm:ss');
    });
    ConfigSchema.path('updateDate').get(function (v: Date) {
        return dayjs(v).format('YYYY-MM-DD HH:mm:ss');
    });
    return mongoose.model('Config', ConfigSchema);

}
