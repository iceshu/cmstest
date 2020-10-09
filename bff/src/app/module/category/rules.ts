'use strict';
export const categoryRule = {
    name: [
        {
            required: true,
            message: '类名不能为空',
            min: 1,
            type: "string",
            max: 12,
        },
    ],
};
