const swap = (arr, l, r) => [arr[l], arr[r]] = [arr[r], arr[l]];

const quickSort = function (arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        // 选一个基准值，将数组一分为二
        let pivot = Math.floor((left + right) / 2);
        // 调整数组和返回索引
        let new_pivot = partition(arr, pivot, left, right);
        // 分别递归这两个数组
        quickSort(arr, left, new_pivot - 1);
        quickSort(arr, new_pivot + 1, right);
    }
    return arr;
}

// 选基准值的函数 排序前后数组
function partition(arr, pivot, left, right) {
    // 保存pivot 位置上的值和索引
    let pivotValue = arr[pivot];
    let newPivot = left;
    // 移动arr[pivot]在最后面
    swap(arr, pivot, right);
    // 小值在前面
    for (let i = left; i < right; i++) {
        if (arr[i] < pivotValue) {
            swap(arr, i, newPivot);
            newPivot++;
        }
    }
    // 把最后面的值拉回来
    swap(arr, right, newPivot);
    return newPivot;
}

var arr = [2, 1, 3, 4, 7, 6, 5, 0, 9, 8]
var sorted = quickSort(arr);
console.log(sorted);