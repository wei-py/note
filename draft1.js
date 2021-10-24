var findMaxForm = function (strs, m, n) {
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
    let nums0 = 0;
    let nums1 = 0;
    for (let str of strs) {
        nums0 = str.split('0').length - 1;
        nums1 = str.split('1').length - 1;
        // for (let i = m, j = n; i >= nums0 && j >= nums1; i--, j--) {
        //     dp[i][j] = Math.max(dp[i][j], dp[i - nums0][j - nums1] + 1);
        // }
        for (let i = m; i >= nums0; i--) {
            for (let j = n; j >= nums1; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - nums0][j - nums1] + 1);
            }
        }
    }
    console.log(dp);
};


// var strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
var strs = ["10", "0", "1"], m = 1, n = 1
findMaxForm(strs, m, n)

