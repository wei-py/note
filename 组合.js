//  n = 4, k = 2

// var combine = function (n, k) {
//     var result = [];
//     combineHelper(n, k, []);
//     return result;
// };
// const combineHelper = (n, k, tmp) => {
// }



// let result = []
let path = []
var combine = function (n, k) {
    result = []
    combineHelper(n, k, 1)
    return result
};
const combineHelper = (n, k, startIndex) => {
    if (path.length === k) {
        result.push([...path])
        console.log(result);
        return
    }
    for (let i = startIndex; i <= n - (k - path.length) + 1; ++i) {
        path.push(i)
        combineHelper(n, k, i + 1)
        path.pop()
    }
}

console.log(combine(4, 2));