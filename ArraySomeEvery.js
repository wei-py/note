var arr = [1, 2, 3, 4, 5, 1, 2, 3];

// 找出数组中有大于5的数  一个符合条件即可
var More5 = arr.some((value) => value > 5);
// console.log(More5);

// 数组去重
var nodup = arr.filter((value, index) => {
    return arr.indexOf(value, 0) == index;
})
// console.log(arr.indexOf(1, 1));
// console.log(nodup);

// 判断数组中的数字是否都大于0  全部条件满足
var More0 = arr.every(value => value > 0);
// console.log(More0);