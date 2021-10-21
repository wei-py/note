const myNew = function (obj, ...rest) {
    // 基于obj的原型创建新的对象
    const newobj = Object.create(obj.prototype);
    // 添加新的属性到newobj上，并获取obj函数执行结果
    const result = obj.apply(newobj, rest);
    // 查看返回的结果类型是对象吗 是 返回对象 否 返回newobj
    return typeof result != 'object' ? newobj : result;
}