'use strict';
export const configRule = {
    label: [
        {
            required: true,
            message: '类名不能为空',
            type: "string",
        },
    ],
    remark: [
        {
            required: true,
            message: 'remark',
            type: "string",
        },
    ],
    value: [
        {
            required: true,
            message: '类名不能为空',
            type: "object",
        },
    ],
};
