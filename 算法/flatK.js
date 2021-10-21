// 实现数组扁平化，k是展开的层数

var arr = [1, 1, 1, [2, 2, 2, [3, 3, 3, 3]], [2, 2, [3, [4]]]]
function flat(arr, k) {
    if (k === 0) {
        return arr
    }
    let result = [];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flat(arr[i], k - 1))
        } else {
            result.push(arr[i])
        }
    }
    return result;
}

console.log(flat(arr, 4));