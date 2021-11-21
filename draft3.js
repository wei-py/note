var module = (function () {
    const moduleList = {}
    function define(name, modules, action) {
        modules.map((m, i) => {
            modules[i] = moduleList[m];
        });
        moduleList[name] = action.apply(null, modules);
    };
    return { define }
})()


module.define("hd", [], function () {
    return {
        show() {
            console.log("hd module show");
        }
    };
});


module.define("xj", ["hd"], function (hd) {
    hd.show();
});