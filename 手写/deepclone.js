const iscomplexType = (value) => (typeof value == 'function' || typeof value == 'object') && value != null;

const deepclone = function (obj, hash = new WeakMap()) {
    if (hash.has(obj)) return hash.get(obj);
    let Type = [Map, Set, Date, RegExp, WeakMap, WeakSet];
    if (Type.includes(obj)) return new obj.Contructor(obj);

    let allDesc = Object.getOwnPropertyDescriptors(obj);
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
    let Symkeys = Object.getOwnPropertySymbols(obj);
    if (Symkeys.length != 0) {
        for (const symkey of Symkeys) {
            cloneObj[symkey] = iscomplexType(obj[symkey]) ? deepclone(obj[symkey], hash) : obj[symkey];
        }
    }
    hash.set(obj, cloneObj);
    for (const key of Reflect.ownKeys(obj)) {
        cloneObj[key] = iscomplexType(obj[key]) && typeof obj[key] != 'function' ? deepclone(obj[key], hash) : obj[key]
        if (typeof obj[key] == 'function') {
            cloneObj[key] = obj[key].bind();
        }
    }
    return cloneObj
}

// 调用测试
let a = {
    name: "lk",
    course: {
        vue: "Vue.js",
        react: "React.js",
    },
    a1: undefined,
    a2: null,
    a3: 123,
    a4: NaN,
    a5: function hs() {
        return 1
    }
};

// //对象循环引用
a.circleRef = a;

let b = deepclone(a);
// console.log(a === b);
console.log(a.a5 === b.a5);