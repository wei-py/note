let module = (function () {
    // 闭包的引用
    const moduleLists = {};
    function define(name, modules, action) {
        modules.map((m, i) => {
            modules[i] = moduleLists[m];
        })
        // 执行并保存
        moduleLists[name] = action.apply(null, modules);
    }
    return { define }
})();


module.define('nodependency', [], function () {
    return {
        show() {
            console.log('无依赖');
        }
    }
})

module.define('dependency', ['nodendency'], function (nodendency) {
    nodendency.show();
})