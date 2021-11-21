<template>
    <section>
        <div :class="[type, { disabled }]" @click="onclick">
            <span v-if="Tip">{{ Tip }}</span>
            {{ text }}
        </div>
    </section>
    <hr />
    <button @click="text = '不反馈'">子组件</button>
    {{ content }}
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            required: true,
            // default: "确定",
        },
        // arr: {
        //     type: Number,
        //     default() {
        //         return ["1", "2"];
        //     },
        // },
        type: {
            type: String,
            default: "info",
            validator(v) {
                return ["success", "danger", "info"].includes(v);
            },
        },
        Tip: String,
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            text: this.content,
        };
    },
    watch: {
        content(v) {
            this.text = v;
        },
    },
    methods: {
        onclick() {
            (this.text = "loading"),
                setTimeout(() => {
                    this.text = this.content;
                }, 3000);
        },
    },
};
</script>

<style lang="scss" scoped>
div {
    // background: pink;
    color: white;
    padding: 5px 10px;
    border-radius: 10px;
    opacity: 0.6;
    transition: 1s;
    display: inline-block;
    cursor: pointer;
    &:hover {
        opacity: 1;
    }
    &.info {
        background: #ddd;
    }
    &.success {
        background: pink;
    }
    &.danger {
        background: skyblue;
    }
    &.disabled {
        background: gray !important;
        cursor: default;
        opacity: 1;
    }
}
</style>