// es6
function curry(fn, ...args) {
    return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}

// es5
function curry5(fn, args) {
    let len = fn.length;
    args = args || [];
    return function () {
        let subargs = []
        Array.isArray(args) ? subargs.concat(args) : subargs.push(args);
        for (let i = 0; i < arguments.length; i++) {
            subargs.push(arguments[i]);
        }
        if (len <= subargs.length) {
            return fn.apply(this, subargs);
        } else {
            return curry.call(this, fn, subargs);
        }
    }
}


function add(x, y) {
    return x + y
}
x = curry5(add, 1);
console.log(x(2));