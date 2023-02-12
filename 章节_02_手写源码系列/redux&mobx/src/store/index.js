import { combineReducers, createStore } from "./redux";

let initState = {
    counter: {count: 0},
    info: {age: 18},
}

function counterReducer(state, action) {
    switch(action.type) {
        case 'INCREMENT_COUNT':
            return { count: state.count + 1};
        case 'DECREMENT_COUNT':
            return { count: state.count - 1};
        default: 
            return state;
    }
  }
  
  function infoReducer(state, action) {
    switch(action.type) {
        case 'INCREMENT_INFO':
            return { age: state.age + 1};
        case 'DECREMENT_INFO':
            return {  age: state.age - 1};
        default: 
            return state;
    }
  }

  const reducers = combineReducers({
    counter: counterReducer,
    info: infoReducer,
  })

  const store = createStore(reducers, initState);

  export default store;
  