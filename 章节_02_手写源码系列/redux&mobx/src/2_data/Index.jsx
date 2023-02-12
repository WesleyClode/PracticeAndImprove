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
        <button onClick={() => { dataObj.changeData({num: 1}) }}>change1</button>
        <button onClick={() => { dataObj.changeData({ ...dataObj.getData(), count:dataObj.getData().count + 1}) }}>change2</button>
    </div>
  )
}
