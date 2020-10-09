'use strict';
export const postRule = {
    title: [
        { required: true, message: 'title 不能为空' },
    ],
    categories: [
        { type: 'string', required: true }
    ],
    simpleComments: [
        { required: true, message: 'simpleComments 不能为空' },
    ],
};

