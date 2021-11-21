<template>
    <div>
        <button @click="orderBy = 'price'">价格排序</button>
        <button @click="orderBy = 'comment'">评论排序</button>
        <!-- <button @click></button> -->
        {{orderBy}}
        <template v-for="lession in LessionList" :key="lession.id">
            <div>
                {{ lession.title }} - 价格：{{ lession.price }} - 评论数：{{
                    lession.comment
                }}
            </div>
        </template>
    </div>
</template>

<script>
import lessions from "../../data/lession";
export default {
    data() {
        return {
            lessions,
            orderBy: "price",
            // order
        };
    },
    computed: {
        LessionList() {
            return this.lessions.sort((a, b) => {
                return a[this.orderBy] - b[this.orderBy]
            });
        },
    },
};
</script>

<style>
</style>