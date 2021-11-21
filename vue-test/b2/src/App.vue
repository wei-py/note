<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import ClassComponents from "./components/ClassComponents.vue";
export default {
    components: {ClassComponents},
  data() {
    return {
      title: "title - text",
    };
  },
};
</script>

<template>
  
  
    <div class="ClassComponents">
        <div class="wei">{{ title }}</div>
    </div>

</template>

<style scoped>
.wei {
  color: pink
}
</style>
