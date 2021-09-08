import { createStore, applyMiddleware, combineReducers, compose } from 'redux'; // createStore 方法创建一个stort对象
import reduxThunk from 'redux-thunk'
import reduxPromsie from 'redux-promise'
import zhedie from './reducers/zhedie'
import role from './reducers/role'
import right from './reducers/right'
// 创建一个reducer  "修改状态"（接受老状态 修改的值 深复制之后 再返回一个新状态）
const reducer = combineReducers({
    isCollapsed: zhedie,
    rightList: right,
    roleList: role
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk, reduxPromsie)))
// 默认cation 只能是普通对象
// 创建 store的时候 顺便应用中间件thunk  如果action 是函数  我来处理

export default store