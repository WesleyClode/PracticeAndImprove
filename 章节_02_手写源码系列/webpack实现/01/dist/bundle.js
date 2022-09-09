(function(modules) { // webpackBootstrap
    // The module cache
    var installedModules = {};
    // The require function
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if(installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        // Flag the module as loaded
        module.l = true;
        // Return the exports of the module
        return module.exports;
    }
    // Load entry module and return exports
    return __webpack_require__(__webpack_require__.s = "./src\index.js");
})
/************************************************************************/
({
    
        "./src\index.js":
        (function(module, exports, __webpack_require__) {
          eval(`let jd = __webpack_require__("./src\\jd.js");

__webpack_require__("./src\\style.less");

console.log("jd打包工具:" + jd);`);
        }),
    
        "./src\jd.js":
        (function(module, exports, __webpack_require__) {
          eval(`let name = "自定义打包工具";
module.exports = name;`);
        }),
    
        "./src\style.less":
        (function(module, exports, __webpack_require__) {
          eval(`let style = document.createElement('style');
style.innerHTML = "body {\\n  background: red;\\n}\\n";
document.head.appendChild(style);`);
        }),
    
});