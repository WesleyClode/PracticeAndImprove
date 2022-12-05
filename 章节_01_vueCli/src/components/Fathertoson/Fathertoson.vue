<template>
    <div>
        <h3>fathertoson</h3>
        <btn1 :action="action"></btn1>
        <div @click="getBtn2"><btn2 ref="btn2"></btn2></div>
        <testClassChange/>
    </div>
</template>
<script>
import btn1 from './btn1'
import btn2 from './btn2'
import testClassChange from '../testClassChange.vue'
export default {
    name: 'Fathertoson',
    data(){
        return {
            title: ''
        }
    },
    components:{
        btn1,
        btn2,
        testClassChange
    },
    methods: {
        action(e){
            console.log('子传父',e)
            console.log('父组件333')
        },
        getBtn2(){
            console.log(this.$refs.btn2.send())
            console.log(this.$refs.btn2.name)
            console.log(this.$refs.btn2)
        },
        test(){
            console.log(111)
        }
    }
}
</script>
<style scoped>

</style>