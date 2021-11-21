function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left);
    let prototype = right.prototype;
    while (true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

var p = new Person('wei', '22');

console.log(myInstanceof(p, Person));