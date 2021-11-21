<template>
  <div @click.self="d1" style="background: pink">
      <div @click="d2" style="background: skyblue; width: 200px">d2</div>
  </div>
  <a href="https://www.baidu.com" @click.passive='link'>link</a>
</template>

<script>
export default {
    methods: {
        d1() {
            console.log('d1');
        },
        d2() {
            console.log('d2');
        },
        link(event) {
            event.preventDefault()
            console.log(event);
        }
    }
}
</script>

<style>

</style>