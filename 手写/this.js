// console.log(this === global); // true

a = 37;
// console.log(global.a); // 37

this.b = "MDN";
// console.log(global.b)  // "MDN"
// console.log(b)


function foo() {
    console.log(this.name);
}

function Foo(fn) {
    fn();
}

var obj = {
    name: 'inner wei',
    foo
}

var name = 'out\ter wei';


// obj.foo()
// console.log(obj.foo);
// Foo(obj.foo) // 浏览器是outter wei


obj = {
    bar: 'inner',
    foo: function () {
        console.log(this.bar);
    }
};

// bar = 'outter';
// foo = obj.foo;
// foo();
// obj.foo()


