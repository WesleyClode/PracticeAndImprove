/**
 * 快速排序是分治法
 */

let arr = [2,1,5,6,8,3,7,9]
function sort(arr){
    if(arr.length <= 1) return arr
    let centerIndex = Math.floor(arr.length/2)
    const pivot = arr.splice(centerIndex, 1)[0];
    let leftArr = []
    let rightArr = []
    console.log('中间值',pivot)
    arr.forEach(item => {
        if(item<=pivot){
            leftArr.push(item)
        }else{
            rightArr.push(item)
        }
    });   
    console.log('左',leftArr, '右',rightArr)
    return sort(leftArr).concat(pivot, sort(rightArr)); 
}
// sort(arr)
console.log(sort(arr))