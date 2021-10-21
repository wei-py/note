// new Promise((resolve, reject) => {
//     resolve(1);
//   })
//     .then(val => console.log(val))
//     .catch(e => console.error(e));
  
//   new Promise((resolve, reject) => {
//     reject(new Error('apple'));
//   })
//     .then(val => console.log(val))
//     .catch(e => console.error(e));
  
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//     //   reject(new Error('apple'));
//     });
//   })
//     .then(val => console.log(val))
//     // .catch(e => console.error(e));


class myPromise{
    constructor(handle){
        this.value = null;
        this.status = 'pending';
        handle(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve(value){
        this.value = value;
        this.status = 'fulfilled';
    }

    reject(value){
        this.value = value;
        this.status = 'rejected';
    }
    
    then(callback){
        if(this.status === 'fulfilled'){
            return new myPromise((resolve, reject) => {
                console.log('then');
                callback(this.value);
                resolve(this.value);
            })
        } else {
            return new myPromise((resolve, reject) => {
                reject(this.value);
            })
        }        
    }

    catch(callback){
        if(this.status ===  'rejected'){
            console.log('catch');
            callback(this.value)
        }
    }
}
new myPromise((resolve, reject) => {
    reject(new Error('apple'));
  })
    .then(val => console.log(val))
    .catch(e => console.error(e));
