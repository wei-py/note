var wordBreak = function (s, wordDict) {
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true;
    for (let i = 0; i <= s.length; i++) {
        for (let word of wordDict) {
            //dp[i - word.length] 为了接住上一个状态
            if (i >= word.length && s.slice(i - word.length, i) === word && dp[i - word.length]) {
                dp[i] = true;
            }
        }
    }
    return dp[s.length];
};