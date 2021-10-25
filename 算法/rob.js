var rob = function (nums) {
    const dp = Array(nums.length).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i])
    }
    return dp[nums.length - 1];
}

var nums = [1, 2, 4, 9, 7];
rob(nums)