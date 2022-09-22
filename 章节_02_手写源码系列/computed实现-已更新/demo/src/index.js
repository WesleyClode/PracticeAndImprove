import Vue from 'vue'

let vm = new Vue({
    el: '#app',
    data(){
        return {
            msg: 'hello',
            school: {name: 'aaa', age: 10},
            arr: [1,[2],3,{a:1}]
        }
    },
    computed: {
        fullName(){
            return this.school.name+":::"+this.school.age;
        },
        myMsg(){
            return this.msg + ":::"
        }
    },
    watch: {
        msg(newValue, oldValue){
            console.log(newValue, oldValue)
        },
        // 另一种
        // msg: {
        //     handler(newValue, oldValue){
        //         console.log(newValue, oldValue);
        //     },
        //     immediate: true
        // }
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

//测试数据响应更新
setTimeout(()=>{
    console.log('测试数据响应更新')
    // vm.msg = 'test'   //dep[wacher]
    // vm.msg = 'test1'  //dep[wacher]
    // vm.msg = 'test2'  //dep[wacher] 是同一个wacher

    // 数组
    // vm.arr[3].a = 3    //可以渲染
    // vm.school.name = 'bbb'

    // vm.arr.push(4)        //不可以渲染
    // vm.school["adress"] = "xxxxxx"  //不可以渲染
    // vm.arr.push([1])
    // vm.arr[5].push(2)
    // vm.arr[1].push(2)   //不可以渲染,因为没有依赖收集

    //计算属性
    vm.school.name = 'ccc' //只与渲染wather关联
    vm.msg = 'ddd'
},2000)