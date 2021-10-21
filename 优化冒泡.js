const swap = (arr, l, r) => [arr[l], arr[r]] = [arr[r], arr[l]];

const bubble = function (arr) {
    let len = arr.length;
    let flag = true;
    let tmp = 0;
    for (let i = len - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                flag = false
                swap(arr, j, j + 1);
                tmp = j;
            }
        }
        len = tmp;
        if (flag) return arr
    }
    return arr;
}

var arr = [2, 1, 3, 4, 7, 6, 5, 0, 9, 8]
var sorted = bubble(arr);
console.log(sorted);