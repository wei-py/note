<template>
    <div>⌨️</div>
    <!-- <input type="text" @keyup.up="key" /> -->
    <div style="height: 250px; width: 250px; background: pink" @click.alt.exact='hd'></div>
</template>

<script>
export default {
    methods: {
        key(event) {
            console.log(event.key);
        },
        hd(event) {
            console.log(event);
        }
    },
};
</script>

<style>
</style>