var rob = function (root = [3, 2, 3, null, 3, null, 1]) {
    const dp = Array(root.length + 1).fill(0);

    for (let i = 0; i < root.length; i++) {
        for (let j = 1; j <= root.length; j++) {
            if (j == 2 * i || j == 2 * i + 1 || root[j] == null) continue;
            dp[j] = Math.max(dp[j - 1] + root[j], dp[j]);
        };
    };
    console.log(dp);
};

rob()