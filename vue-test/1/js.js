const app = Vue.createApp({
    data() {
        return {
            num: 1,
            error: '',
            // tip: '',
        }
    },
    // computed: {
    //     error: {
    //         get() {
    //             const message = this.num <= 0 ? '不能小于0' : this.num >= 10 ? '不能超过10' : ''
    //             if (message) return this.tip + message
    //         },
    //         set(tip) {
    //             this.tip = tip
    //         }
    //     },
    // },
    watch: {
        num(newValue, oldValue) {
            console.log(newValue, oldValue);
            this.error = newValue == 0 ? '不能小于0' : newValue == 10 ? '不能超过10' : '';
        }
    },
    methods: {
        add(event) {
            // this.error = '提示：'
            if(this.num < 10) this.num++
        },
        desc(event) {
            // this.error = '警告：'
            if(this.num > 0) this.num--
        }
    },
})

const vm = app.mount('#app');