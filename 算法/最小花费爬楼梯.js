var minCostClimbingStairs = function (cost) {
    let sum = cost.reduce((p, v) => p + v);
    const dp = Array(cost.length).fill(sum);
    dp[0] = cost[0];
    dp[1] = cost[1];
    for (let i = 2; i < cost.length; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i], dp[i - 2] + cost[i])
    }
    return Math.min(dp[cost.length - 1], dp[cost.length - 2]);
};

var cost = [10, 15, 20];
var cost = minCostClimbingStairs(cost);
console.log(cost);