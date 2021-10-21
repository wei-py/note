// 理解this和context  这里的this是指函数本身
Function.prototype.myCall = function (context) {
    // 判断是null或者是undefined 如果是 默认window 这里是global
    if (typeof this !== 'function') {
        return;
    }
    context = context || window;
    context.fn = this;
    const args = [...arguments].slice(1);
    const result = context.fn(...args);
    delete context.fn;
    return result
}

Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        return;
    }
    context = context || window;
    context.fn = this;
    let result;
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
}

Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        return;
    }
    const that = this;
    const args = [...arguments].slice(1);
    return function F() {
        if (this instanceof F) {
            return new that(...args, ...arguments);
        }
        return that.apply(context, args.concat([...arguments]))
    }

}



var foo = {
    name: 'day',
    sayName: function () {
        console.log(this.name);
    }
}
var bar = {
    name: 'Taec'
};
// foo.sayName.myCall(bar); // Taec
// foo.sayName.myCall(bar); // Taec
// foo.sayName.myBind(bar)(); // Taec




// 注意delete 能删除对象中的属性  变量  但不能删除原型链中的变量