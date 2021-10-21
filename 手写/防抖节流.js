// n秒能值执行1次，重复无效
const throttle = function (fn, delay) {
    let timer;
    return function () {
        // 判断事件在delay时间是否再次触发
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn(...arguments);
            // 处理完事件 定时器清空
            timer = null;
        }, delay);
    }
}

const fn = function (name) {
    console.log(name);
}

// const call = throttle(fn, 500);
// call('wei');

// n秒后执行一次， 重复则重新计时
const debounce = function (fn, delay) {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...arguments)
        }, delay);
    };
}

const call = throttle(fn, 500);
call('wei');// n秒能值执行1次，重复无效
const throttle = function (fn, delay) {
    let timer;
    return function () {
        // 判断事件在delay时间是否再次触发
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn(...arguments);
            // 处理完事件 定时器清空
            timer = null;
        }, delay);
    }
}

const fn = function (name) {
    console.log(name);
}

// const call = throttle(fn, 500);
// call('wei');

// n秒后执行一次， 重复则重新计时
const debounce = function (fn, delay) {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...arguments)
        }, delay);
    };
}

const call = throttle(fn, 500);
call('wei');