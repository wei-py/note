const swap = (arr, l, r) => [arr[l], arr[r]] = [arr[r], arr[l]];

const heapSort = function (arr) {
    let len = arr.length;
    // 建堆
    for (let i = Math.floor((len - 2) / 2); i >= 0; i--) {
        sift(arr, i, len - 1);
    }
    for (let i = len - 1; i >= 0; i--) {
        swap(arr, 0, i);
        sift(arr, 0, i - 1);
    }
    return arr;
}


// 大根堆 调整
function sift(arr, start, end) {
    let i = start;
    let j = 2 * i + 1;
    let tmp = arr[start];
    while (j <= end) {
        if (j + 1 <= end && arr[j] < arr[j + 1]) {
            j++;
        }
        if (arr[j] > tmp) {
            swap(arr, i, j);
            i = j;
            j = 2 * i + 1;
        } else {
            break;
        }
    }
    arr[i] = tmp;
}



var arr = [2, 1, 3, 5, 4, 6, 7];
// arr = heapSort(arr);
// console.log(arr);


// topK -> build minHeap
function siftDown(arr, start, end) {
    let i = start;
    let j = 2 * i + 1;
    let tmp = arr[i];
    while (j <= end) {
        if (j + 1 <= end && arr[j] > arr[j + 1]) {
            j++;
        }
        if (arr[j] < tmp) {
            swap(arr, j, i);
            i = j;
            j = 2 * i + 1;
        }
        else {
            break;
        }
    }
    arr[i] = tmp;
}

function topK(arr, k) {
    let topArr = arr.splice(0, k);
    for (let i = Math.floor((topArr.length - 2) / 2); i >= 0; i--) {
        siftDown(topArr, i, topArr.length - 1);
    }
    for (let i of arr) {
        if (topArr[0] < i) {
            topArr[0] = i;
            siftDown(topArr, 0, topArr.length - 1)
        }
    }
    return topArr;
}

arr = [11, 1, 2, 3, 4, 5, 9, 8, 7, 12]
arr = topK(arr, 5)

console.log(arr);