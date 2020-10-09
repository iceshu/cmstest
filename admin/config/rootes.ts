const routes = [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                name: 'login',
                path: '/user/login',
                component: './user/login',
            },
        ],
    },
    {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
    },
    {
        path: '/post',
        name: 'post',
        icon: 'smile',
        routes: [
            {
                path: '/post/add',
                name: 'post-add',
                icon: 'smile',
                component: './post/add',
            },
            {
                path: '/post/list',
                name: 'post-list',
                icon: 'smile',
                component: './post/list',
            },
        ],
    },
    {
        path: '/category',
        name: 'category',
        icon: 'smile',
        routes: [
            {
                path: '/category/',
                name: 'category-list',
                icon: 'smile',
                component: './category/index',
            },
        ],
    },
    {
        path: '/common',
        name: 'common',
        icon: 'smile',
        routes: [
            {
                path: '/common/backu',
                name: 'backupdata',
                icon: 'smile',
                component: './common/backup',
            },
            {
                path: '/common/configcenter',
                name: 'configcenter',
                icon: 'smile',
                component: './configcenter/index',
            },
        ],
    },
    {
        path: '/tag',
        name: 'tag',
        icon: 'smile',
        routes: [
            {
                path: '/tag/',
                name: 'tag-list',
                icon: 'smile',
                component: './tag/index',
            },
        ],
    },
    {
        path: '/admin',
        name: 'admin',
        icon: 'crown',
        access: 'canAdmin',
        component: './Admin',
        routes: [
            {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
            },
        ],
    },
    {
        name: 'list.table-list',
        icon: 'table',
        path: '/list',
        component: './ListTableList',
    },
    {
        path: '/',
        redirect: '/welcome',
    },
    {
        component: './404',
    },
]
export default routes