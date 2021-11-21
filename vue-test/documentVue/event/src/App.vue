<template>
    <div class="lesson">
        <lessonVue
            v-for = "item in db"
            :key = "item.id"
            :lesson = "item"
            v-model:title.toupper.substr_10 = "item.title"
            v-model:price = "item.price"
            @del="show"
        />
        <!-- <input type="text" v-model="title">
        {{title}} -->
        <!-- <XwInput :value="title" @update:value="change" /> -->
        <!-- <XwInput v-model="title" /> -->
        {{ db[0].title }}
    </div>
</template>

<script>
import db from "../data/db";
import lessonVue from "./components/lesson.vue";
import XwInput from "./components/xwInput.vue";

export default {
    components: { lessonVue, XwInput },
    data() {
        return {
            db,
            title: "xu - title",
        };
    },
    methods: {
        show(id) {
            const index = this.db.findIndex((l) => l.id == id);
            this.db.splice(index, 1);
        },
        change(v) {
            this.title = v;
        }
    },
};
</script>

<style lang="scss" scoped>
.lesson {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 10px;
}
</style>