<template>
    <!-- <div>{{lession}}</div> -->
    <div class="classList">
        <div v-for="(lession, index) in lessions" :key="index">
            <span :class="{ 'is-delete': lession.isDelete }">{{
                lession.title
            }}</span>
            <button @click="lession.isDelete = !lession.isDelete">
                {{ lession.isDelete ? "取消" : "删除" }}
            </button>
        </div>
    </div>
</template>

<script>
import lessions from "../../data/lession";
export default {
    data() {
        return {
            lessions,
        };
    },
};
</script>

<style lang="scss" scoped>
.classList {
    div {
        display: flex;
        justify-content: space-between;
        span {
            &.is-delete {
                text-decoration-line: line-through;
            }
        }
    }
}
</style>