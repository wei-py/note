<template>
    <div>
        <!-- <input type="text" v-model="form.title"> -->
        <!-- {{form}} -->
        <input type="checkbox" v-model="form.isPost" />
        发布
        <hr />
        <!-- <input type="checkbox" v-model="form.lessons" value="js" /> js
        <input type="checkbox" v-model="form.lessons" value="linux" /> linux
        <input type="checkbox" v-model="form.lessons" value="mysql" /> mysql -->
        <label v-for="l of lessons" :key="l.value">
            <input type="checkbox" v-model="form.lessons" :value="l.value" />
            {{ l.title }}
        </label>
        <hr />
        <input type="radio" v-model="form.sex" :value="1" /> 男♂
        <input type="radio" v-model="form.sex" :value="2" /> 女♀
        <hr />
        <select v-model="form.city" multiple>
            <option :value="{}">===请选择城市===</option>
            <option :value="{ name: '汕头' }">汕头</option>
            <option :value="{ name: '北京' }">北京</option>
            <option :value="{ name: '武汉' }">武汉</option>
        </select>
        <hr />
        <input type="text" v-model.lazy="hd" />
        <hr />
        <input type="text" v-model.number="num" />
        <hr />
        <input type="text" v-model.trim="title" />
        <hr />
        {{title}}
    </div>
</template>

<script>
const lessons = [
    { title: "js", value: "js" },
    { title: "linux", value: "linux" },
    { title: "mysql", value: "mysql" },
];
const form = {
    title: "title.com",
    content: "content.com",
    isPost: false,
    lessons: [],
    sex: 1,
    city: [{ name: "汕头" }],
};
export default {
    data() {
        return {
            form,
            lessons,
            hd: "wei",
            num: 1,
            title: ''
        };
    },
    watch: {
        title(n) {
            console.log(n.length);
        }

    }
};
</script>

<style>
</style>

