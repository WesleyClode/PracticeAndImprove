import React from 'react';
import { createData, combination } from './data';

let init = {
    count: {
      num: 0
    },
    info: {
        age: 18
    }
};

//  你如果不是我想要的固定的改法，我就不让你改。
// 我提供你，只有 INCREMENT 和 DECREMENT 两种操作，其他的，不行
function mySetCount(data, deal) {
  switch(deal.type) {
      case 'INCREMENT_COUNT':
          return { ...data, num: data.num + 1};
      case 'DECREMENT_COUNT':
          return { ...data, num: data.num - 1};
      default: 
          return data;
  }
}

function mySetInfo(data, deal) {
  switch(deal.type) {
      case 'INCREMENT_INFO':
          return { ...data, age: data.age + 1};
      case 'DECREMENT_INFO':
          return { ...data, age: data.age - 1};
      default: 
          return data;
  }
}

let mySetData = combination({
  count: mySetCount,
  info: mySetInfo
})

let dataObj = createData(init, mySetData);

export const combination = function(setDatas) {
  //{count: setCount, info: setInfo}
  const setKeys = Object.keys(setDatas); // count , info
  return function(data = {}, deal) {
    // count -> num：0 、info -> age:18
      const nextData = {};
      // count -> num：1 、info -> age:18
      setKeys.forEach(key => {
          const setData = setDatas[key]; // mySetCount
          const prevKeyData = data[key]; // num: 0
          const nextKeyData = setData(prevKeyData, deal); // num:1
          nextData[key] = nextKeyData;
      })
      return nextData;
  }
}



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
