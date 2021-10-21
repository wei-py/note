class mypromise{
    static pending = 'pending';
    static fulfilled = 'fulfilled';
    static rejected = 'rejected';
    constructor(handle){
        this.status = mypromise.pending;
        this.value = null;
        this.callbacks = [];
        try {
            handle(this.resolve.bind(this), this.reject.bind(this))    
        } catch (error) {
            this.reject(error);
        }
    }
    resolve(value){
        if(this.status !== mypromise.pending) return;
        this.value = value;
        this.status = mypromise.fulfilled;
        setTimeout(() => {
            for(let callback of this.callbacks){
                callback.onfulfilled(value);
            }
        })
    }
    reject(reason){
        if(this.status !== mypromise.pending) return;
        this.value = reason;
        this.status = mypromise.rejected;
        setTimeout(() => {
            for(let callback of this.callbacks){
                callback.onrejected(reason);
            }
        })
    }
    then(onfulfilled, onrejected){
        return new mypromise((resolve, reject) => {
            if(this.status === mypromise.pending){
                this.callbacks.push({
                    onfulfilled: function(value){
                        try {
                            let result = onfulfilled(value);
                            if(result instanceof mypromise){
                                result.then(resolve, reject)
                            }else{
                                resolve(result)
                            }
                        } catch (error) {
                            reject(error)
                        }
                    },
                    onrejected: function(value){
                        try {
                            let result = onrejected(value);
                            if(result instanceof mypromise){
                                result.then(resolve, reject)
                            }else{
                                resolve(result);
                            }
                        } catch (error) {
                            
                        }
                    }
                    
                })
            };
            if(this.status === mypromise.fulfilled){
                try {
                    let result = onfulfilled(this.value)
                    if(result instanceof mypromise){
                        result.then(resolve, reject)
                    }else{
                        reject(result);
                    }
                } catch (error) {
                    reject(error)
                }
            };
            if(this.status === mypromise.rejected){
                try {
                    let result = onrejected(this.value)
                    if(result instanceof mypromise){
                        result.then(resolve, reject)
                    }else{
                        reject(result);
                    }
                } catch (error) {
                    reject(error)
                }
            };
        })   
    }
}


const p = new mypromise((resolve, reject) => {
    setTimeout(()=>{
        resolve('wei')
    }, 1000);
}).then(value => {
    console.log(value + ' then');
    return value
}).then(value => {
    console.log(value + ' then2');
})