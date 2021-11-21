<template>
    <div v-for="(value, index) in arr" :key="index">{{ value }}</div>
</template>

<script>
const arr = ["xu", "wei"];
export default {
    data() {
        return {
            arr,
        };
    },
    mounted() {
        setTimeout(() => {
            this.arr.push("arr");
        }, 2000);
    },
    methods() {},
};
</script>

<style>
</style>