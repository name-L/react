import {//路由外层 需要包裹的组件
    Route,// 每个路由组件都需要此组件
    Redirect, //重定向
    Switch,
    // NavLink //只匹配第一个符合条件的组件
} from 'react-router-dom'
import React, { Component } from 'react'
import Home from '../home/Home'
import Users from '../useamage/Users';
import Manage from '../raghtmange/Manage';
import Role from '../raghtmange/Role';
import Right from '../raghtmange/Right';
import Cull from '../cull/Cull';
import './index.css'
import List from '../list/List';
import Preview from '../list/Preview';
import { Layout } from 'antd';
import TopHeader from './TopHeader'
import SiderMenu from './SiderMenu'
import Create from '../list/Create';
import Update from '../list/Update';
const { Content } = Layout;
export default class DashBoard extends Component {
    // state = {
    //     collapsed: false,
    // };
    componentDidMount() {
        console.log(this.props);

    }

    // toggle = () => {
    //     this.setState({
    //         collapsed: !this.state.collapsed,
    //     });
    // };
    render() {
        var roleType = JSON.parse(localStorage.getItem('users')).roleType
        return (
            <Layout style={{ height: "100%" }}>
                {/* <SiderMenu history={this.props.history}></SiderMenu> */}
                {/* 亲爹组件 */}

                <SiderMenu></SiderMenu>
                {/* 干爹组件 */}

                <Layout className="site-layout">
                    <TopHeader></TopHeader>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: "auto", //超出部分修复
                        }}
                    >
                        <Switch>
                            {/* 首页 */}
                            <Route path="/home" component={Home}></Route>
                            {/* 用户管理-用户列表 */}
                            {
                                roleType === 3 ? <Route path="/user-manage/users" component={Users}></Route> : null
                            }
                            {/* 文章管理-列表 -预览  动态路由*/}
                            <Route path="/article-manage/list" component={List}></Route>
                            <Route path="/article-manage/preview/:myid" component={Preview}></Route>
                            <Route path="/article-manage/update/:myid" component={Update}></Route>
                            <Route path="/article-manage/create" component={Create}></Route>
                            {/* <Route path="/right-manage" component={Manage}></Route> */}
                            {/* 权限管理-角色和权限 */}
                            {
                                roleType === 3 ?
                                    <Route path="/right-manage" render={() => {
                                        return <Manage>
                                            <Switch>
                                                <Route path="/right-manage/role" component={Role}></Route>
                                                <Route path="/right-manage/right" component={Right}></Route>
                                                <Redirect from="/right-manage" to="/right-manage/role"></Redirect>
                                            </Switch>
                                        </Manage>
                                    }}></Route> : null
                            }
                            {/* 重定向 */}
                            <Redirect from="/" to="/home" exact></Redirect>
                            <Route path="*" component={Cull}></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>

        )
    }
}
