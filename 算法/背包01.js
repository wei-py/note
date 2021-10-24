function bagPromble01(wight, value, size) {
    const len = wight.length;
    const dp = Array(size + 1).fill(0);
    for (let i = 0; i <= len; i++) {
        for (let j = size; j >= wight[i - 1]; j--) {
            dp[j] = Math.max(dp[j], dp[j - wight[i - 1]] + value[i - 1])
        }
    }
    return dp[size];
}


function test() {
    console.log(bagPromble01([1, 3, 4, 5], [15, 20, 30, 55], 6));
}

test();


