import { ADD_MONEY, SUB_MONEY, INCREMENT, DECREMENT, GET_USERINFO } from './canstants'

const defaultState = {
    money: 0,
    userinfo: []
}

const reducer = (state=defaultState, action) => {
    switch(action.type) {
        case ADD_MONEY:
            return {...state, money: state.money + action.num}
        case SUB_MONEY:
            return {...state, money: state.money - action.num}
        case INCREMENT:
            return {...state, money: state.money + 1}
        case DECREMENT:
            return {...state, money: state.money - 1}
        case GET_USERINFO:
            return {...state, userinfo: action.userinfo}
        default:
            return state
    }
}

export default reducer