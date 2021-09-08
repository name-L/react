import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import menus from '../../router/menu'
import { withRouter } from 'react-router' // 路由的干爹组件
// import store from '../../redux/stoer'
import { connect } from 'react-redux';
const { Sider } = Layout;
const { SubMenu } = Menu;
class SiderMenu extends Component {
    // state = {
    //     collapsed: false,
    // };
    componentDidMount() {
        // this.unscribe = store.subscribe(() => {
        //     console.log("有人通知我更新了", store.getState());
        //     this.setState({
        //         collapsed: store.getState().isCollapsed
        //     })
        // })
    }
    // componentWillUnmount() {
    //     this.unscribe()
    // }

    render() {
        var pathname = this.props.location.pathname
        var openkeys = ["/" + pathname.split("/")[1]]
        var defaultSelectedKeys = [pathname]
        return (
            <Sider trigger={null} collapsible collapsed={/*this.state.collapsed*/this.props.isCollapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.onclick} defaultOpenKeys={openkeys}
                    // defaultSelectedKeys={defaultSelectedKeys} //只有组件第一次创建的时候会生效
                    selectedKeys={defaultSelectedKeys} //会跟随你生效
                >
                    {this.renderItem(menus)}

                </Menu>
            </Sider>
        )
    }
    onclick = (obj) => {
        this.props.history.push(obj.key)

    }
    renderItem = (menus) => {
        // 根据当前用户的roleType进行判断 是否该渲染
        var roleType = JSON.parse(localStorage.getItem('users')).roleType
        return menus.map(el => {
            if (el.children) {
                if (el.permission > roleType) {
                    return null
                }
                return (
                    <SubMenu
                        key={el.path}
                        title={
                            <span>
                                <el.icon></el.icon>
                                <span>{el.title}</span>
                            </span>
                        }
                    >
                        {
                            //递归
                            this.renderItem(el.children)
                        }
                    </SubMenu>
                )
            } else {
                if (el.permission > roleType) {
                    return null
                }
                return (
                    <Menu.Item key={el.path}>
                        <el.icon></el.icon>
                        <span>{el.title}</span>
                    </Menu.Item>
                )
            }
        })
    }
}
const mapStateToProps = (state) => {
    return {
        isCollapsed: state.isCollapsed
    }
}
export default withRouter(connect(mapStateToProps)(SiderMenu))
