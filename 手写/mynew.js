function Mynew(func, ...reset) {
    if (typeof func != 'function') {
        return;
    }
    const newObj = Object.create(func.prototype);
    const result = func.apply(newObj, reset);
    if (typeof result !== 'object' | typeof result !== 'function') {
        return result;
    } else {
        return newObj;
    }
}