import todo from './components/todo.js'
import db from './data/db.js'
const app = Vue.createApp({
    components: {todo},
    data() {
        return {
            db
        }
    }
})

app.mount('#app')

export default app