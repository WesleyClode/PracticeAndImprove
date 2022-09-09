#! /usr/bin/env node

//console.log("jd打包工具")
let path = require("path")
let config = require(path.resolve("webpack.config.js"))
//编译器
let Compiler = require("../lib/Compiler")
let compiler = new Compiler(config)
//编译
compiler.run()
