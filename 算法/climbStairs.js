var climbStairs = function (n) {
    const dp = Array(n + 1).fill(0);
    dp[0] = 1;
    for (let i = 0; i <= n; i++) {
        for (let j of [1, 2]) {
            if (i >= j) {
                dp[i] += dp[i - j]
            }
        }
    };
    return dp[n];
};

var a = climbStairs(4);
console.log(a);