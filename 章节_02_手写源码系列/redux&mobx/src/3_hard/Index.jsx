import React from 'react';
import { createData } from './data';

let init = {
    count: 0,
    info: {
        age: 18
    }
};

let dataObj = createData(init);
dataObj.subscribe(() => {
    let currentData = dataObj.getData();
    console.log('the subscribed data is: ', currentData);
});


export default function Index() {
  return (
    <div>
        <button onClick={() => { dataObj.hardSetData({type: "INCREMENT"}) }}>change1</button>
        <button onClick={() => { dataObj.hardSetData({type: "DECREMENT"})  }}>change2</button>
        <button onClick={() => { dataObj.hardSetData({type: "REMOVE"})  }}>REMOVE</button>
    </div>
  )
}
