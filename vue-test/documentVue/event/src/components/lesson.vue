<template>
    <div>
        <img :src="lesson.preview" alt="lesson.title" />
        <h2 @click="inputShow = true">
            <input
                v-if="inputShow"
                type="text"
                :value = "lesson.title"
                @input = "changeTitle"
                @blur="inputShow = false"
                @keyup.enter="inputShow = false"
            />
            <strong v-else>{{ lesson.title }}</strong>
        </h2>
        <h2 @click="inputPriceShow = true">
            <input
                v-if="inputPriceShow"
                type="text"
                :value = "lesson.price"
                @input = "$emit('update:price', $event.target.value)"
                @blur="inputPriceShow = false"
                @keyup.enter="inputPriceShow = false"
            />
            <strong v-else>{{ lesson.price }}</strong>
        </h2>
        <span @click="del">x</span>
    </div>
</template>

<script>
export default {
    props: ["lesson", "price", "title", "titleModifiers"],
    data() {
        return {
            inputShow: false,
            inputPriceShow: false
        };
    },
    created() {
        console.log(this.titleModifiers);
    },
    emits: {
        'update:price': null,
        'update:title': null,
        del(v) {
            console.log(v);
            if (/^\d+$/.test(v)) {
                return true;
            }
            throw Error("del emit 需要数值参数");
        },
    },
    methods: {
        changeTitle($event) {
            let value = $event.target.value;
            if (this.titleModifiers.toupper) {
                value = value.toUpperCase();
            }
            const sub = Reflect.ownKeys(this.titleModifiers).find(m => /^substr_/.test(m))
            if (sub) {
                value = value.substr(0, sub.split('_')[1])
            }
            this.$emit('update:title', value)
        },
        del() {
            if (confirm("确定要删除吗？")) this.$emit("del", this.lesson.id);
        },
    },
};
</script>

<style lang="scss" scoped>
div {
    border: 1px solid #ddd;
    text-align: center;
    transition: 1s;
    position: relative;
    &:hover {
        box-shadow: 0 0 20px #aaa;
        > span {
            opacity: 1;
        }
    }
    h2 {
        padding: 0 0 20px 0;
        margin: 0;
    }
    img {
        width: 100%;
    }
    span {
        display: block;
        background-color: #666;
        color: white;
        border-radius: 50%;
        height: 20px;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        font: 12px;
        opacity: 0;
        transition: 1s;
    }
}
</style>