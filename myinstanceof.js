const Myinstanceof = function (instance, cl) {
    // const baseType = ['string', 'number', 'boolean', 'undefined', 'symbol']
    // if (baseType.includes(typeof (instace))) { return false }

    cla = cl.prototype;
    ins = Object.getPrototypeOf(instance);
    while (ins) {
        if (cla === ins) {
            return true;
        }
        ins = Object.getPrototypeOf(ins);
    }
    return false;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

var p = new Person('wei', '22')

console.log(Myinstanceof(p, Person));