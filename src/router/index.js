import {
    HashRouter as Router,//路由外层 需要包裹的组件
    Route,// 每个路由组件都需要此组件
    Switch, //只匹配第一个符合条件的组件
    Redirect
} from 'react-router-dom'
import React, { Component } from 'react';
import DashBorad from '../views/dashBorad/DashBoard'
import Login from '../views/login/Login'
class BlogRouter extends Component {
    render() {
        return <Router>
            <Switch>
                <Route path="/login" component={Login}></Route>
                {/* {
                    localStorage.getItem("isLogin") === "true" ?
                        <Route path="/" component={DashBorad}></Route>
                        : <Redirect to="/login"></Redirect>
                } */}
                <Route path="/" render={()=>{
                    return localStorage.getItem("isLogin")==="true"?
                    <DashBorad></DashBorad>
                    :<Redirect to="/login"></Redirect>
                }}></Route>
            </Switch>
        </Router>
    }
}

//函数式
// const BlogRouter = () => {
//     return <HashRouter>
//         <Route path="/home" component={Home}></Route>
//         <Route path="/login" component={Login}></Route>
//     </HashRouter>
// }
export default BlogRouter