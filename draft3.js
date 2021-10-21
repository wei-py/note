// 构造继承
// 原型链继承
// 组合继承

const sup = function (name) {
    this.name = name;
}

const sub = function (name, age) {
    sup.call(this);
    this.age = age;
}
// 缺点父原型上的东西无法继承

const parent = function (name) {
    this.name = name;
}

parent.prototype.sayname = function () {
    console.log(this.name);
}

const child = function (age) {
    this.age = age;
}

child.prototype = new sup('child');
var c = new child(12);
console.log(c);
// 当创建多个实例时，如果不同实例可能互相存在影响