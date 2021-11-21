<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setupimport HelloWorld from './components/HelloWorld.vue'
import ButtonVue from "./components/Button.vue";
export default {
    components: {ButtonVue},
    data() {
        return {
            btContent: '反馈'
        }
    }
}
</script>

<template>
    <!-- <ButtonVue :content="btContent" /> -->
    <!-- <ButtonVue content="提交" Tip='@' />
    <ButtonVue type="success" content="取消" />
    <ButtonVue type="danger" content="删除" />
    <ButtonVue :disabled="true" content="编辑" />
    <ButtonVue v-bind="{content: '保存', type: 'success'}" /> -->
    <ButtonVue :content="btContent" type="success" />
    <hr />
    <button @click="btContent = '不反馈'">父组件</button>
    {{btContent}}
</template>

<style lang="scss" scoped>

</style>
