import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
/*
redux三大要素
store
action
reducer
*/

/*
    redux-thunk 是一个中间件
    在dispatch(action)之后
    reducer处理逻辑之前
    等于是对dispatch(action)的增强
*/
// applyMiddleware是redux原生的方法,将所有的中间件组成一个数组,依次执行,返回一个store对象
const storeEnhancer = applyMiddleware(thunk)

// storeEnhancer是一个增强型的store，其实是一个高阶函数
const store = createStore(reducer, storeEnhancer)

export default store