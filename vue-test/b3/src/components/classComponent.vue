<template>
  <div class="outer">
      <div class="fwhite" :class="[classLists]">维</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            classLists: {
                current: true,
                border_black: true
            }
        }
    }
}
</script>

<style lang="scss">
.outer {
    .fwhite {
        color: white,
    }
    .current {
        background: skyblue;
    }
    .border_black {
        border: 1px solid black
    }
}
</style>