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

    // 如果别人想要获取数据？
    function getData() {
        return data;
    };

    return {
        getData, subscribe, changeData
    }
}