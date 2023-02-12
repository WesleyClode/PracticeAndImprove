import React from 'react'

import store from '../store/index';

store.subscribe(() => {
    console.log('logging...', store.getState())
})

export default function Index() {
  return (
    <div><button onClick={() => {
        store.dispatch({ type: 'INCREMENT_INFO' })
    }}>+++</button></div>
  )
}
