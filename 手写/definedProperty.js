var a = {}
Object.defineProperty(a, 'property1', {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: true,
    // get: function () { return 3 }
})

// a.property1 = 2;
// console.log(a);

function box() {
    this.add;
    this.contains = [];
    Object.defineProperty(this, 'add', {
        set: function (value) {
            add = value
            this.contains.push({ val: add })
        },
    })

    this.getContains = function () {
        return this.contains
    }
}

var a = new box();
a.add = 1;
a.add = 2;
console.log(a.getContains());
