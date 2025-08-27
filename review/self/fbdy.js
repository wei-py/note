let eventEmitter = {
  events: {},
  on: function (event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  },
  emit: function (event, ...args) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach(listener => {
      listener(...args)
    });
  },
  off: function (event, listener) {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter(
      (l) => l !== listener
    );
  },
};

function user1(message) {
  console.log("user1 received message", message);
}

function user2(message) {
  console.log("user2 received message", message);
}

// 订阅
eventEmitter.on("article", user1);
eventEmitter.on("article", user2);

// 发布
eventEmitter.emit("article", "发布-订阅");

// 取消订阅
eventEmitter.off("article", user1);

// 发布
eventEmitter.emit("article", "只有user2");

