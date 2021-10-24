// 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
var canPartition = function (nums) {
    const sum = nums.reduce((p, v) => p + v);
    if (sum & 1) return false;
    const dp = Array(sum / 2 + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
        for (let j = sum / 2; j >= nums[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
            if (dp[j] == sum / 2) {
                return true;
            }
        }
    }
    return dp[sum / 2] == sum / 2
};