/**
 * 把接受多个参数的函数变换成接受一个单一参数的函数
 * 并且返回接受余下的参数而且返回结果的新函数的技术
 * 倾向于把程序拆分，并抽象成多个函数组装回去
 */
// const minusCount = (global, num) => {
//   return global - num;
// };
// minusCount(global, num);
// 改为
// const minusCount = (global) => {
//   return function (num) {
//       return global - num;
//   }
// };
// 简写
const minusCount = (global) => (num)=> global - num
minusCount(3)(1); // 3 - 1 = 2