class myPromise {
    constructor(handle) {
        this.status = 'pending';
        this.thenFns = [];
        this.catchFns = [];
    }

    resolve(value) {
        if (this.status === 'pending') {
            this.status = 'fulfilled';
            this.value = value;
        }
        for (const callback of this.thenFns) {
            callback(value);
        }
    }

    reject(error) {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.error = error;
        }
        for (const callback of this.catchFns) {
            callback(error);
        }
    }

    then(thenFn) {
        return new myPromise((resolve, reject) => {
            if (this.status === 'pending') {
                this.thenFns.push(thenFn)
            } else if (this.status === 'fulfilled') {
                resolve(this.value);
            }
        })
    }

    catch(catchFn) {
        return new myPromise((resolve, reject) => {
            if (this.status === 'pending') {
                this.catchFns.push(catchFn)
            } else if (this.status === 'rejected') {
                reject(this.value);
            }
        })
    }
}

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('11')
    }, 1000)
})
    .then(val => console.log(val))
    .catch(error => console.error(error))