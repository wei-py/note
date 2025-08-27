function lengthOfLongestSubstring(s) {
  // maxLength是最长的子串的长度
  let maxLength = 0;
  // start是当前子串的开始索引
  let start = 0;
  // charIndexMap是用来记录每个字符最后一次出现的索引
  const charIndexMap = {};
  // 遍历字符串
  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];
    // 如果当前字符在charIndexMap中存在
    if (charIndexMap[currentChar] !== undefined) {
      // 并且当前字符的索引大于或等于start
      if (charIndexMap[currentChar] >= start) {
        // 就更新start为当前字符的索引 + 1
        start = charIndexMap[currentChar] + 1;
      }
    }
    // 将当前字符的索引添加到charIndexMap中
    charIndexMap[currentChar] = end;
    // 更新maxLength
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
}

function fn(s) {
  let start = 0;
  let maxLength = 0;
  let map = {};
  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];
    if(map[currentChar] !== undefined) {
      if (map[currentChar] >= start) {
        start = map[currentChar] + 1;
      }
    }
    map[currentChar] = end;
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
}

