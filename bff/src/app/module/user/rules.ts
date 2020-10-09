'use strict';
export const userRule = {
    userName: [
        { required: true, message: '用户名不能为空' },
    ],
    passWord: [
        { required: true, message: '密码不能为空' },
    ],
};

