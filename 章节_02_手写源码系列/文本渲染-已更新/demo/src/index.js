import Vue from 'vue'

let vm = new Vue({
    el: '#app',
    data(){
        return {
            msg: 'hello',
            school: {name: 'aaa', age: 10},
            arr: [1,2,3,{a:1}]
        }
    },
    computed: {

    },
    watch: {

    }
})
// console.log(vm._data.msg)
// vm.msg = 'test'
//添加代理访问后可以这样使用
// console.log(vm.msg)

// vm.msg = {text:'hello'}
// console.log(vm.msg.text)

//不能劫持原生的push方法，vm.arr相当于读取，可以看到arr中新加的数据没有getset
// console.log(vm.arr.push(4), vm.arr)
//添加对象后，再访问属性没有劫持日志
// console.log(vm.arr.push({a:1}), vm.arr[3].a)

//这种情况只有get没有set
// console.log(vm.arr[3].a=100)
// console.log(vm.arr=[])

// [1,2,3] 这样的数据不会被劫持 [{a:1}]会被劫持
// console.log(vm.arr[0]=100)
// [].push shift unshift 这些方法可以被监控， vm.$set内部调用就是数组的splice