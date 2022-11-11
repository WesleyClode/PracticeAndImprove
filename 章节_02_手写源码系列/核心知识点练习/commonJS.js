/**
 * commonJS的实现
 */

 (function(modules, exports, require) {
  // require 函数，以一个路径作为参数，函数的功能是，读取路径指向的 js 文件的地址，
  // 然后把文件读出来，以 js 的形式解析。

  const $ = require('../juery.min.js')
  var name = '张三';

  function getName() {};

  modules.exports = { name, getScore };

  exports.name = name;
  // exports = {name, getScore} 不能这样用，会使引用断了

})(modules, modules.exports, require);