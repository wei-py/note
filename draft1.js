class mypromise {
    static pending = 'pending';
    static fulfilled = 'fulfilled';
    static rejected = 'rejected';
    constructor(handle) {
        this.status = mypromise.pending;
        this.value = null;
        this.callbacks = [];
        try {
            handle(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error);
        }
    }
    resolve(value) {
        if (this.status !== mypromise.pending) return;
        this.value = value;
        this.status = mypromise.fulfilled;
        setTimeout(() => {
            for (let callback of this.callbacks) {
                callback.onfulfilled(value);
            }
        })
    }
    reject(reason) {
        if (this.status !== mypromise.pending) return;
        this.value = reason;
        this.status = mypromise.rejected;
        setTimeout(() => {
            for (let callback of this.callbacks) {
                callback.onrejected(reason);
            }
        })
    }
    then(onfulfilled, onrejected) {
        return new mypromise((resolve, reject) => {
            if (this.status === mypromise.pending) {
                this.callbacks.push({
                    onfulfilled: value => this.parse(onfulfilled(value), resolve, reject),
                    onrejected: value => this.parse(onrejected(value), resolve, reject)
                })
            };
            if (this.status === mypromise.fulfilled) {
                setTimeout(() => {
                    this.parse(onfulfilled(this.value), resolve, reject);
                })
            };
            if (this.status === mypromise.rejected) {
                setTimeout(() => {
                    this.parse(onrejected(this.value), resolve, reject);
                })
            };
        })
    }

    parse(result, resolve, reject) {
        try {
            if (result instanceof mypromise) {
                result.then(resolve, reject);
            } else {
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    }
}


const p = new mypromise((resolve, reject) => {
    setTimeout(() => {
        resolve('wei')  // 修改 value
    }, 1000);
    console.log('wei');
}).then(value => {
    console.log(value + ' then'); // 卡个 callback中一个函数
    return value
}).then(value => {
    console.log(value + ' then2');
})