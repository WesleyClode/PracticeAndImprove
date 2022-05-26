import { ADD_MONEY, SUB_MONEY, INCREMENT, DECREMENT, GET_USERINFO } from './canstants'
// import axios from 'axios'
// import '../moke'

// 也可以是对象写法
// export const addAction = {
//     type: ADD_MONEY,
//     num: 10
// }

export const addAction = num => ({
    type: ADD_MONEY,
    num
})

export const subAction = num => ({
    type: SUB_MONEY,
    num
})

export const incAction = num => ({
    type: INCREMENT,
    num
})

export const decAction = num => ({
    type: DECREMENT,
    num
})

export const getUserInfoAction = userinfo => ({
    type: GET_USERINFO,
    userinfo
})

// 通过指定的中间件,action创建对象除了范湖对象以外还可以返回一个函数
export const getHomeAction = async (dispatch) => {
    // const {data} = await axios.get('/mock')
    // console.log(data)
    // dispatch(getUserInfoAction(data.userinfo))
}
