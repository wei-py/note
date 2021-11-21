function sum() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (s, n) { return s + n; }, 0);
}
console.log(sum(1, 2, 3, 4, 5));
