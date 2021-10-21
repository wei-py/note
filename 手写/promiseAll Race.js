var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('1');
    }, 1000)

})

var p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('2');
        reject('2');
    }, 500)
})

var p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('3');
        // reject('3');
    }, 3000)
})

var p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('4');
    }, 4000)
})

// // 按数组原有的顺序对象输入
// // 错误则会捕获第一错误利用第二个参数回调
// Promise.all([p1, p2, p3, p4]).then((result) => console.log(result), (error) => console.log(error));

// 捕获第一个有结果输出的promise，无论成功失败
// Promise.race([p1, p2, p3, p4]).then((result) => console.log(result), (error) => console.log(error))
