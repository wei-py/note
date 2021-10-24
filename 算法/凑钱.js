let coins = [1, 2, 3, 5]
const dp = Array.from(Array(4), () => new Array(101).fill(0));


dp[coins.indexOf(1)].fill(1);
dp[0][0] = 0

dp[coins.indexOf(2)][2] = 1
dp[coins.indexOf(2)][3] = 1
dp[coins.indexOf(2)][4] = 2
dp[coins.indexOf(2)][5] = 2

dp[coins.indexOf(3)][3] = 1
dp[coins.indexOf(3)][4] = 1
dp[coins.indexOf(3)][5] = 2

dp[coins.indexOf(5)][5] = 1

for (let i = 6; i <= 100; i++) {
    dp[coins.indexOf(2)][i] = dp[coins.indexOf(2)][i - 2] + 1;
    dp[coins.indexOf(3)][i] = dp[coins.indexOf(3)][i - 3] + dp[coins.indexOf(2)][i - 3] + 1;
    dp[coins.indexOf(5)][i] = dp[coins.indexOf(5)][i - 5] + dp[coins.indexOf(3)][i - 5] + dp[coins.indexOf(2)][i - 5] + 1;
}
let n = 10
var result = 1 + dp[coins.indexOf(2)][n] + dp[coins.indexOf(3)][n] + dp[coins.indexOf(5)][n]
console.log(result);


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