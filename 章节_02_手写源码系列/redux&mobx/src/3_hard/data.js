export const createData = function(init) {
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

//  你如果不是我想要的固定的改法，我就不让你改。
// 我提供你，只有 INCREMENT 和 DECREMENT 两种操作，其他的，不行
function mySetData(data, deal) {
    switch(deal.type) {
        case 'INCREMENT':
            return { ...data, count: data.count + 1};
        case 'DECREMENT':
            return { ...data, count: data.count - 1};
        default: 
            return data;
    }
}