'use strict';
export const tagRule = {
    name: [
        {
            required: true,
            message: 'tag不能为空',
            min: 1,
            type: "string",
            max: 12,
        },
    ],
};
