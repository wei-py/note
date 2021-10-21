const jsonp = function (url, params, callback) {
    // 判断参数
    let queryString = url.indexOf('?') ? '?' : '&';
    for (let k of Reflect.ownKeys(params)) {
        queryString += k + '=' + params[k] + '&';
    }
    // 随机函数名
    let randomName = Math.random().toString().replace('.', '');
    let callbackName = 'myJsonp' + randomName;
    queryString += 'callback=' + callbackName;
    // 构建节点
    let scriptNode = document.createElement("script");
    scriptNode.src = url + queryString;
    // 处理回调 执行回调
    window[callbackName] = function () {
        callback(...arguments);
        document.getElementsByName('head')[0].removeChild(scriptNode);
    }
    // 发送请求 添加节点
    document.getElementsByTagName('head')[0].appendChild(scriptNode);
}