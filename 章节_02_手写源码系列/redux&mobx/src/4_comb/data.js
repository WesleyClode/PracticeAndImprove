export const createData = function(init, mySetData) {
    let deps = [];
    let data = init;

    function subscribe(handler) {
        // 我们希望，订阅了数据的handler，在数据改变时，都能执行。
        deps.push(handler);
    };

    function changeData(newData) {
        // 我们提供一个方法，去改变数据
        data = newData;
        deps.forEach(fn => fn());
    };

    function hardSetData(deal) {
        data = mySetData(data, deal);
        deps.forEach(fn => fn());
    }

    // 如果别人想要获取数据？
    function getData() {
        return data;
    };

    return {
        getData, subscribe, changeData, hardSetData
    }
}

export const combination = function(setDatas) {
    //{count: setCount, info: setInfo}
    const setKeys = Object.keys(setDatas);
    return function(data = {}, deal) {
        const nextData = {};
        setKeys.forEach(key => {
            const setData = setDatas[key];
            const prevKeyData = data[key];
            const nextKeyData = setData(prevKeyData, deal);
            nextData[key] = nextKeyData;
        })
        return nextData;
    }
}
