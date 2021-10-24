// var lastStoneWeightII = function (stones) {
//     n = stones.length;
//     sums = stones.reduce((p, v) => p + v);
//     const dp = Array(n).fill(sums);
//     for (let i = n; i >= 1; i--) {
//         for (let j = 1; j <= n - 1; j++) {
//             console.log(dp[j], stones[j]);
//             if (dp[j - 1] - (stones[j] * 2) < 0) continue;
//             dp[i] = Math.min(dp[i - 1] - (stones[j] * 2), dp[i]);
//         }
//     }
//     return dp[n - 1];
// };



var lastStoneWeightII = function (stones) {
    let sum = stones.reduce((p, v) => p + v);
    let target = sum >> 1;
    const dp = Array(target + 1).fill(0);
    for (let i = 0; i < stones.length; i++) {
        for (let j = target; j >= stones[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i])
        }
    }
    return sum - 2 * dp[target];
};

var stones = [31, 26, 33, 21, 40]
var a = lastStoneWeightII(stones);
console.log(a);