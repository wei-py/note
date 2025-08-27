function curry(fn) {
  return function nest(...args) {
    if (args.length === fn.length) {
      return fn(...args);
    } else {
      return function (arg) {
        return nest(...args, arg)
      }
    }
  }
}

function add(a,b) {
  return a + b
}

const a = curry(add)
const fn2 = a(1)(2)
console.log(fn2);
