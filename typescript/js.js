class Counter {
  static #count = 0;

  static increment() {
    Counter.#count++;
  }

  static getCount() {
    return Counter.#count;
  }
}

Counter.increment();
Counter.increment();

console.log(Counter.getCount()); // 输出: 2
// console.log(Counter.#ecount); // ❌ 报错：SyntaxError
