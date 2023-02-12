const thunk = store => next => action => {
    const { dispatch, getState } = store;
    return typeof action === 'function' ? action(store.dispatch): next(action)
}

const login = (username) => (dispatch) => {
    dispatch({type: 'login_start'})
    request.post('/api/login', {username},() => {
        dispatch({type: 'success', payload: username})
    })
}

store.dispatch(login('luyi'))