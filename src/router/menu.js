import {
    GithubOutlined,
    FormOutlined,
    AlignLeftOutlined,
} from '@ant-design/icons';
const menus = [
    {
        title: "首页",
        path: "/home",
        icon: GithubOutlined,
        permission:1
    },
    {
        title: "用户管理",
        path: "/user-manage",
        icon: FormOutlined,
        permission:3,
        children: [
            {
                title: "用户列表",
                path: "/user-manage/users",
                icon: AlignLeftOutlined,
                permission:3
            }
        ]
    },
    {
        title: "权限管理",
        path: "/right-manage",
        icon: FormOutlined,
        permission:3,
        children: [
            {
                title: "角色列表",
                path: "/right-manage/role",
                icon: AlignLeftOutlined,
                permission:3
            },
            {
                title: "权限列表",
                path: "/right-manage/right",
                icon: AlignLeftOutlined,
                permission:3
            }
        ]
    },
    {
        title: "文章管理",
        path: "/article-manage",
        icon: FormOutlined,
        permission:1,
        children: [
            {
                title: "文章管理",
                path: "/article-manage/list",
                icon: AlignLeftOutlined,
                permission:1
            },
            {
                title: "文章分类",
                path: "/article-manage/preview/:myid",
                icon: AlignLeftOutlined,
                permission:2
            }
        ]
    }
]

export default menus