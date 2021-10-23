function kmp(str) {
    if (str.length === 0) return 0;
    let next = [];
    let j = 0;
    next.push(j)
    for (let i = 1; i < str.length; i++) {
        while (j > 0 && str[i] !== str[j]) {
            j = next[j - 1];
        }
        if (str[i] === str[j]) {
            j++;
        }
        next.push(j);
    }
    return next;
}

function strStr(haystack, needle) {
    let next = kmp(needle);
    let j = 0;
    for (let i = 0; i < haystack.length; i++) {
        while (j > 0 && haystack[i] !== needle[j]) {
            j = next[j - 1];
        }
        if (haystack[i] === needle[j]) {
            j++;
        }
        if (j === needle.length) {
            return i - j + 1;
        }
    }
    return -1;
};

var haystack = "aaaaa";
var needle = "bba";
var result = strStr(haystack, needle);
console.log(result);