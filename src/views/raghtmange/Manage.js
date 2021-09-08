import React, { Component } from 'react'
import { Tabs } from 'antd';
import { withRouter } from 'react-router'
const { TabPane } = Tabs;

// import { Route, Redirect, Switch } from 'react-router-dom'
// import Role from './Role'
// import Right from './Right'
class Manage extends Component {
    callback = (data) => {
        this.props.history.push(data)
    }
    render() {
        return (
            <div>
                <Tabs activeKey={this.props.location.pathname} onChange={this.callback}>
                    <TabPane tab="角色列表" key="/right-manage/role">
                        {this.props.children}
                    </TabPane>
                    <TabPane tab="权限列表" key="/right-manage/right">
                        {this.props.children}
                    </TabPane>

                </Tabs>,
                {/* <Switch>
                    <Route path="/right-manage/role" component={Role}></Route>
                    <Route path="/right-manage/right" component={Right}></Route>
                    <Redirect from="/right-manage" to="/right-manage/role"></Redirect>
                </Switch> */}
            </div>
        )
    }
}
export default withRouter(Manage)