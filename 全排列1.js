const permute = function (arr = [1, 2, 3]) {
    var result = [];
    function callback(all, tmp) {
        if (all.length === 0) {
            result.push(tmp)
            return
        }
        for (let i in all) {
            callback(all.slice(0, i).concat(all.slice(i + 1)), tmp.concat(all.slice(i, i + 1)))
        }
    }
    callback(arr, [])
    return result;
}

console.log(permute());


// 不含重复数字
const permute = function (arr) {
    let result = [];
    let path = [];
    backtracking(arr, [])
    return result;
    function backtracking(nums, used) {
        if (path.length === arr.length) {
            // console.log(Object.prototype.toString.call(path));
            result.push(Array.from(path));
            return;
        }
        // 相当于这里有三层for，不过有used来剪枝
        for (let i = 0; i < arr.length; i++) {
            if (used[i]) continue;
            path.push(nums[i]);
            used[i] = true;
            backtracking(nums, used);
            path.pop();
            used[i] = false;
        }
        return result
    }
}

console.log(permute([1, 2, 3]));