import React from 'react'
import store from './index';
import { Observer, useLocalObservable } from 'mobx-react';
import { makeObservable, observable } from 'mobx';
import action from '../1_actions/action';

export default function A() {

    const r_store = useLocalObservable(() => store);


  return (
    <div>
        <Observer>
            {
                () => (
                    <div>
                        <h2>{r_store.count}</h2>
                        <button onClick={() => r_store.add_count()}>add</button>
                        <button onClick={() => r_store.minus_count()}>minus</button>
                    </div>
                )
            }
        </Observer>
    </div>
  )
}

class B extends React.Component {
    constructor() {
        super()
        makeObservable(this)
    }

    name = observable({ value: '麓一'})

    @action
    handleClick = () => {
        this.name.value = '云隐'
    }
}
