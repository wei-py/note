<template>
    <div @click="ev($event)">事件对象</div>
</template>

<script>
export default {
    data() {
        return {
            num: 1,
        };
    },
    methods: {
        ev(event) {
            console.log(event);
        },
    },
};
</script>

<style>
</style>