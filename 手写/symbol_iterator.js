const mytypeof = (value) => Object.prototype.toString.call(value).slice(8, -1);
var a = {};
a[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
};
class iterator1 {
    *[Symbol.iterator]() {
        yield 'a';
        yield 'b';
    }
}

var i1 = new iterator1();
console.log(...i1);

