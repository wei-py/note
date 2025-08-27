function debounce(callback, delay, immediate) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      const isNow = !timer; // 当前没有执行
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (isNow) {
        callback.apply(context, args);
      }
    } else {
      timer = setTimeout(() => {
        callback.apply(context, args);
      }, delay);
    }
  };
}

function debounce(callback, delay, immediate) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      const isNow = !timer; // 当前没有执行
      if (timer) {
        setTimeout(() => {
          timer = null;
        }, delay);
      }
      if (isNow) {
        callback.apply(context, args);
      }
    } else {
      timer = setTimeout(() => {
        callback.apply(context, args);
      }, delay);
    }
  };
}
