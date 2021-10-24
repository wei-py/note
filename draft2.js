const change = (amount, coins) => {
    let dp = Array(amount + 1).fill(0);
    dp[0] = 1;

    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] += dp[j - coins[i]];
        }
    }

    return dp[amount];
}

var a = change(10, [1, 2, 3, 5]);
console.log(a);