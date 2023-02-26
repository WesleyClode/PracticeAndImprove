//1. JSON.parse(JSON.stringify())
// 缺点：无法解决循环引用；无法复制Date, regExp等特殊格式引用类型
//2. 手写
// 循环引用解决：
function deepClone(target, map = new WeakMap()) {
    if (target instanceof Date) return new Date(target);
    if (target instanceof RegExp) return new RegExp(target);
    if (typeof (target) !== 'object' || target === null) return target;
    if (map.get(target)) return map.get(target);
    map.set(target, true);
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (prop in target) {
        if (target.hasOwnproperty(prop)) {
            cloneTarget[prop] = deepClone(target[prop]);
        }
    }
}