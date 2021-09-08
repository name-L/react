import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router'
// import store from '../../redux/stoer';
import { connect } from 'react-redux';
const { Header } = Layout;
class TopHeader extends Component {
    state = {
        collapsed: true,
    };
    roleName = JSON.parse(localStorage.getItem('users')).roleName
    username = JSON.parse(localStorage.getItem('users')).username
    menu = <Menu>
        <Menu.Item key="0">
            <div>{this.roleName}</div>
        </Menu.Item>
        <Menu.Item key="1">
            <div onClick={() => this.exit()}>退出</div>
        </Menu.Item>
    </Menu>
    toggle = (isCollapsed) => {
        // 发布者
        // store.dispatch({
        //     type:"Mylele",
        //     payload:isCollapsed
        // })
        this.props.actionCreator(isCollapsed)
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    exit = () => {
        console.log(111);
        localStorage.setItem("isLogin", false)
        localStorage.setItem("users", JSON.stringify({}))
        //重定向    
        // this.props.history.push("/login")
        window.location.reload()
    }
    render() {
        return (
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => this.toggle(this.state.collapsed),
                })}
                {/* {
                    this.state.collapsed ?
                        <MenuUnfoldOutlined onClick={this.toggle} className="trigger"></MenuUnfoldOutlined> :
                        <MenuFoldOutlined onClick={this.toggle} className="trigger"></MenuFoldOutlined>
                } */}
                <div style={{ float: "right", margin: "0 16px" }}>
                    欢迎{this.username}回来
                    <Dropdown overlay={this.menu}>
                        {/* <Avatar size={'large'} icon={<UserOutlined />} /> */}
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </Dropdown>
                </div>
            </Header>
        )
    }
}
const mapStateToProps = () => {
    return {

    }
}
const mapDispathToProps ={
    actionCreator: (isCollapsed) => {
        return {
            type: "Mylele",
            payload: isCollapsed
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispathToProps)(TopHeader))