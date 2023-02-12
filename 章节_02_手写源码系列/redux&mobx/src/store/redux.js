export const createStore = function(reducer, initState) {
    let listeners = [];
    let state = initState;

    function subscribe(listener) {
        // 我们希望，订阅了数据的handler，在数据改变时，都能执行。
        listeners.push(listener);
    };

    function dispatch(action) {
        // 单向数据流，而不是双向绑定。
        const newState = reducer(state, action);
        state = newState;
        listeners.forEach(fn => fn());
    }

    dispatch({ type: Symbol() });

    // 如果别人想要获取数据？
    function getState() {
        return state;
    };

    return {
        getState, subscribe, dispatch
    }
}

export const combineReducers = function(reducers) {
    //{count: setCount, info: setInfo}
    const keys = Object.keys(reducers); // count , info
    return function(state = {}, action) {
        const nextState = {};
        // count -> num：1 、info -> age:18
        keys.forEach(key => {
            const reducer = reducers[key]; // mySetCount
            const prev = state[key]; // num: 0
            const next = reducer(prev, action); // num:1
            nextState[key] = next;
        })
        return nextState;
    }
  }