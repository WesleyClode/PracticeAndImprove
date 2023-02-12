import React, {useContext, useState, useEffect } from 'react';

import ReduxContext from './context';

export const connect = (mapStateToProps, mapDispatchToProps) => Component => {
    function Connect(props) {
        const store = useContext(ReduxContext);
        const [count, setCount] = useState(true);
        const forceUpdate = () => setCount(val => !val)
        useEffect(() => store.subscribe(forceUpdate), []);
        return (
            <ReduxContext.Consumer>
                {
                    store => <>
                        <Component 
                            {...props}
                            {...mapStateToProps(store.getState())}
                            {...mapDispatchToProps(store.dispatch)}
                        >

                        </Component>
                    </>
                }
            </ReduxContext.Consumer>
        )
    }

    return Connect;
}