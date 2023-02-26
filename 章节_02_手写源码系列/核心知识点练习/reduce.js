/**
 * 接受四个参数， fn, currentValue, currentIndex, array
 * 注意，如果初始值没有传，currentValue取初始值，currentIndex取当前index为0的索引；
 * 传了初始值，currentValue取当前第一个值，currentIndex取index为1的值
 */

Array.prototype.myReduce = function (fn, initValue) {
    let arr = Array.prototype.slice.call(this);
    let accumulatorResult = initValue ? initValue : arr[0],
        startIndex = initValue ? 0 : 1;
    for (let i = startIndex; i < arr.length; i++) {
        accumulatorResult = fn.call(this, accumulatorResult, arr[i], i);
    }
    return accumulatorResult;
}