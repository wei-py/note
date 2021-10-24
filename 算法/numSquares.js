var numSquares = function (n) {
    let i = 0;
    while (n >= (i + 1) ** 2) { i++ };
    let value = Array(i).fill(0).map((_, index) => (index + 1) ** 2)
    const dp = Array(n + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 0; i <= value.length; i++) {
        for (let j = value[i]; j <= n; j++) {
            dp[j] = Math.min(dp[j], dp[j - value[i]] + 1);
        }
    }
    return dp[n];
};


var a = numSquares(39);
console.log(a);