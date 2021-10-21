//借用构造函数继承  仅仅代码的复用 函数并没有复用
function typecolor() {
    this.colors = ['red', 'yellow', 'green'];
}

function subcolor() {
    typecolor.call(this)
}


//组合继承
function supzuhe(name) {
    this.name = name;
    this.colors = ['red', 'yellow', 'green'];
}
supzuhe.prototype.sayneme = function () {
    console.log(this.name);

}

function subzuhe(name, age) {
    supzuhe.call(this, name);
    this.age = age;
}

subzuhe.prototype = new supzuhe(); // 这一步添加了不必要的超类实例对象
subzuhe.prototype.constructor = subzuhe;
subzuhe.prototype.sayage = function () {
    console.log(this.age);
}

var instancesub = new subzuhe('wei', '22');
// console.log(instancesub);
// instancesub.sayneme();
// instancesub.sayage();


// 寄生式继承
function createAnother(obj) {
    var clone = obj;
    clone.sayHi = function () {
        console.log('hi', clone.name);
    }
    return clone;
}

var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi" 



// 父类
function Person(name) {
    this.name = name;
    this.sum = function () {
        console.log(this.name);
    }
}
Person.prototype.age = 22;

// 原型链继承
function Per() {
    this.name = 'ker';
}
Per.prototype = new Person();
// 新实例无法向父类构造函数传参。 所有新实例都会共享父类实例的属性。

// 构造
function Con() {
    Person.call(this, 'jer');
    this.age = 12;
}
// 在子实例中可向父实例传参。 只继承了父类构造函数的属性，没有继承父类原型的属性。


// 组合
function SubType(name) {
    Person.call(this, name);
}
SubType.prototype = new Person();
// 可以继承父类原型上的属性，可以传参，可复用。
// 调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。


// 原型式继承
function content(obj) {
    function F() { };
    F.prototype = obj;
    return new F();
}
var sup = new Person();
var sup1 = content(sup);
// 类似于复制一个对象，用函数来包装。

// 寄生式继承
function subObject(obj = new Person()) {
    function F() { };
    F.prototype = obj;
    var sub = new F();
    sub.name = 'gar';
    return sub;
}
var sup2 = subObject(sup);
// 就是给原型式继承外面套了个壳子。

// 寄生组合式继承
function content(obj) {
    function F() { };
    F.prototype = obj;
    return new F();
}

var con = content(Person.prototype);

function Sub() {
    Person.call(this);
}

Sub.prototype = con;
con.constructor = Sub;

