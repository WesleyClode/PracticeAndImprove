<template>
    <div>
        <h3 ref="lists">左侧导航</h3>
        <ul>
            <li  v-for="(item,index) in items" :key="index">
                <router-link :to="item.path">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Nav',
    data(){
        return {
            items : [
                {
                name:'父到子通信',
                path: '/fathertoson',
                child:[
                    {name:'编辑语言',child:[{name:'java'},{name:'c#/.net'},{name:'python'},
                    {name:'前端开发',child:[{name:'jq'},{name:'vue'},{name:'react'}]}]},
                    {name:'移动开发',child:[{name:'android开发'},{name:'IOS开发'}]},
                    {name:'游戏开发',child:[{name:'phaser游戏开发'},{name:'webGL游戏开发',child:[{name:'3D游戏'},{name:'2D游戏'}]}]}
                ]
                },
                {
                name:'子到父通信',
                path: '/sontofather',
                child:[{name:'平面设计',child:[{name:'电商美工'},{name:'综合平面设计'},{name:'摄影后期'}]},
                        {name:'UI设计',child:[{name:'交互设计'},{name:'webUI设计'},{name:'游戏UI设计'}]},
                        {name:'软件设计'}]
                },
                {
                name:'兄弟组件通信',
                path: '/brother',
                child:[{name:'平面设计',child:[{name:'电商美工'},{name:'综合平面设计'},{name:'摄影后期'}]},
                        {name:'UI设计',child:[{name:'交互设计'},{name:'webUI设计'},{name:'游戏UI设计'}]},
                        {name:'软件设计'}]
                },
                {
                    name:'指令练习',
                    path: '/direct',
                    child:[{name:'考研'},{name:'大学'},{name:'高中'},{name:'初中'}]
                },
                {
                    name:'过滤器练习',
                    path: '/filter',
                    child:[{name:'公务员',child:[{name:'教师考试'},{name:'建筑工程'}]}]
                },
                {
                    name:'菜单左右切换',
                    path: '/menuSwitch'
                },
                {
                    name:'动态组件',
                    path: '/trendComponent'
                },
                {
                    name:'插槽slot',
                    path: '/slot'
                },
                {
                    name:'监听和计算属性',
                    path: '/watch-computed'
                },
                {
                    name:'MIXIN混入',
                    path: '/mixin'
                },
                {
                    name:'MIXIN混入-Two',
                    path: '/mimixinTwo'
                },
                {
                    name:'vuex练习',
                    path: '/vuex'
                }
            ]
        }
    },
    watch:{

    },
    mounted(){
        // this.init()
        console.log(123124)
        // debugger
    },
    methods: {
        init(){
            this.$refs.lists.innerHTML = this.f(this.items);
        },
        f(data){
            var str = "<ul>";
            for(var i=0;i<data.length;i++){
                str += `<li>${data[i].name}</li>`
                if(data[i].child){
                    str += this.f(data[i].child);  //递归自调
                }
            }
            str += "</ul>"
            return str
        },

    }
}
</script>
<style scoped>

</style>