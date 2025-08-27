// 函数节流的实现
// callback: 需要执行的函数
// delay: 间隔时间
// options: 配置对象, 两个参数
//   leading: 是否允许第一次执行
//   trailing: 是否允许最后一次执行
function throttle(callback, delay, options = { leading: true, trailing: false }) {
  // 记录上一次开始的时间
  let lastTime = 0;
  let timer = null;

  const _throttle = function (...args) {

    // 获取当前时间
    const nowTime = Date.now();

    // 如果不是第一次执行, 或者不允许第一次执行, 记录当前时间
    if (!lastTime && !options.leading) {
      lastTime = nowTime;
    }

    // 使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
    const remainTime = delay - (nowTime - lastTime);

    // 如果已经达到间隔时间, 执行函数
    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      const result = callback.apply(this, args);
      lastTime = nowTime;
      return result;
    }

    // 如果允许最后一次执行, 并且没有 timer, 设置 timer
    if (options.trailing && !timer) {
      timer = setTimeout(() => {
        const result = callback.apply(this, args);
        lastTime = !options.leading ? 0 : Date.now();
        timer = null;
        return result;
      }, remainTime);
    }
  };

  // 取消函数节流
  _throttle.cancel = function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    lastTime = 0;
  };

  return _throttle;
}


function throttle2(callback, delay) {
  let lastTime = null;
  return function(...args) {
    const nowTime = Date.now();
    if (lastTime === null || now - lastTime > delay) {
      lastTime = nowTime;
      return callback.apply(this, args);
    }
  }
}