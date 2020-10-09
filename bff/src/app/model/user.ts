import { Application } from 'midway'
import * as shortid from 'shortid';

module.exports = (app: Application) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        _id: {
            type: String,
            default: shortid.generate,
        },
        userName: { type: String, unique: true, required: true },
        passWord: { type: String, required: true },
    });

    return mongoose.model('User', UserSchema, 'user');
}