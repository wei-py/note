```mermaid
flowchart TD
    A[调用throttle函数] --> B{leading配置检查}
    B --> |leading为true| C[记录当前时间lastTime]
    B --> |leading为false| D[初始化lastTime为0]
    
    C --> E[计算剩余时间remainTime]
    D --> E
    
    E --> F{remainTime <=0?}
    F --> |是| G[清除已有定时器]
    G --> H[立即执行回调函数]
    H --> I[更新lastTime为当前时间]
    
    F --> |否| J{trailing配置检查}
    J --> |trailing为true| K{定时器存在?}
    K --> |否| L[设置新定时器]
    L --> M[定时器回调执行]
    M --> N[更新lastTime]
    M --> O[清除定时器]
    
    J --> |trailing为false| P[不做任何操作]
    
    subgraph 取消功能
        Q[调用cancel方法] --> R{定时器存在?}
        R --> |是| S[清除定时器]
        S --> T[重置lastTime为0]
        R --> |否| T
    end


动态表单
组件传值
事件循环
深拷贝和浅拷贝
vue2 和 vue3 的区别

