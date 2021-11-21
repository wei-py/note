<template>
    <template v-for="(lession, index) in lessions" :key='index'>
        <div v-if="lession.isDelete" style="background: pink">{{lession.title}}</div>
        <div v-else-if="lession.price > 100" style="background: skyblue">{{lession.title}}</div>
        <template v-else>{{lession.title}}</template>
    </template>
</template>

<script>
import lessions from "../../data/lession.js";
export default {
    data() {
        return {
            lessions
        }
    },
};
</script>

<style>
</style>